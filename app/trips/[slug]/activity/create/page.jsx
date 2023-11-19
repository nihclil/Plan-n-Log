"use client";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const { user } = UserAuth();
  const [planData, setPlanData] = useState({
    eventName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    confirmation: "",
    venue: "",
    address: "",
    phone: "",
    website: "",
    email: "",
  });

  //Add data to firebase
  const addActivity = async () => {
    const ref = collection(db, "trip", params.slug, "plan");
    addDoc(ref, {
      planName: "activity",
      src: "/iconmonstr-friend-4-32.png",
      eventName: planData.eventName,
      startDate: planData.startDate,
      startTime: planData.startTime,
      endDate: planData.endDate,
      endTime: planData.endTime,
      confirmation: planData.confirmation,
      venue: planData.venue,
      address: planData.address,
      phone: planData.phone,
      website: planData.website,
      email: planData.email,
      uid: user.uid,
    })
      .then(() => {
        console.log("Document written with ID: ");
        router.push(`/trips/${params.slug}`);
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: value,
    }));
  };

  return (
    <Main>
      <AddArea>
        <Title>Add Activity</Title>
        <PlanArea>
          <TripInfo>
            <Column>
              <InputName>Event Name</InputName>
              <Input
                value={planData.eventName}
                name="eventName"
                onChange={handleInputChange}
              ></Input>
            </Column>
            <DateColumn>
              <Column>
                <InputName>Start Date</InputName>
                <DateInput
                  type="date"
                  value={planData.startDate}
                  name="startDate"
                  onChange={handleInputChange}
                ></DateInput>
              </Column>
              <Column>
                <InputName>Start Time</InputName>
                <DateInput
                  type="time"
                  value={planData.startTime}
                  name="startTime"
                  onChange={handleInputChange}
                ></DateInput>
              </Column>
            </DateColumn>
            <DateColumn>
              <Column>
                <InputName>End Date</InputName>
                <DateInput
                  type="date"
                  value={planData.endDate}
                  name="endDate"
                  onChange={handleInputChange}
                ></DateInput>
              </Column>

              <Column>
                <InputName>End Time</InputName>
                <DateInput
                  type="time"
                  value={planData.endTime}
                  name="endTime"
                  onChange={handleInputChange}
                ></DateInput>
              </Column>
            </DateColumn>
            <Column>
              <InputName>Confirmation</InputName>
              <Input
                type="text"
                value={planData.confirmation}
                name="confirmation"
                onChange={handleInputChange}
              ></Input>
            </Column>
            <Column>
              <InputName>Venue</InputName>
              <Input
                type="text"
                value={planData.venue}
                name="venue"
                onChange={handleInputChange}
              ></Input>
            </Column>
            <Column>
              <InputName>Address</InputName>
              <Input
                type="text"
                value={planData.address}
                name="address"
                onChange={handleInputChange}
              ></Input>
            </Column>
            <Column>
              <InputName>Phone</InputName>
              <Input
                type="text"
                value={planData.phone}
                name="phone"
                onChange={handleInputChange}
              ></Input>
            </Column>
            <Column>
              <InputName>Website</InputName>
              <Input
                type="text"
                value={planData.website}
                name="website"
                onChange={handleInputChange}
              ></Input>
            </Column>
            <Column>
              <InputName>Email</InputName>
              <Input
                type="email"
                value={planData.email}
                name="email"
                onChange={handleInputChange}
              ></Input>
            </Column>
          </TripInfo>
        </PlanArea>

        <ConfirmArea>
          <Link href={`/trips/${params.slug}/plan/create`}>
            <CancelButton>Cancel</CancelButton>
          </Link>
          <SaveButton onClick={addActivity}>Save</SaveButton>
        </ConfirmArea>
      </AddArea>
    </Main>
  );
}

const Main = styled.main``;

const AddArea = styled.div`
  width: 900px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 18px;
  padding: 50px;
`;

const Title = styled.div`
  display: flex;
  color: #6d5b48;
  font-size: 24px;
  margin-bottom: 40px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`;

const PlanArea = styled.div`
  display: flex;
  justify-content: center;
`;

const TripInfo = styled.div``;

const Column = styled.div`
  margin-bottom: 40px;
  margin-right: 10px;
`;

const InputName = styled.div`
  margin-bottom: 10px;
  color: #6d5b48;
  font-size: 20px;
`;

const Input = styled.input`
  width: 600px;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #e4ddd6;
  border-radius: 4px;
`;

const DateInput = styled.input`
  width: 295px;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #e4ddd6;
  border-radius: 4px;
`;

const DateColumn = styled.div`
  display: flex;
`;

const ConfirmArea = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  border: 0;
  background-color: transparent;
  margin-right: 40px;
  font-size: 20px;
  cursor: pointer;
  color: #d1bea9;
  padding: 10px 20px;
  border-radius: 20px;
`;

const SaveButton = styled.button`
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  background-color: #d1bea9;
  padding: 10px 20px;
  border-radius: 20px;
  border: 0;
  color: #6d5b48;
`;
