"use client";
import styled from "styled-components";
import Link from "next/link";
import AddTripBtn from "../../components/AddTripBtn";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { UserAuth } from "../../hooks/authContext";

export default function Home() {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();

  // Read items from database
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "plan"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArr = [];

        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });

        setItems(itemsArr);
      });
    }
  }, [user]);

  return (
    <Main>
      <TripsButtonContainer>
        <TripButton>Upcoming Trips</TripButton>
        <TripButton>Past Trips</TripButton>
      </TripsButtonContainer>
      <TripsArea>
        <AddTripBtn />
        {items.map((item) => (
          <TripColumn key={item.id}>
            <TripInfo>
              <TripTitle>{item.tripName}</TripTitle>
              <TripCity>{item.cityName}</TripCity>
              <TripDate>
                {item.startDate} ～ {item.endDate}
              </TripDate>
            </TripInfo>
          </TripColumn>
        ))}
      </TripsArea>
    </Main>
  );
}

const Main = styled.main`
  width: 1200px;
  margin: 50px auto;
`;

const TripsButtonContainer = styled.div`
  margin-bottom: 40px;
`;

const TripButton = styled.button`
  border: 1px solid #dcc1a6;
  border-radius: 5px;
  padding: 15px;
  background-color: transparent;
  color: #d4a373;
  font-weight: 600;
  font-size: 20px;
`;

const TripsArea = styled.div``;

const TripColumn = styled.div`
  margin-bottom: 50px;
`;

const TripInfo = styled.div`
  width: 100%;
  border: 1px solid #d4a373;
  height: 300px;
  padding: 20px 20px;
  border-radius: 5px;
`;

const TripTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 20px;
`;

const TripCity = styled.div`
  margin-bottom: 10px;
`;

const TripDate = styled.div``;
