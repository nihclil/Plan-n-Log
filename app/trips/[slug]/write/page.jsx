"use client";

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

  const getTiptapContent = (data) => {
    setContent(data);
  };

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

  return (
    <Main>
      <Container>
        <TripInfo></TripInfo>
        <Tiptap onEditorUpdate={getTiptapContent} initialContent={content} />
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
  background-color: #95c3c3;
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
