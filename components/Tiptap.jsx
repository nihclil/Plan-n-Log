"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import styled from "styled-components";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Hi",
    editorProps: {
      attributes: {
        style:
          "outline: none; margin:auto; width:800px; height:100vh; ;padding:20px 10px 10px 40px;line-height: 1.6; ",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <TiptapContainer>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </TiptapContainer>
  );
};

const TiptapContainer = styled.div`
  background-color: aliceblue;
  height: 100vh;
`;

export default Tiptap;
