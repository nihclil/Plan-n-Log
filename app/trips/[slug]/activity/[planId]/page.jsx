"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "lib/firebase";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from "components/DeleteModal";
import LoadingEffect from "components/LoadingEffect";
import useAuthRedirect from "hooks/useAuthRedirect";

export default function Home({ params }) {
  const [plan, setPlan] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useAuthRedirect();

  useEffect(() => {
    const docRef = doc(db, "trip", params.slug, "plan", params.planId);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setPlan([{ ...docSnapshot.data(), id: docSnapshot.id }]);
      }
      setIsLoading(false);
    });
  }, [params.slug, params.planId]);

  function formatData(dateString) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  function calculateDateDiff(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = end - start;
    const diffDays = diff / (1000 * 60 * 60 * 24);

    return Math.abs(diffDays);
  }

  function calculateTimeDiff(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    const diff = end - start;
    const diffMinutes = diff / 1000 / 60;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours} hours, ${minutes} minutes`;
  }

  const openDeleteModal = (id) => {
    setCurrentItemId(id);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  //delete plan data
  const deleteData = async (id) => {
    const docRef = doc(db, "trip", params.slug, "plan", id);
    deleteDoc(docRef).then(() => {
      setPlan((prevItems) => prevItems.filter((item) => id !== item.id));
    });
  };

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <Nav>
        <Link href={`/trips/${params.slug}`}>
          <Image
            src="/iconmonstr-arrow-left-lined-24.png"
            width={24}
            height={24}
            alt="arrow"
          ></Image>
          <NavSpan>Back to Trip Summary</NavSpan>
        </Link>
      </Nav>
      {plan.map((item) => (
        <PlanContainer key={item.id}>
          <PlanTitle>{item.eventName}</PlanTitle>
          <PlanType>{item.planName}</PlanType>
          <PlanDetails>
            <DetailsTitle>Primary Details</DetailsTitle>
            <PlanSchedule>
              <Start>
                <PlanDate>Starts {formatData(item.startDate)}</PlanDate>
                <PlanTime>{item.startTime}</PlanTime>
              </Start>
              <End>
                <PlanDate>Ends {formatData(item.endDate)}</PlanDate>
                <PlanTime>{item.endTime}</PlanTime>
              </End>
            </PlanSchedule>
            <PlanInfo>confirmation：{item.confirmation}</PlanInfo>
            <PlanInfo>venue：{item.venue}</PlanInfo>
            <Details>
              <Image
                src="/iconmonstr-location-1-16.png"
                width={16}
                height={16}
                alt="location"
              ></Image>
              <DetailsContent>{item.address}</DetailsContent>
            </Details>
            <Details>
              <Image
                src="/iconmonstr-phone-1-16.png"
                width={16}
                height={16}
                alt="phone"
              ></Image>
              <DetailsContent>{item.phone}</DetailsContent>
            </Details>
            <Details>
              <Image
                src="/iconmonstr-email-1-16.png"
                width={16}
                height={16}
                alt="email"
              ></Image>
              <DetailsContent>{item.email}</DetailsContent>
            </Details>
            <Details>
              <Image
                src="/iconmonstr-globe-5-16.png"
                width={16}
                height={16}
                alt="globe"
              ></Image>
              <DetailsContent>{item.website}</DetailsContent>
            </Details>
            <PlanDuration>
              Duration {calculateDateDiff(item.startDate, item.endDate)} day,
              {calculateTimeDiff(item.startTime, item.endTime)}
            </PlanDuration>
          </PlanDetails>
          <DeleteArea onClick={() => openDeleteModal(item.id)}>
            <LinkArea>
              <Image
                src="/iconmonstr-trash-can-lined-24.png"
                width={24}
                height={24}
                alt="trash-can"
              ></Image>
            </LinkArea>
          </DeleteArea>
        </PlanContainer>
      ))}
      {modal && (
        <DeleteModal
          toggleModal={toggleModal}
          deleteData={() => deleteData(currentItemId)}
          id={currentItemId}
          caption="plan"
        />
      )}
    </Main>
  );
}

const Main = styled.div`
  width: 1200px;
  margin: 50px auto;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
`;

const NavSpan = styled.span`
  margin-left: 5px;
  font-size: 24px;
  font-weight: 600;
  color: #6a9066;
  &:hover {
    color: #70946c;
  }
`;

const PlanContainer = styled.div`
  padding: 40px 30px;
  background-color: #fff;
  color: #6d5b48;
  margin-top: 50px;
  border-radius: 10px;
  position: relative;
`;
const PlanTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const PlanType = styled.div`
  margin-bottom: 30px;
`;

const PlanDetails = styled.div`
  width: 1000px;
  border: 1px solid #e0e0e0;
  padding: 40px 30px;
`;

const DetailsTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 40px;
`;

const PlanSchedule = styled.div`
  display: flex;
  gap: 100px;
  margin-bottom: 40px;
`;

const PlanInfo = styled.div`
  margin-bottom: 40px;
  font-weight: 600;
`;

const PlanDate = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;

const PlanTime = styled.div`
  font-weight: 600;
  font-size: 30px;
`;

const Start = styled.div``;

const End = styled.div``;

const Details = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const DetailsContent = styled.span`
  color: #6a9066;
  margin-left: 10px;
`;

const DeleteArea = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

const LinkArea = styled.div``;

const PlanDuration = styled.div`
  font-weight: 600;
  margin-top: 50px;
`;
