"use client";

import useAuthRedirect from "hooks/useAuthRedirect";
import styled from "styled-components";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { CityName } from "components/Common/Form/CityName";
import { storage } from "lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import FormInput from "components/Common/Form/FormInput";
import FormConfirmArea from "components/Common/Form/FormConfirmArea";

type FormValues = {
  tripName: string;
  cityName: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  buildTime: string;
};

export default function Page() {
  useAuthRedirect();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/plannlog-a64d2.appspot.com/o/duong-chung--cItKmBrXN8-unsplash.jpg?alt=media&token=60017cd9-4215-4e2d-85af-6135517b951b"
  );
  const router = useRouter();
  const { user } = UserAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const uploadImage = () => {
    if (imageUpload == null) return;
    if (imageUpload !== null) {
      const imageRef = ref(
        storage,
        `trip/${user.uid}/${imageUpload.name + v4()}`
      );
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            setCurrentImage(url);
          });
          setUploadStatus("Upload successful");
          setImageUpload(null);
        })
        .catch(() => {
          setUploadStatus("Upload failed");
        });
    }
  };

  const addItem: SubmitHandler<FormValues> = async (formData) => {
    const ref = collection(db, "trip");
    addDoc(ref, {
      uid: user.uid,
      tripName: formData.tripName,
      cityName: formData.cityName,
      startDate: formData.startDate,
      endDate: formData.endDate,

      imageUrl: currentImage,
      buildTime: serverTimestamp(),
    })
      .then(() => {
        router.push("/trips");
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  return (
    <Main>
      <AddArea>
        <form onSubmit={handleSubmit(addItem)}>
          <PlanArea>
            <Title>Add trip</Title>
            <FormArea>
              <TripInfo>
                <Caption>
                  Add a trip manually below, and we&apos;ll create the trip for
                  you.
                </Caption>
                <FormInput
                  label="Trip Name"
                  name="tripName"
                  type="text"
                  width="600px"
                  register={register}
                  errors={errors}
                  isRequired={true}
                />
                <Column>
                  <InputName>Destination City</InputName>
                  <Controller
                    control={control}
                    name="cityName"
                    render={({ field }) => (
                      <CityName
                        onSelectCity={(city) => field.onChange(city)}
                        defaultValue={field.value}
                      />
                    )}
                  />
                </Column>
                <FlexContainer>
                  <FormInput
                    label="Start Date"
                    name="startDate"
                    type="date"
                    width="295px"
                    register={register}
                    errors={errors}
                    isRequired={true}
                  />
                  <FormInput
                    label="End Date"
                    name="endDate"
                    type="date"
                    width="295px"
                    register={register}
                    errors={errors}
                    isRequired={true}
                  />
                </FlexContainer>
              </TripInfo>
              <ImageInfo>
                <Image
                  src={currentImage}
                  width={200}
                  height={200}
                  alt="Current image"
                />
                <ImageLabel>
                  Change Photo
                  <ImageInput
                    type="file"
                    onChange={(event) => {
                      if (event.target.files && event.target.files.length > 0) {
                        setImageUpload(event.target.files[0]);
                        setUploadStatus("");
                      }
                    }}
                  />
                </ImageLabel>
                {imageUpload && !uploadStatus && (
                  <ImagePrompt>{imageUpload.name}</ImagePrompt>
                )}
                {uploadStatus && <ImagePrompt>{uploadStatus}</ImagePrompt>}
                <PhotoButton type="button" onClick={uploadImage}>
                  Upload image
                </PhotoButton>
              </ImageInfo>
            </FormArea>
          </PlanArea>

          <FormConfirmArea cancelLink="/trips" />
        </form>
      </AddArea>
    </Main>
  );
}

const Main = styled.main`
  margin: 50px auto;
  width: 1000px;
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
  }
  @media (min-width: 360px) and (max-width: 900px) {
    width: 80%;
    margin: auto;
  }
`;

const Title = styled.div`
  display: flex;
  color: #6d5b48;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Caption = styled.div`
  margin-bottom: 30px;
  color: #6d5b48;
`;

const PlanArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const TripInfo = styled.div`
  margin-right: 50px;
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 360px) and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  margin-bottom: 40px;
  margin-right: 10px;
  width: 600px;
  @media (min-width: 360px) and (max-width: 900px) {
    width: 100%;
  }
`;

const InputName = styled.div`
  margin-bottom: 10px;
  color: #6d5b48;
  font-size: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  @media (min-width: 360px) and (max-width: 900px) {
    display: block;
  }
`;

const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 360px) and (max-width: 1200px) {
    align-items: flex-start;
    margin-bottom: 40px;
  }
`;

const PhotoButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #6d5b48;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
`;

const ImageLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0;
  background-color: transparent;
  color: #c88756;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImagePrompt = styled.div`
  color: #6a9066;
  margin-top: 10px;
`;
