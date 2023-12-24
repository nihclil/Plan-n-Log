"use client";

import Tiptap from "components/TiptapEditor/Tiptap";
import styled from "styled-components";
import { db } from "lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoadingEffect from "components/Common/Loading/LoadingEffect";
import useAuthRedirect from "hooks/useAuthRedirect";
import TripColumn from "components/Common/DataDisplay/TripColumn";

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

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <FlexContainer>
        <TripColumn item={tripDetails} />
        <Tiptap
          onEditorUpdate={getTiptapContent}
          initialContent={content}
          params={params}
        />
      </FlexContainer>
      <SaveButtonContainer>
        <SaveButton onClick={saveData}>Save</SaveButton>
      </SaveButtonContainer>
    </Main>
  );
}

const Main = styled.div`
  width: 1200px;
  margin: 20px auto 0px auto;
  @media (min-width: 360px) and (max-width: 1300px) {
    width: auto;
    margin: 20px 20px 0px 20px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  @media (min-width: 360px) and (max-width: 600px) {
    width: auto;
    flex-direction: column;
    align-items: center;
  }
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
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
