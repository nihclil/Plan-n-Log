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
import AddPlanBtn from "components/AddPlanBtn";
import Image from "next/image";
import TripList from "components/TripList";
import DeleteModal from "components/DeleteModal";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();
  const [plans, setPlans] = useState([]);
  const [planButton, setPlanButton] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const router = useRouter();

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

  function formatData(dateString) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

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

  return (
    <Main>
      <TripsArea>
        {items.map((item) => (
          <TripList key={item.id} item={item} onDelete={openDeleteModal} />
        ))}
        <AddPlanBtnContainer>
          <AddPlanBtn />
        </AddPlanBtnContainer>
      </TripsArea>

      <PlanArea>
        <ButtonContainer onClick={dropDownMenu}>
          <PlansButton>
            <PlansSpan>Current Plans</PlansSpan>
            <Image
              src={
                planButton
                  ? "/iconmonstr-caret-down-circle-lined-24.png"
                  : "/iconmonstr-caret-up-circle-lined-24.png"
              }
              width={24}
              height={24}
              alt="caret"
            />
          </PlansButton>
        </ButtonContainer>
        <PlansInfo>
          {planButton
            ? plans.map((plan) => (
                <PlanContainer key={plan.id}>
                  <DateColumn>
                    <StartDate>{formatData(plan.startDate)}</StartDate>
                    <StartTime>{plan.startTime}</StartTime>
                  </DateColumn>
                  <ImageColumn>
                    <Image src={plan.src} width={32} height={32} alt="" />
                  </ImageColumn>
                  <Link href={`${params.slug}/${plan.planName}/${plan.id}`}>
                    <PlanTitle>{plan.eventName}</PlanTitle>
                  </Link>

                  <EditPlan>
                    <Image
                      src="/iconmonstr-edit-11-24.png"
                      alt="caret-down-filled"
                      width={24}
                      height={24}
                    ></Image>
                    <EditPlanSpan>Edit</EditPlanSpan>
                  </EditPlan>
                </PlanContainer>
              ))
            : null}
        </PlansInfo>
        {modal && (
          <DeleteModal
            toggleModal={toggleModal}
            deleteData={() => deleteData(currentItemId)}
            id={currentItemId}
            caption="trip"
          />
        )}
      </PlanArea>
    </Main>
  );
}

const Main = styled.main``;

const TripsArea = styled.div`
  width: 1000px;
  margin: 50px auto 0px auto;
  position: relative;
`;

const TripColumn = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 4px 4px 30px 0px #aaaaaa;
  width: 100%;
  height: 300px;
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  position: relative;
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
  display: flex;
`;
const EditImg = styled.img``;
const EditSpan = styled.span`
  padding-left: 5px;
  color: #6a9066;
  font-size: 20px;
`;

const AddPlanBtnContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
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

const PlanArea = styled.div`
  width: 1000px;
  margin: 0 auto 50px auto;
`;

const PlansInfo = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 800px;
`;

const PlanContainer = styled.div`
  color: #6d5b48;
  background-color: #fff;
  width: 800px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e6ddd4;
`;

const DateColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  width: 200px;
`;

const StartDate = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const StartTime = styled.div``;

const PlanTitle = styled.div`
  font-size: 24px;
  color: #c88756;
  font-weight: 600;
`;

const ImageColumn = styled.div`
  background-color: #d1bea9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 50px;
`;

const ButtonContainer = styled.div`
  margin: 100px auto 0px auto;
  cursor: pointer;
`;

const PlansButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  background-color: #fff;
  padding: 20px 20px;
  border-radius: 20px;
`;

const PlansSpan = styled.span`
  margin-right: 10px;
  color: #6a9066;
  font-size: 24px;
  font-weight: 600;

  &:hover {
    color: #70946c;
  }
`;

const EditPlan = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
`;

const EditPlanSpan = styled.span`
  padding-left: 5px;
  color: #6a9066;
  font-size: 20px;
`;
