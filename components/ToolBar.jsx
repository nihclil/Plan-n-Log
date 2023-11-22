"use client";

import { Editor } from "@tiptap/react";
import styled from "styled-components";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
} from "lucide-react";

export default function ToolBar({ editor }) {
  if (!editor) {
    return null;
  }
  return (
    <ToolBarContainer>
      <ToolBarButton
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading2 className="h-4 w-4" />
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
    </ToolBarContainer>
  );
}

const ToolBarContainer = styled.div`
  display: flex;
  justify-content: center;
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
