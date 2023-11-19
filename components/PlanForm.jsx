"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { UserAuth } from "hooks/authContext";
import { CityName } from "components/CityName";

import { storage } from "lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

export default function PlanForm() {
  const [items, setItems] = useState([]);
  const [tripName, setTripName] = useState("");
  const [cityName, setCityName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [currentImage, setCurrentImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/plannlog-a64d2.appspot.com/o/duong-chung--cItKmBrXN8-unsplash.jpg?alt=media&token=60017cd9-4215-4e2d-85af-6135517b951b"
  );
  const router = useRouter();
  const { user } = UserAuth();

  const uploadImage = () => {
    if (imageUpload == null) return;
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
  };

  //Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (user) {
      const newItems = {
        tripName,
        cityName,
        startDate,
        endDate,
        currentImage,
      };

      try {
        await addDoc(collection(db, "trip"), {
          uid: user.uid,
          tripName: newItems.tripName,
          cityName: newItems.cityName,
          startDate: newItems.startDate,
          endDate: newItems.endDate,
          imageUrl: newItems.currentImage,
          buildTime: serverTimestamp(),
        });
        setItems([...items, newItems]);
        router.push("/trips");
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCitySelect = (city) => {
    setCityName(city.label);
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
              <CityName
                onSelectCity={handleCitySelect}
                defaultValue={cityName}
              />
            </Column>
            <DateColumn>
              <Column>
                <InputName>Start Date</InputName>
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
            <Image src={currentImage} alt="Current image" />

            <ImageLabel>
              Change Photo
              <ImageInput
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                  setUploadStatus("");
                }}
              />
            </ImageLabel>
            {imageUpload && !uploadStatus && (
              <ImagePrompt>{imageUpload.name}</ImagePrompt>
            )}
            {uploadStatus && <ImagePrompt>{uploadStatus}</ImagePrompt>}
            <PhotoButton onClick={uploadImage}>Upload image</PhotoButton>
          </ImageInfo>
        </PlanArea>

        <ConfirmArea>
          <Link href="/trips">
            <CancelButton>Cancel</CancelButton>
          </Link>

          <SaveButton onClick={addItem}>Save</SaveButton>
        </ConfirmArea>
      </AddArea>
    </Main>
  );
}

const Main = styled.main`
  margin: 50px auto;
  width: 1000px;
`;

const AddArea = styled.div`
  background-color: #fff;
  border-radius: 18px;
  padding: 50px;
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
`;

const TripInfo = styled.div`
  margin-right: 50px;
`;

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

const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
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
`;

const ImageInput = styled.input`
  display: none;
`;

const ImagePrompt = styled.div`
  color: #6a9066;
  margin-top: 10px;
`;
