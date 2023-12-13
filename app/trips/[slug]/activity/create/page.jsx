"use client";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { useForm } from "react-hook-form";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";
import useAuthRedirect from "hooks/useAuthRedirect";
import FormInput from "components/FormInput";
import FormConfirmArea from "components/FormConfirmArea";

export default function Page({ params }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { user } = UserAuth();

  useAuthRedirect();

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
              <FormInput
                label="Event Name"
                name="eventName"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={true}
              />
              <FlexContainer>
                <FormInput
                  label="Start Date"
                  name="startDate"
                  type="date"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={true}
                />
                <FormInput
                  label="Start Time"
                  name="startTime"
                  type="time"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={true}
                />
              </FlexContainer>
              <FlexContainer>
                <FormInput
                  label="End Date"
                  name="endDate"
                  type="date"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
                <FormInput
                  label="End Time"
                  name="endTime"
                  type="time"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
              <FormInput
                label="Confirmation"
                name="confirmation"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Venue"
                name="venue"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Phone"
                name="phone"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Website"
                name="website"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
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
