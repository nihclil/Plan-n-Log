"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ToolBar from "./ToolBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";

const Tiptap = ({ onEditorUpdate, initialContent, params, onFileChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({ placeholder: "Write your story..." }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        style:
          "outline: none; margin:auto; width:800px;  padding:20px 10px 10px 40px;line-height: 1.6; ",
      },
    },

    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      onEditorUpdate(htmlContent);
    },
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) {
    return null;
  }

  return (
    <TiptapContainer>
      <ToolBar editor={editor} params={params} />
      <StyledEditor>
        <EditorContent editor={editor} />
      </StyledEditor>
    </TiptapContainer>
  );
};

const TiptapContainer = styled.div`
  height: 700px;
  max-height: 800px;
  background-color: aliceblue;
  overflow-y: auto;

  overflow-x: hidden;
`;

const StyledEditor = styled.div`
  .ProseMirror .is-editor-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: #234d78;
    pointer-events: none;
    height: 0;
  }
`;

export default Tiptap;
