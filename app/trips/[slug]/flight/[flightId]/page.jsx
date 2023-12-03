"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "lib/firebase";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from "components/DeleteModal";
import { Terminal } from "lucide-react";

export default function Page({ params }) {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "trip", params.slug, "plan", params.flightId);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setPlan([{ ...docSnapshot.data(), id: docSnapshot.id }]);
      }
      setLoading(false);
    });
  }, [params.slug, params.flightId]);

  function formatData(dateString) {
    const options = {
      weekday: "short",

      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  function calculateDateDiff(startDate, startTime) {
    const now = new Date();
    console.log(now);
    const target = new Date(`${startDate}T${startTime}`);
    console.log(target);
    const diff = target - now;
    console.log(diff);
    const minutesTotal = Math.floor(diff / (1000 * 60));
    const hoursTotal = Math.floor(minutesTotal / 60);
    const days = Math.floor(hoursTotal / 24);

    const hours = hoursTotal % 24;
    const minutes = minutesTotal % 60;

    return `${days} days, ${hours} hours, ${minutes} minutes `;
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

  if (loading) {
    return <div>Loading...</div>;
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
          <PlanDuration>
            Departs in {calculateDateDiff(item.startDate, item.startTime)} day
          </PlanDuration>
          <PlanDetails>
            <DetailsTitle>Primary Details</DetailsTitle>

            <Start>
              <PlanDate>
                Depart {item.departureAirport} {formatData(item.startDate)}
                <Details>
                  {` Terminal ${item.departureTerminal} • Gate ${item.departureGate}`}
                </Details>
              </PlanDate>
              <PlanTime>{item.startTime}</PlanTime>
              <Details>{` Seats ${item.seats} `}</Details>
            </Start>
            <Start>
              <PlanDate>
                Arrive {item.arrivalAirport} {formatData(item.endDate)}
                <Details>
                  {` Terminal ${item.arrivalTerminal} • Gate ${item.arrivalGate}`}
                </Details>
              </PlanDate>

              <PlanTime>{item.endTime}</PlanTime>
            </Start>

            <PlanInfo>confirmation：{item.confirmation}</PlanInfo>
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
  margin-bottom: 20px;
`;

const PlanType = styled.div`
  margin-bottom: 20px;
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
  margin-bottom: 20px;
`;

const Start = styled.div`
  margin-bottom: 40px;
`;

const DeleteArea = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

const LinkArea = styled.div``;

const PlanDuration = styled.div`
  font-weight: 400;
  color: #8f8989;
  margin-bottom: 20px;
`;

const Details = styled.span`
  font-weight: 400;
  color: #8f8989;
`;
