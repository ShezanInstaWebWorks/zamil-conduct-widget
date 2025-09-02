import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import MenuBar from "./MenuBar";
import { Box } from "@mui/material";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";

const RichText = ({ emailBodyContent, setEmailBodyContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextStyle,
      Color,
      BulletList,
      FontFamily,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: emailBodyContent,
    onUpdate: ({ editor }) => {
      setEmailBodyContent(editor.getHTML()); // Store updated content
    },
  });

  return (
    <Box>
      <MenuBar editor={editor} />
      <Box
        sx={{
          my: 1,
        }}
      >
        <EditorContent className="editor-container" editor={editor} />
      </Box>
    </Box>
  );
};

export default RichText;
