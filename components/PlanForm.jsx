"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserAuth } from "../hooks/authContext";

export default function PlanForm() {
  const [items, setItems] = useState([]);
  const [tripName, setTripName] = useState("");
  const [cityName, setCityName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { user } = UserAuth();
  //Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (user) {
      const newItems = {
        tripName,
        cityName,
        startDate,
        endDate,
      };

      try {
        await addDoc(collection(db, "plan"), {
          uid: user.uid,
          tripName: newItems.tripName,
          cityName: newItems.cityName,
          startDate: newItems.startDate,
          endDate: newItems.endDate,
        });
        setItems([...items, newItems]);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleDestinationCityChange = (e) => {
    setCityName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <Main>
      <AddArea>
        <Title>Add trip</Title>

        <PlanArea>
          <TripInfo>
            <Caption>
              Add a trip manually below, and we&apos;ll create the trip for you.
            </Caption>
            <Column>
              <InputName>Trip Name</InputName>
              <Input value={tripName} onChange={handleTripNameChange}></Input>
            </Column>
            <Column>
              <InputName>Destination City</InputName>
              <Input
                value={cityName}
                onChange={handleDestinationCityChange}
              ></Input>
            </Column>
            <DateColumn>
              <Column>
                <InputName type="date" value={startDate}>
                  Start Date
                </InputName>
                <DateInput
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                ></DateInput>
              </Column>
              <Column>
                <InputName>End Date</InputName>
                <DateInput
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                ></DateInput>
              </Column>
            </DateColumn>
          </TripInfo>
          <ImageInfo>
            <Image alt="trip-image"></Image>
            <ImageButton>Change Photo</ImageButton>
          </ImageInfo>
        </PlanArea>

        <ConfirmArea>
          <Link href="/">
            <CancelButton>Cancel</CancelButton>
          </Link>

          <SaveButton onClick={addItem}>Save</SaveButton>
        </ConfirmArea>
      </AddArea>
    </Main>
  );
}

const Main = styled.main`
  padding-top: 30px;
  margin: auto;
  width: 1200px;
`;

const AddArea = styled.div``;

const Title = styled.div`
  display: flex;
  color: #283618;
  font-size: 24px;
  margin-bottom: 40px;
`;

const Caption = styled.div`
  margin-bottom: 30px;
`;

const PlanArea = styled.div`
  display: flex;
`;

const TripInfo = styled.div`
  margin-right: 30px;
`;

const Column = styled.div`
  margin-bottom: 40px;
  margin-right: 10px;
`;

const InputName = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 600px;
  height: 50px;
  padding: 10px;
  font-size: 20px;
`;

const DateInput = styled.input`
  width: 295px;
  height: 50px;
  padding: 10px;
  font-size: 20px;
`;

const DateColumn = styled.div`
  display: flex;
`;

const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  background-color: #264653;
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;

const ImageButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #e76f51;
  font-weight: 600;
`;

const ConfirmArea = styled.div`
  padding-top: 20px;
`;

const CancelButton = styled.button`
  border: 0;
  background-color: transparent;
  margin-right: 40px;
  font-size: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;
