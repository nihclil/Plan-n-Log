"use client";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkInDate: "",
      checkOutDate: "",
    },
  });

  const router = useRouter();
  const { user } = UserAuth();

  //Add data to firebase
  const addLodging = async (formData) => {
    const ref = collection(db, "trip", params.slug, "plan");
    addDoc(ref, {
      planName: "flight",
      src: "/iconmonstr-airport-2-32.png",
      eventName: formData.airline,
      startDate: formData.departureDate,
      startTime: formData.departureTime,
      endDate: formData.arrivalDate,
      endTime: formData.arrivalTime,
      confirmation: formData.confirmation,
      departureAirport: formData.departureAirport,
      departureGate: formData.departureGate,
      departureTerminal: formData.departureTerminal,
      flightNumber: formData.flightNumber,
      seats: formData.seats,
      arrivalAirport: formData.arrivalAirport,
      arrivalTerminal: formData.arrivalTerminal,
      arrivalGate: formData.arrivalGate,
      uid: user.uid,
    })
      .then(() => {
        router.push(`/trips/${params.slug}`);
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  return (
    <Main>
      <AddArea>
        <form onSubmit={handleSubmit(addLodging)}>
          <Title>Add Flight</Title>
          <PlanArea>
            <TripInfo>
              <Column>
                <InputName>Confirmation</InputName>
                <Input type="text" {...register("confirmation")}></Input>
              </Column>
              <Caption>Departure</Caption>
              <DualInputColumn>
                <Column>
                  <InputName>Departure Date</InputName>
                  <DateInput
                    type="Date"
                    {...register("departureDate", { required: true })}
                  />
                  {errors.departureDate && (
                    <ErrorMessage>This field is required</ErrorMessage>
                  )}
                </Column>
                <Column>
                  <InputName>Departure Time</InputName>
                  <DateInput
                    type="time"
                    {...register("departureTime", { required: true })}
                  />
                  {errors.departureTime && (
                    <ErrorMessage>This field is required</ErrorMessage>
                  )}
                </Column>
              </DualInputColumn>
              <Column>
                <InputName>Airline</InputName>
                <Input {...register("airline", { required: true })}></Input>
                {errors.airline && (
                  <ErrorMessage>This field is required</ErrorMessage>
                )}
              </Column>
              <Column>
                <InputName>Departure Airport</InputName>
                <Input {...register("departureAirport")}></Input>
              </Column>
              <DualInputColumn>
                <Column>
                  <InputName>Flight Number</InputName>
                  <DateInput type="text" {...register("flightNumber")} />
                </Column>
                <Column>
                  <InputName>Seats</InputName>
                  <DateInput type="text" {...register("seats")} />
                </Column>
              </DualInputColumn>
              <DualInputColumn>
                <Column>
                  <InputName>Terminal</InputName>
                  <DateInput type="text" {...register("departureTerminal")} />
                </Column>
                <Column>
                  <InputName>Gate</InputName>
                  <DateInput type="text" {...register("departureGate")} />
                </Column>
              </DualInputColumn>
              <Caption>Arrival</Caption>
              <DualInputColumn>
                <Column>
                  <InputName>Arrival Date</InputName>
                  <DateInput type="Date" {...register("arrivalDate")} />
                </Column>
                <Column>
                  <InputName>Arrival Time</InputName>
                  <DateInput type="time" {...register("arrivalTime")} />
                </Column>
              </DualInputColumn>
              <Column>
                <InputName>Arrival Airport</InputName>
                <Input {...register("arrivalAirport")}></Input>
              </Column>
              <DualInputColumn>
                <Column>
                  <InputName>Terminal</InputName>
                  <DateInput type="text" {...register("arrivalTerminal")} />
                </Column>
                <Column>
                  <InputName>Gate</InputName>
                  <DateInput type="text" {...register("arrivalGate")} />
                </Column>
              </DualInputColumn>
            </TripInfo>
          </PlanArea>

          <ConfirmArea>
            <Link href={`/trips/${params.slug}/plan/create`}>
              <CancelButton>Cancel</CancelButton>
            </Link>
            <SaveButton type="submit">Save</SaveButton>
          </ConfirmArea>
        </form>
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

const Caption = styled.div`
  color: #7e582e;
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 600;
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

const DualInputColumn = styled.div`
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

const ErrorMessage = styled.div`
  color: #de6161;
  margin-top: 10px;
`;
