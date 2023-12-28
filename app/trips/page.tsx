"use client";
import styled from "styled-components";
import AddTripButton from "components/Common/Buttons/AddTripButton";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import DeleteModal from "components/Common/Modals/DeleteModal";
import TripsFilter from "components/Common/Filter/TripsFilter";
import TripList from "components/Common/DataDisplay/TripList";
import LoadingEffect from "components/Common/Loading/LoadingEffect";
import useAuthRedirect from "hooks/useAuthRedirect";

type Trip = {
  [key: string]: string;
};

export default function Home() {
  const { user } = UserAuth();
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [displayedTrips, setDisplayedTrips] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>("upcoming");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useAuthRedirect();
  // Read items from database
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "trip"),
        where("uid", "==", user.uid),
        orderBy("buildTime", "desc")
      );
      getDocs(q).then((querySnapshot) => {
        const itemsArr: Trip[] = [];
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });
        setItems(itemsArr);
      });
      setIsLoading(false);
    }
  }, [user]);

  //delete trip data
  const deleteData = async (id: string) => {
    const docRef = doc(db, "trip", id);
    deleteDoc(docRef).then(() => {
      setItems((prevItems) => prevItems.filter((item) => id !== item.id));
    });
  };

  const openDeleteModal = (id: string) => {
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

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <TripsFilter
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      <AddTripButton />
      {displayedTrips.map((item) => (
        <TripList key={item.id} item={item} onDelete={openDeleteModal} />
      ))}
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
  @media (min-width: 360px) and (max-width: 1200px) {
    width: auto;
  }
`;
