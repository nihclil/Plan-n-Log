"use client";

import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";
import useAuthRedirect from "hooks/useAuthRedirect";
import FormInput from "components/Common/Form/FormInput";
import FormConfirmArea from "components/Common/Form/FormConfirmArea";

type Inputs = {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  confirmation: string;
  venue: string;
  address: string;
  phone: string;
  website: string;
  email: string;
};

export default function Page({ params }: { params: { slug: string } }) {
  useAuthRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { user } = UserAuth();

  const addActivity: SubmitHandler<Inputs> = async (formData) => {
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
                label="Address"
                name="address"
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

const Main = styled.main`
  margin: 50px auto;
  width: 900px;
  @media (max-width: 1200px) {
    width: auto;
  }
`;

const AddArea = styled.div`
  background-color: #fff;
  border-radius: 18px;
  padding: 50px;
  @media (min-width: 900px) and (max-width: 1200px) {
    width: 800px;
    margin: auto;
    padding: 40px;
  }
  @media (min-width: 600px) and (max-width: 900px) {
    width: 80%;
    margin: auto;
    padding: 40px;
  }
  @media (min-width: 360px) and (max-width: 600px) {
    width: 80%;
    margin: auto;
    padding: 30px;
  }
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
  @media (min-width: 900px) and (max-width: 1200px) {
    margin: auto;
  }
`;

const TripInfo = styled.div`
  @media (min-width: 360px) and (max-width: 900px) {
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  @media (min-width: 360px) and (max-width: 900px) {
    flex-direction: column;
  }
`;

const FormConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
