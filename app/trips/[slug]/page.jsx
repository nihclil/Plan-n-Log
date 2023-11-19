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
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import AddPlanBtn from "components/AddPlanBtn";
import Image from "next/image";

export default function Page({ params }) {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();
  const [plans, setPlans] = useState([]);

  // Read trip data from database
  useEffect(() => {
    const docRef = doc(db, "trip", params.slug);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setItems([{ ...docSnapshot.data(), id: docSnapshot.id }]);
      } else {
        console.log("No such document");
      }
    });
  }, [params.slug]);

  // Read plan data from database
  useEffect(() => {
    const q = query(collection(db, "trip", params.slug, "plan"));
    getDocs(q).then((querySnapshot) => {
      const plansData = [];
      querySnapshot.forEach((doc) => {
        plansData.push({ ...doc.data(), id: doc.id });
      });
      setPlans(plansData);
    });
  }, [params.slug]);

  return (
    <Main>
      <TripsArea>
        {items.map((item) => (
          <TripColumn key={item.id}>
            <TripInfo>
              <Link href={`/trips/${item.id}`}>
                <TripTitle>{item.tripName}</TripTitle>
              </Link>
              <TripCity>{item.cityName}</TripCity>
              <TripDate>
                {item.startDate} ～ {item.endDate}
              </TripDate>
              <Link href={`/trips/${item.id}/edit`}>
                <EditLink>
                  <EditImg src="/iconmonstr-edit-11-24.png"></EditImg>
                  <EditSpan>Edit Trip Info</EditSpan>
                </EditLink>
              </Link>
            </TripInfo>
            <Link href={`/trips/${item.id}/plan/create`}>
              <AddPlanBtnContainer>
                <AddPlanBtn />
              </AddPlanBtnContainer>
            </Link>
            <TripImageContainer>
              <TripImage src={item.imageUrl}></TripImage>
            </TripImageContainer>
          </TripColumn>
        ))}
      </TripsArea>
      <PlanArea>
        {plans.map((plan) => (
          <PlanContainer key={plan.id}>
            <InfoColumn>
              <DateColumn>
                <StartDate>{plan.startDate}</StartDate>
                <StartTime>{plan.startTime}</StartTime>
              </DateColumn>
              <ImageColumn>
                <Image src={plan.src} width={32} height={32} alt="" />
              </ImageColumn>
              <PlanTitle>{plan.eventName}</PlanTitle>
              {/* <EditLink>
                <EditImg src="/iconmonstr-edit-11-24.png"></EditImg>
                <EditSpan>Edit Trip Info</EditSpan>
              </EditLink> */}
            </InfoColumn>
          </PlanContainer>
        ))}

        <div></div>
        <div></div>
      </PlanArea>
    </Main>
  );
}

const Main = styled.main``;

const TripsArea = styled.div`
  width: 1000px;
  margin: 50px auto;
`;

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
  width: 800px;
  margin: 0px auto 50px auto;
`;

const PlanContainer = styled.div`
  color: #6d5b48;
  margin-bottom: 50px;
`;

const DateColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

const StartDate = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const InfoColumn = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 4px 4px 30px 0px #aaaaaa;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 50px;
`;
