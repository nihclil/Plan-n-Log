"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { CityName } from "components/Common/Form/CityName";
import useAuthRedirect from "hooks/useAuthRedirect";

import { storage } from "lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import LoadingEffect from "components/Common/Loading/LoadingEffect";
import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  // const [currentImage, setCurrentImage] = useState(
  //   "https://firebasestorage.googleapis.com/v0/b/plannlog-a64d2.appspot.com/o/duong-chung--cItKmBrXN8-unsplash.jpg?alt=media&token=60017cd9-4215-4e2d-85af-6135517b951b"
  // );
  const [currentData, setCurrentData] = useState({
    tripName: "",
    cityName: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = UserAuth();

  useAuthRedirect();

  //Read data from firestore
  useEffect(() => {
    const docRef = doc(db, "trip", params.slug);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const tripData = docSnapshot.data();

        setCurrentData({
          tripName: tripData.tripName,
          cityName: tripData.cityName,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          imageUrl: tripData.imageUrl,
        });
      }
      setIsLoading(false);
    });
  }, [params.slug]);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `trip/${user.uid}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef).then((url) => {
          setCurrentData({ ...currentData, imageUrl: url });
        });
        setUploadStatus("Upload successful");
        setImageUpload(null);
      })
      .catch(() => {
        setUploadStatus("Upload failed");
      });
  };

  const updateData = async () => {
    const docRef = doc(db, "trip", params.slug);
    updateDoc(docRef, currentData)
      .then(() => {
        console.log("Document successfully updated");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  };

  const handleTripNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({ ...currentData, tripName: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({ ...currentData, startDate: e.target.value });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({ ...currentData, endDate: e.target.value });
  };

  const handleCitySelect = (city: string) => {
    setCurrentData({ ...currentData, cityName: city });
  };

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <AddArea>
        <FormArea>
          <TripInfo>
            <Title>Add trip</Title>
            <Caption>
              Add a trip manually below, and we&apos;ll create the trip for you.
            </Caption>
            <Column>
              <InputName>Trip Name</InputName>
              <Input
                value={currentData.tripName}
                onChange={handleTripNameChange}
              ></Input>
            </Column>
            <Column>
              <InputName>Destination City</InputName>
              <CityName
                onSelectCity={handleCitySelect}
                defaultValue={currentData.cityName}
              />
            </Column>
            <DateColumn>
              <Column>
                <InputName>Start Date</InputName>
                <DateInput
                  type="date"
                  value={currentData.startDate}
                  onChange={handleStartDateChange}
                ></DateInput>
              </Column>
              <Column>
                <InputName>End Date</InputName>
                <DateInput
                  type="date"
                  value={currentData.endDate}
                  onChange={handleEndDateChange}
                ></DateInput>
              </Column>
            </DateColumn>
          </TripInfo>
          <ImageInfo>
            <Image
              src={currentData.imageUrl}
              alt="Current image"
              width={200}
              height={200}
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
            <PhotoButton onClick={uploadImage}>Upload image</PhotoButton>
          </ImageInfo>
        </FormArea>

        <ConfirmArea>
          <Link href="/trips">
            <CancelButton>Cancel</CancelButton>
          </Link>
          <Link href="/trips">
            <SaveButton onClick={updateData}>Save</SaveButton>
          </Link>
        </ConfirmArea>
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 360px) and (max-width: 900px) {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 360px) and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const TripInfo = styled.div`
  margin-right: 50px;
  @media (min-width: 360px) and (max-width: 900px) {
    width: auto;
    margin: auto;
  }
`;

const Title = styled.div`
  color: #6d5b48;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: auto;
  }
`;

const Caption = styled.div`
  margin-bottom: 30px;
  color: #6d5b48;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 80%;
  }
`;

const Column = styled.div`
  margin-bottom: 40px;
  margin-right: 10px;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: auto;
  }
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
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 100%;
  }
`;

const DateInput = styled.input`
  width: 295px;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #e4ddd6;
  border-radius: 4px;
  @media (min-width: 360px) and (max-width: 900px) {
    width: 100%;
  }
`;

const DateColumn = styled.div`
  display: flex;
  @media (min-width: 360px) and (max-width: 900px) {
    flex-direction: column;
  }
`;

const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  color: #d1bea9;
  padding: 10px 20px;
  border-radius: 20px;
  @media (min-width: 900px) and (max-width: 1200px) {
    margin-right: 20px;
  }
  @media (min-width: 360px) and (max-width: 900px) {
    margin-right: 10px;
  }
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
  @media (min-width: 360px) and (max-width: 400px) {
    padding: 10px 10px;
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
