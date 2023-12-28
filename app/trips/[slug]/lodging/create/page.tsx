"use client";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { useRouter } from "next/navigation";
import useAuthRedirect from "hooks/useAuthRedirect";
import FormInput from "components/Common/Form/FormInput";
import FormConfirmArea from "components/Common/Form/FormConfirmArea";

type FormValues = {
  lodgingName: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  confirmation: string;
  address: string;
  supplierPhone: string;
  supplierWebsite: string;
  supplierEmail: string;
};

export default function Home({ params }: { params: { slug: string } }) {
  useAuthRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const { user } = UserAuth();

  const addLodging: SubmitHandler<FormValues> = async (formData) => {
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
              <FlexContainer>
                <FormInput
                  label="Check-in Date"
                  name="checkInDate"
                  type="date"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={true}
                />
                <FormInput
                  label="Check-in Time"
                  name="checkInTime"
                  type="time"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
              <FlexContainer>
                <FormInput
                  label="Checkout Date"
                  name="checkOutDate"
                  type="date"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={true}
                />
                <FormInput
                  label="Checkout Time"
                  name="checkOutTime"
                  type="time"
                  register={register}
                  errors={errors}
                  width="295px"
                  isRequired={false}
                />
              </FlexContainer>
              <FormInput
                label="Lodging Name"
                name="lodgingName"
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
                label="Confirmation"
                name="confirmation"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Supplier Phone"
                name="supplierPhone"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Supplier Website"
                name="supplierWebsite"
                type="text"
                register={register}
                errors={errors}
                width="600px"
                isRequired={false}
              />
              <FormInput
                label="Supplier Email"
                name="supplierEmail"
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
