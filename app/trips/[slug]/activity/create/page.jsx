"use client";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { useForm } from "react-hook-form";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { user } = UserAuth();

  //Add data to firebase
  const addActivity = async (formData) => {
    const ref = collection(db, "trip", params.slug, "plan");
    addDoc(ref, {
      planName: "activity",
      src: "/iconmonstr-friend-4-32.png",
      eventName: formData.eventName,
      startDate: formData.startDate,
      startTime: formData.startTime,
      endDate: formData.endDate,
      endTime: formData.endTime,
      confirmation: formData.confirmation,
      venue: formData.venue,
      address: formData.address,
      phone: formData.phone,
      website: formData.website,
      email: formData.email,
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

  return (
    <Main>
      <AddArea>
        <form onSubmit={handleSubmit(addActivity)}>
          <Title>Add Activity</Title>
          <PlanArea>
            <TripInfo>
              <Column>
                <InputName>Event Name</InputName>
                <Input
                  type="text"
                  {...register("eventName", { required: true })}
                />
                {errors.eventName && (
                  <ErrorMessage>This field is required</ErrorMessage>
                )}
              </Column>
              <DateColumn>
                <Column>
                  <InputName>Start Date</InputName>
                  <DateInput
                    type="date"
                    {...register("startDate", { required: true })}
                  />
                  {errors.startDate && (
                    <ErrorMessage>This field is required</ErrorMessage>
                  )}
                </Column>
                <Column>
                  <InputName>Start Time</InputName>
                  <DateInput
                    type="time"
                    {...register("startTime", { required: true })}
                  />
                  {errors.startTime && (
                    <ErrorMessage>This field is required</ErrorMessage>
                  )}
                </Column>
              </DateColumn>
              <DateColumn>
                <Column>
                  <InputName>End Date</InputName>
                  <DateInput type="date" {...register("endDate")} />
                </Column>

                <Column>
                  <InputName>End Time</InputName>
                  <DateInput type="time" {...register("endTime")} />
                </Column>
              </DateColumn>
              <Column>
                <InputName>Confirmation</InputName>
                <Input type="text" {...register("confirmation")} />
              </Column>
              <Column>
                <InputName>Venue</InputName>
                <Input type="text" {...register("venue")} />
              </Column>
              <Column>
                <InputName>Address</InputName>
                <Input type="text" {...register("address")} />
              </Column>
              <Column>
                <InputName>Phone</InputName>
                <Input type="text" {...register("phone")} />
              </Column>
              <Column>
                <InputName>Website</InputName>
                <Input type="text" {...register("website")} />
              </Column>
              <Column>
                <InputName>Email</InputName>
                <Input type="email" {...register("email")} />
              </Column>
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

const ErrorMessage = styled.div`
  color: #de6161;
  margin-top: 10px;
`;
