"use client";
import { Editor } from "@tiptap/react";
import Tiptap from "components/Tiptap";
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

export default function Home({ params }) {
  const [content, setContent] = useState("");
  const [tripDetails, setTripDetails] = useState(null);

  const getTiptapContent = (data) => {
    setContent(data);
  };

  //獲取過往文章內容
  useEffect(() => {
    const docRef = doc(db, "trip", params.slug);

    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        if (docData.storyContent) {
          setContent(docData.storyContent);
        }
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

  //獲取行程資料
  useEffect(() => {
    const docRef = doc(db, "trip", params.slug);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const tripData = docSnapshot.data();
        setTripDetails(tripData);
      }
    });
  }, [params.slug, tripDetails]);

  function formatData(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (!tripDetails) {
    return <div>Loading trip details...</div>;
  }

  return (
    <Main>
      <Container>
        {tripDetails && (
          <TripInfo>
            <Title>Your Trip Details</Title>
            <TripImageContainer>
              <TripImage src={tripDetails.imageUrl}></TripImage>
            </TripImageContainer>
            <TripName>{tripDetails.tripName}</TripName>
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
  padding: 10px;
  background-color: #ded3d3;
`;

const Title = styled.div`
  color: #6d5b48;
  font-size: 24px;
  font-weight: 600;
`;

const TripName = styled.div``;

const TripCity = styled.div``;

const TripTime = styled.div``;

const TripImageContainer = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TripImage = styled.img`
  width: 90%;
  height: 90%;
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 30px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;
