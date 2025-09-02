import {
  ToggleButtonGroup,
  Stack,
  ToggleButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useState } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import HighlightIcon from "@mui/icons-material/Highlight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const StyledButton = styled(ToggleButton)(({ theme }) => ({
  boxShadow: "none",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  "--ToggleButton-radius": "none",
}));

const ToolbarButton = forwardRef((props, ref) => (
  <StyledButton ref={ref} {...props} size="small" />
));

const MenuBar = ({ editor }) => {
  const [fontFamilyOpen, setFontFamilyOpen] = useState(null);
  const fontFamily = Boolean(fontFamilyOpen);
  const [fontSizeOpen, setFontSizeOpen] = useState(null);
  const fontSize = Boolean(fontSizeOpen);

  const handleModalOpen = (event) => {
    setFontFamilyOpen(event.currentTarget);
  };
  const handleModalClose = () => {
    setFontFamilyOpen(null);
  };

  const handleFontSizeOpen = (event) => {
    setFontSizeOpen(event.currentTarget);
  };
  const handleFontSizeClose = () => {
    setFontSizeOpen(null);
  };

  const handleSelectFont = (font) => {
    editor.chain().focus().setFontFamily(font).run();
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }} // Column on small, row on larger screens
      spacing={1}
      sx={{
        flexWrap: "wrap", // Allows wrapping in case of overflow
        // justifyContent: "center",
        alignItems: "center",
        overflowX: "auto", // Enables horizontal scrolling if needed
        padding: { xs: 2, sm: 0 }, // Adds padding for small screens
      }}
    >
      <ToggleButtonGroup sx={{ display: "flex", flexWrap: "wrap" }}>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          selected={editor.isActive("bold")}
        >
          <FormatBoldIcon fontSize="small" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          selected={editor.isActive("italic")}
        >
          <FormatItalicIcon fontSize="small" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          selected={editor.isActive("underline")}
        >
          <FormatUnderlinedIcon fontSize="small" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          selected={editor.isActive("code")}
        >
          <CodeIcon fontSize="small" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          selected={editor.isActive("highlight")}
        >
          <HighlightIcon fontSize="small" />
        </ToolbarButton>
        <ToolbarButton>
          <input
            type="color"
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
          />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FormatListBulletedIcon fontSize="small" />
        </ToolbarButton>
      </ToggleButtonGroup>

      <Typography
        sx={{
          fontSize: { xs: 12, sm: 13 },
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Tip: Press Windows + . (dot) or ⌃ + ⌘ + Space on Mac to insert emojis.
      </Typography>
    </Stack>
  );
};

export default MenuBar;
