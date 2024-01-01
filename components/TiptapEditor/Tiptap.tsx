"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ToolBar from "components/TiptapEditor/ToolBar";
import styled from "styled-components";
import { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  onEditorUpdate: (htmlContent: string) => void;
  initialContent: string;
  params: { slug: string };
}

const Tiptap = ({ onEditorUpdate, initialContent, params }: Props) => {
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
          "outline: none; margin: auto; width: 90%; padding: 20px 10px 10px 20px; line-height: 1.6;",
      },
    },

    onBlur({ editor }) {
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
  height: 600px;
  width: 800px;
  background-color: #fff;

  overflow-y: auto;
  @media (min-width: 360px) and (max-width: 1300px) {
    width: 80%;
  }
`;

const StyledEditor = styled.div`
  .ProseMirror .is-editor-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: #8b8282;
    pointer-events: none;
    height: 0;
  }
`;

export default Tiptap;
