"use client";
import styled from "styled-components";
import Link from "next/link";
import AddTripBtn from "components/AddTripBtn";
import { use, useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import DeleteModal from "components/DeleteModal";
import formatDate from "utils/formatDate";
import TripsFilter from "components/TripsFilter";
import TripTaskLink from "components/TripTaskLink";
import TripList from "components/TripList";

export default function Home() {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [displayedTrips, setDisplayedTrips] = useState([]);
  const [selectedButton, setSelectedButton] = useState("upcoming");

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

  //delete trip data
  const deleteData = async (id) => {
    const docRef = doc(db, "trip", id);
    deleteDoc(docRef).then(() => {
      setItems((prevItems) => prevItems.filter((item) => id !== item.id));
    });
  };

  const openDeleteModal = (id) => {
    setCurrentItemId(id);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const todayDate = new Date();
    const filteredTrips = items.filter((item) => {
      const tripDate = new Date(item.startDate);

      return selectedButton === "upcoming"
        ? tripDate >= todayDate
        : tripDate < todayDate;
    });
    setDisplayedTrips(filteredTrips);
  }, [items, selectedButton]);

  return (
    <Main>
      <TripsFilter
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      <TripsArea>
        <AddTripBtn />
        {displayedTrips.map((item) => (
          <TripList key={item.id} item={item} />
        ))}
        {/* {displayedTrips.map((item) => (
          <TripColumn key={item.id}>
            <TripInfo>
              <Link href={`/trips/${item.id}`}>
                <TripTitle>{item.tripName}</TripTitle>
              </Link>

              <TripCity>{item.cityName}</TripCity>
              <TripDate>
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </TripDate>
              <TripTaskLink
                tripId={item.id}
                iconSrc="/iconmonstr-edit-11-24.png"
                linkTo="edit"
                text="Edit Trip Info"
              />
              <TripTaskLink
                tripId={item.id}
                iconSrc="/iconmonstr-edit-6-24.png"
                linkTo="write"
                text="Log Your Trip"
              />
              <DeleteArea onClick={() => openDeleteModal(item.id)}>
                <LinkArea>
                  <EditImg src="/iconmonstr-trash-can-lined-24.png"></EditImg>
                </LinkArea>
              </DeleteArea>
            </TripInfo>
            <TripImageContainer>
              <TripImage src={item.imageUrl}></TripImage>
            </TripImageContainer>
          </TripColumn>
        ))} */}
      </TripsArea>
      {modal && (
        <DeleteModal
          toggleModal={toggleModal}
          deleteData={() => deleteData(currentItemId)}
          id={currentItemId}
          caption="trip"
        />
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 1000px;
  margin: 50px auto;
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
  padding: 40px 60px 40px 60px;
  border-radius: 20px;
  position: relative;
`;

const TripInfo = styled.div``;

const TripTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #c88756;
  margin-bottom: 20px;
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

const EditImg = styled.img``;

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

const DeleteArea = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
