"use client";

import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import AddPlanButton from "components/Common/Buttons/AddPlanButton";
import TripList from "components/Common/DataDisplay/TripList";
import DeleteModal from "components/Common/Modals/DeleteModal";
import { useRouter } from "next/navigation";
import useAuthRedirect from "hooks/useAuthRedirect";
import CurrentPlansButton from "components/Common/Buttons/CurrentPlansButton";
import PlanList from "components/Common/DataDisplay/PlanList";
import LoadingEffect from "components/Common/Loading/LoadingEffect";

export default function Page({ params }) {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();
  const [plans, setPlans] = useState([]);
  const [planButton, setPlanButton] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useAuthRedirect();

  // Read trip data from database
  useEffect(() => {
    if (user && user.uid) {
      const docRef = doc(db, "trip", params.slug);
      getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setItems([{ ...docSnapshot.data(), id: docSnapshot.id }]);
        } else {
          console.log("No such document");
        }
        setIsLoading(false);
      });
    }
  }, [user, params.slug]);

  // Read plan data from database
  useEffect(() => {
    if (user && user.uid) {
      const q = query(
        collection(db, "trip", params.slug, "plan"),
        orderBy("startDate"),
        orderBy("startTime")
      );
      getDocs(q).then((querySnapshot) => {
        const plansData = [];
        querySnapshot.forEach((doc) => {
          plansData.push({ ...doc.data(), id: doc.id });
        });
        setPlans(plansData);
      });
    }
  }, [user, params.slug]);

  function dropDownMenu() {
    setPlanButton(!planButton);
  }

  //delete trip data
  const deleteData = async (id) => {
    const docRef = doc(db, "trip", id);
    deleteDoc(docRef).then(() => {
      setItems((prevItems) => prevItems.filter((item) => id !== item.id));
    });
    router.push("/trips");
  };

  const openDeleteModal = (id) => {
    setCurrentItemId(id);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <>
        {items.map((item) => (
          <TripsArea key={item.id}>
            <TripList item={item} onDelete={openDeleteModal} />
            <Link href={`/trips/${item.id}/plan/create`}>
              <AddPlanBtnContainer>
                <AddPlanButton />
              </AddPlanBtnContainer>
            </Link>
          </TripsArea>
        ))}
      </>
      <PlansArea>
        <CurrentPlansButton onClick={dropDownMenu} isOpen={planButton} />

        <PlansWrapper>
          {planButton &&
            plans.map((plan) => (
              <PlanList key={plan.id} plan={plan} params={params} />
            ))}
        </PlansWrapper>

        {modal && (
          <DeleteModal
            toggleModal={toggleModal}
            deleteData={() => deleteData(currentItemId)}
            id={currentItemId}
            caption="trip"
          />
        )}
      </PlansArea>
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

const TripsArea = styled.div`
  position: relative;
`;

const AddPlanBtnContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
`;

const PlansArea = styled.div`
  margin: 100px 0px 50px 0px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 80%;
    margin: 150px auto 50px auto;
  }
`;

const PlansWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 800px;
  margin-top: 20px;
  @media (min-width: 360px) and (max-width: 1000px) {
    width: 100%;
  }
`;
