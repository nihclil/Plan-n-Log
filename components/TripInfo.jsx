"use client";
import styled from "styled-components";
import Link from "next/link";
import AddTripBtn from "components/AddTripBtn";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import TripBtn from "components/TripBtn";

export default function Home() {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();

  // Read items from database
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "trip"),
        where("uid", "==", user.uid),
        orderBy("buildTime", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArr = [];

        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });

        setItems(itemsArr);
      });
    }
  }, [user]);

  function formatData(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <Main>
      <TripsButtonContainer>
        <TripBtn>Upcoming Trips</TripBtn>
        <TripBtn>Past Trips</TripBtn>
      </TripsButtonContainer>

      <TripsArea>
        <AddTripBtn />
        {items.map((item) => (
          <TripColumn key={item.id}>
            <TripInfo>
              <Link href={`/trips/${item.id}`}>
                <TripTitle>{item.tripName}</TripTitle>
              </Link>

              <TripCity>{item.cityName}</TripCity>
              <TripDate>
                {formatData(item.startDate)} - {formatData(item.endDate)}
              </TripDate>

              <EditLink>
                <Link href={`/trips/${item.id}/edit`}>
                  <LinkArea>
                    <EditImg src="/iconmonstr-edit-11-24.png"></EditImg>
                    <EditSpan>Edit Trip Info</EditSpan>
                  </LinkArea>
                </Link>
              </EditLink>

              <EditLink>
                <Link href={`/trips/${item.id}/write`}>
                  <LinkArea>
                    <EditImg src="/iconmonstr-edit-6-24.png"></EditImg>
                    <EditSpan>Log Your Trip</EditSpan>
                  </LinkArea>
                </Link>
              </EditLink>
            </TripInfo>
            <TripImageContainer>
              <TripImage src={item.imageUrl}></TripImage>
            </TripImageContainer>
          </TripColumn>
        ))}
      </TripsArea>
    </Main>
  );
}

const Main = styled.main`
  width: 1000px;
  margin: 50px auto;
`;

const TripsButtonContainer = styled.div`
  margin-bottom: 40px;
`;

const TripsArea = styled.div``;

const TripColumn = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 4px 4px 30px 0px #aaaaaa;
  width: 100%;
  height: 300px;
  margin: 60px auto;
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
`;

const TripInfo = styled.div``;

const TripTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #c88756;
  margin-bottom: 30px;
`;

const TripCity = styled.div`
  margin-bottom: 15px;
  color: #6d5b48;
  font-size: 20px;
`;

const TripDate = styled.div`
  margin-bottom: 15px;
  color: #6d5b48;
  font-size: 20px;
`;

const EditLink = styled.div`
  color: #6d5b48;
  width: 150px;
`;

const EditImg = styled.img``;
const EditSpan = styled.span`
  padding-left: 8px;
  color: #6a9066;
  font-size: 20px;
`;

const LinkArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TripImageContainer = styled.div`
  width: 220px;
  height: 220px;
  background-color: #e4ddd6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TripImage = styled.img`
  width: 90%;
  height: 90%;
`;
