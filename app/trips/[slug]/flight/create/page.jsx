"use client";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";
import useAuthRedirect from "hooks/useAuthRedirect";
import FormInput from "components/FormInput";
import FormConfirmArea from "components/FormConfirmArea";

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

  useAuthRedirect();

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
              <FormInput
                label="Confirmation"
                name="confirmation"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <Caption>Departure</Caption>
              <FlexContainer>
                <FormInput
                  label="Departure Date"
                  name="departureDate"
                  type="date"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={true}
                />
                <FormInput
                  label="Departure Time"
                  name="departureTime"
                  type="time"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={true}
                />
              </FlexContainer>
              <FormInput
                label="Airline"
                name="airline"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={true}
              />
              <FormInput
                label="Departure Airport"
                name="departureAirport"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FlexContainer>
                <FormInput
                  label="Flight Number"
                  name="flightNumber"
                  type="text"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
                <FormInput
                  label="Seats"
                  name="seats"
                  type="text"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
              <FlexContainer>
                <FormInput
                  label="Terminal"
                  name="departureTerminal"
                  type="text"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
                <FormInput
                  label="Gate"
                  name="departureGate"
                  type="text"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
              <Caption>Arrival</Caption>
              <FlexContainer>
                <FormInput
                  label="Arrival Date"
                  name="arrivalDate"
                  type="date"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
                <FormInput
                  label="Arrival Time"
                  name="arrivalTime"
                  type="time"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
              <FormInput
                label="Arrival Airport"
                name="arrivalAirport"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FlexContainer>
                <FormInput
                  label="Terminal"
                  name="arrivalTerminal"
                  type="text"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
                <FormInput
                  label="Gate"
                  name="arrivalGate"
                  type="text"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
            </TripInfo>
          </PlanArea>
          <FormConfirmWrapper>
            <FormConfirmArea cancelLink={`/trips/${params.slug}/plan/create`} />
          </FormConfirmWrapper>
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

const FlexContainer = styled.div`
  display: flex;
`;

const FormConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
