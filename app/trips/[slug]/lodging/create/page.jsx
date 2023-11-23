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
      planName: "lodging",
      src: "/iconmonstr-bed-2-32.png",
      eventName: formData.lodgingName,
      startDate: formData.checkInDate,
      startTime: formData.checkInTime,
      endDate: formData.checkOutDate,
      endTime: formData.checkOutTime,
      confirmation: formData.confirmation,
      address: formData.address,
      supplierPhone: formData.supplierPhone,
      supplierWebsite: formData.supplierWebsite,
      supplierEmail: formData.supplierEmail,
      supplierContact: formData.supplierContact,
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
          <Title>Add Lodging</Title>
          <PlanArea>
            <TripInfo>
              <DateColumn>
                <Column>
                  <InputName>Check-in Date</InputName>
                  <DateInput
                    type="Date"
                    {...register("checkInDate", { required: true })}
                  />

                  {errors.checkInDate && (
                    <ErrorMessage>This field is required</ErrorMessage>
                  )}
                </Column>
                <Column>
                  <InputName>Check-in Time</InputName>
                  <DateInput {...register("checkInTime")} type="time" />
                </Column>
              </DateColumn>

              <DateColumn>
                <Column>
                  <InputName>Checkout Date</InputName>
                  <DateInput
                    type="Date"
                    {...register("checkOutDate", { required: true })}
                  />
                  {errors.checkOutDate && (
                    <ErrorMessage>This field is required</ErrorMessage>
                  )}
                </Column>
                <Column>
                  <InputName>Checkout Time</InputName>
                  <DateInput
                    type="time"
                    {...register("checkOutTime")}
                  ></DateInput>
                </Column>
              </DateColumn>
              <Column>
                <InputName>Lodging Name</InputName>
                <Input {...register("lodgingName")}></Input>
              </Column>
              <Column>
                <InputName>Address</InputName>
                <Input {...register("address")}></Input>
              </Column>
              <Column>
                <InputName>Confirmation</InputName>
                <Input type="text" {...register("confirmation")}></Input>
              </Column>
              <Column>
                <InputName>Supplier Phone</InputName>
                <Input {...register("supplierPhone")}></Input>
              </Column>
              <Column>
                <InputName>Supplier Website</InputName>
                <Input {...register("supplierWebsite")}></Input>
              </Column>
              <Column>
                <InputName>Supplier Email</InputName>
                <Input type="email" {...register("supplierEmail")}></Input>
              </Column>
              <Column>
                <InputName>Supplier Contact</InputName>
                <Input {...register("supplierContact")}></Input>
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
