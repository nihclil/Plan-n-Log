"use client";

import Tiptap from "components/TiptapEditor/Tiptap";
import styled from "styled-components";
import { db } from "lib/firebase";
import {
  doc,
  addDoc,
  getDoc,
  collection,
  documentId,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingEffect from "components/Common/Loading/LoadingEffect";
import Link from "next/link";
import useAuthRedirect from "hooks/useAuthRedirect";

export default function Home({ params }) {
  const [content, setContent] = useState("");
  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTiptapContent = (data) => {
    setContent(data);
  };

  useAuthRedirect();

  //獲取過往文章內容
  useEffect(() => {
    const docRef = doc(db, "trip", params.slug);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        setContent(docData.storyContent);
        setTripDetails(docData);
      }
      setIsLoading(false);
    });
  }, [params.slug]);

  //獲取行程資料
  useEffect(() => {
    const docRef = doc(db, "trip", params.slug);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const tripData = docSnapshot.data();
        setTripDetails({ ...tripData, id: docSnapshot.id });
      }
    });
  }, [params.slug]);

  //存取文章資料
  const saveData = () => {
    // if(editor)
    const docRef = doc(db, "trip", params.slug);
    updateDoc(docRef, { storyContent: content })
      .then(() => {
        console.log("saved");
      })
      .catch((error) => {
        console.error("Eroror saving: ", error);
      });
  };

  function formatData(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <Container>
        {tripDetails && (
          <TripInfo>
            <Title>Your Trip Details</Title>
            <TripImageContainer>
              <Image
                src={tripDetails.imageUrl}
                width={198}
                height={198}
                alt="trip-image"
              ></Image>
            </TripImageContainer>
            <Link href={`/trips/${tripDetails.id}`}>
              <TripName>{tripDetails.tripName}</TripName>
            </Link>
            <TripCity>{tripDetails.cityName}</TripCity>
            <TripTime>
              {formatData(tripDetails.startDate)} -
              {formatData(tripDetails.endDate)}
            </TripTime>
          </TripInfo>
        )}

        <Tiptap
          onEditorUpdate={getTiptapContent}
          initialContent={content}
          params={params}
        />
      </Container>
      <SaveButtonContainer>
        <SaveButton onClick={saveData}>Save</SaveButton>
      </SaveButtonContainer>
    </Main>
  );
}

const Main = styled.div`
  width: 1200px;
  margin: 50px auto 0px auto;
`;

const Container = styled.div`
  display: flex;
`;

const TripInfo = styled.div`
  width: 500px;
  padding: 10px 20px;
  background-color: #e3d7d7;
`;

const Title = styled.div`
  color: #6d5b48;
  font-size: 24px;
  font-weight: 600;
`;

const TripName = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #c88756;
  margin-bottom: 15px;
`;

const TripCity = styled.div`
  margin-bottom: 15px;
  color: #6d5b48;
  font-size: 20px;
`;

const TripTime = styled.div`
  margin-bottom: 15px;
  color: #6d5b48;
  font-size: 20px;
`;

const TripImageContainer = styled.div`
  width: 220px;
  height: 220px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 15px 0;
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 30px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #6a9066;
  border: 0;
  cursor: pointer;
  color: #fff;
  border-radius: 20px;
  &:hover {
    background-color: #70946c;
  }
`;
