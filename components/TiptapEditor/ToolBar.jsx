"use client";

import styled from "styled-components";
import { Bold, Italic, List, ListOrdered, Heading3, Image } from "lucide-react";
import { storage } from "lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "hooks/authContext";
import { v4 } from "uuid";

export default function ToolBar({ editor, params }) {
  if (!editor) {
    return null;
  }

  const { user } = UserAuth();
  //上傳照片到資料庫
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageRef = ref(
      storage,
      `trip/${user.uid}/${params.slug}/write/${file.name + v4()}`
    );
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then((url) => {
        if (editor) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      });
    });
  };

  return (
    <ToolBarContainer>
      <ToolBarButton
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <Heading3 className="h-4 w-4" />
      </ToolBarButton>

      <ToolBarButton
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="h-4 w-4" />
      </ToolBarButton>

      <ToolBarButton
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="h-4 w-4" />
      </ToolBarButton>

      <ToolBarButton
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="h-4 w-4" />
      </ToolBarButton>

      <ToolBarButton
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolBarButton>

      <ToolBarButton onChange={handleFileChange}>
        <label htmlFor="file">
          <Image className="h-4 w-4" alt="image" />
          <input id="file" type="file" style={{ display: "none" }} />
        </label>
      </ToolBarButton>
    </ToolBarContainer>
  );
}

const ToolBarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const ToolBarButton = styled.button`
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  padding: 5px 10px;

  cursor: pointer;
  &.is-active,
  &:hover {
    background-color: #b29a9a;
  }
`;
