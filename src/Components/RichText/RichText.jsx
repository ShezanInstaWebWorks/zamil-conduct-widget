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
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          minHeight: 0, // ✅ important in flex layouts

          // Scroll on EditorContent itself
          "& .editor-scroll": {
            height: 254, // fixed viewport height
            overflowY: "auto", // scroll inside EditorContent
            overscrollBehavior: "contain",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "action.disabled",
            },
          },

          // ProseMirror content area
          "& .editor-scroll .ProseMirror": {
            padding: 2,
            outline: "none",
            cursor: "text",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            minHeight: 220, // keep blank area clickable
            boxSizing: "border-box",
          },
        }}
      >
        <EditorContent editor={editor} className="editor-scroll" />
      </Box>
    </Box>
  );
};

export default RichText;
