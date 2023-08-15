import React, { useState, useRef } from "react";
import {
  Container,
  Button,
  Card,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonGroup,
  CardContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import SegmentIcon from "@mui/icons-material/Segment";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import AbcIcon from "@mui/icons-material/Abc";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
const DocumentCustomizationPage = () => {
  const [currentAlignBtn, setCurrentAlignBtn] = useState("left");

  const [showOptionsButtons, setShowOptionsButtons] = useState(false);
  const [activeAddButton, setActiveAddButton] = useState(null);
  const [activeOptionButton, setActiveOptionButton] = useState(null);
  const [font, setFont] = useState("arial");
  const [fontSize, setFontSize] = useState("10");
  const [showParagraphOptions, setShowParagraphOptions] = useState(false);
  const [appliedText, setAppliedText] = useState("");

  const [activeSpan, setActiveSpan] = useState(null);

  const handleSetFontSize = (event) => {
    setFontSize(event.target.value);
  };

  const [textOptions, setTextOptions] = useState({
    normal: true,
    bold: false,
    underline: false,
    italic: false,
  });

  const handleCurrentAlignBtn = (alignment) => {
    setCurrentAlignBtn(alignment);
  };

  const handleToggleTextOption = (option) => {
    if (option === "normal") {
      setTextOptions({
        normal: true,
        bold: false,
        underline: false,
        italic: false,
      });
    } else {
      setTextOptions((prevOptions) => ({
        ...prevOptions,
        normal: false,
        [option]: !prevOptions[option],
      }));
    }
  };

  const handleSetFont = (event) => {
    setFont(event.target.value);
  };

  const handleAddButtonClick = (buttonId) => {
    setActiveAddButton(buttonId);
    setShowOptionsButtons(true);
  };

  const handleActiveOptionButton = (buttonId) => {
    setActiveOptionButton(buttonId);
    setShowParagraphOptions(buttonId === "paragraph");
  };
  const divRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  const handleApplyButtonClick = () => {
    if (activeAddButton && appliedText) {
      const targetDiv = divRefs[activeAddButton].current;
      if (targetDiv) {
        let textElement = activeSpan;

        if (textElement) {
          // Modify the clicked span's content
          textElement.textContent = appliedText;
          if (textOptions.bold) {
            textElement.style.fontWeight = "bold";
          }
          if (textOptions.underline) {
            textElement.style.textDecoration = "underline";
          }
          if (textOptions.italic) {
            textElement.style.fontStyle = "italic";
          }
          textElement.style.textAlign = currentAlignBtn;
          textElement.style.display = "block";
          textElement.style.width = "100%";
          textElement.addEventListener("click", () => {
            setAppliedText(textElement.textContent);
            setActiveSpan(textElement);
          });
        } else {
          // Create a new span element
          textElement = document.createElement("span");
          textElement.textContent = appliedText;
          if (textOptions.bold) {
            textElement.style.fontWeight = "bold";
          }
          if (textOptions.underline) {
            textElement.style.textDecoration = "underline";
          }
          if (textOptions.italic) {
            textElement.style.fontStyle = "italic";
          }
          textElement.style.textAlign = currentAlignBtn;
          textElement.style.display = "block";
          textElement.style.width = "100%";
          textElement.addEventListener("click", () => {
            setAppliedText(textElement.textContent);
            setActiveSpan(textElement);
          });

          targetDiv.appendChild(textElement);
        }
      }

      setAppliedText("");
      setActiveSpan(null);
    }
  };
  return (
    <Container maxWidth>
      <div style={{ textAlign: "end", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100px", m: "10px" }}
        >
          Save <SaveIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100px", m: "10px" }}
        >
          Delete <DeleteIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100px", m: "10px" }}
        >
          Preview <PreviewIcon />
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "1200px" }}>
          <div
            id="optionsButtons"
            style={{
              display: "grid",
              alignContent: "baseline",
              height: "1100px",
              marginTop: "100px",
              visibility: showOptionsButtons ? "visible" : "hidden",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "50px",
                m: "6px",
                backgroundColor:
                  activeOptionButton === "paragraph" ? "darkorange" : "primary",
                "&:hover": {
                  backgroundColor: "darkorange",
                },
              }}
              onClick={() => handleActiveOptionButton("paragraph")}
            >
              <SegmentIcon fontSize="large" />
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "50px",
                m: "6px",
                backgroundColor:
                  activeOptionButton === "table" ? "darkorange" : "primary",
                "&:hover": {
                  backgroundColor: "darkorange",
                },
              }}
              onClick={() => handleActiveOptionButton("table")}
            >
              {" "}
              <BackupTableIcon fontSize="large" />
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "50px",
                m: "6px",
                backgroundColor:
                  activeOptionButton === "image" ? "darkorange" : "primary",
                "&:hover": {
                  backgroundColor: "darkorange",
                },
              }}
              onClick={() => handleActiveOptionButton("image")}
            >
              <ImageIcon fontSize="large" />
            </Button>
          </div>
          <Card
            id="document"
            elevation={11}
            sx={{
              m: "100px",
              height: "1100px",
              width: "800px",
              marginLeft: "200px",
            }}
          >
            <CardContent sx={{ m: "10px" }}>
              <div
                ref={divRefs["1"]}
                id="upper"
                style={{
                  height: "260px",
                  borderBottom: "4px dotted gray",
                  marginBottom: "6px",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor:
                      activeAddButton === "1" ? "darkorange" : "primary",
                    "&:hover": {
                      backgroundColor: "darkorange",
                    },
                  }}
                  onClick={() => handleAddButtonClick("1")}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </div>
              <div
                ref={divRefs["2"]}
                id="middle"
                style={{
                  height: "550px",
                  borderBottom: "4px dotted gray",
                  marginBottom: "6px",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor:
                      activeAddButton === "2" ? "darkorange" : "primary",
                    "&:hover": {
                      backgroundColor: "darkorange",
                    },
                  }}
                  onClick={() => handleAddButtonClick("2")}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </div>
              <div id="down" ref={divRefs["3"]}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor:
                      activeAddButton === "3" ? "darkorange" : "primary",
                    "&:hover": {
                      backgroundColor: "darkorange",
                    },
                  }}
                  onClick={() => handleAddButtonClick("3")}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ display: "flex", width: "40%", marginTop: "100px" }}>
          <Card
            variant="outlined"
            sx={{ height: "1100px", width: "80%", mr: "0px", ml: "auto" }}
          >
            <CardContent>
              <div
                id="paragraphOptions"
                style={{ display: showParagraphOptions ? "block" : "none" }}
              >
                <Typography variant="h5" sx={{ mb: "16px" }}>
                  Paragraph
                </Typography>
                <FormControl fullWidth sx={{ mb: "16px" }}>
                  <InputLabel id="fontLabel">Font</InputLabel>
                  <Select
                    labelId="fontLabel"
                    id="fontSelect"
                    value={font}
                    label="Font"
                    onChange={handleSetFont}
                  >
                    <MenuItem value={"arial"}>Arial</MenuItem>
                    <MenuItem value={"verdana"}>Verdana</MenuItem>
                    <MenuItem value={"monaco"}>Monaco</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body1">Text Options:</Typography>
                <ButtonGroup variant="contained" sx={{ mt: "4px", mb: "10px" }}>
                  <Button
                    onClick={() => handleToggleTextOption("normal")}
                    sx={{
                      backgroundColor: textOptions.normal
                        ? "darkorange"
                        : "primary",
                      "&:hover": {
                        backgroundColor: textOptions.normal
                          ? "darkorange"
                          : "primary",
                      },
                    }}
                  >
                    <AbcIcon />
                  </Button>
                  <Button
                    onClick={() => handleToggleTextOption("bold")}
                    sx={{
                      backgroundColor: textOptions.bold
                        ? "darkorange"
                        : "primary",
                      "&:hover": {
                        backgroundColor: textOptions.bold
                          ? "darkorange"
                          : "primary",
                      },
                    }}
                  >
                    <FormatBoldIcon />
                  </Button>
                  <Button
                    onClick={() => handleToggleTextOption("underline")}
                    sx={{
                      backgroundColor: textOptions.underline
                        ? "darkorange"
                        : "primary",
                      "&:hover": {
                        backgroundColor: textOptions.underline
                          ? "darkorange"
                          : "primary",
                      },
                    }}
                  >
                    <FormatUnderlinedIcon />
                  </Button>
                  <Button
                    onClick={() => handleToggleTextOption("italic")}
                    sx={{
                      backgroundColor: textOptions.italic
                        ? "darkorange"
                        : "primary",
                      "&:hover": {
                        backgroundColor: textOptions.italic
                          ? "darkorange"
                          : "primary",
                      },
                    }}
                  >
                    <FormatItalicIcon />
                  </Button>
                </ButtonGroup>
                <Typography variant="body1">Align text:</Typography>
                <ButtonGroup variant="contained" sx={{ mt: "4px", mb: "10px" }}>
                  <Button
                    onClick={() => handleCurrentAlignBtn("left")}
                    sx={{
                      backgroundColor:
                        currentAlignBtn === "left" ? "darkorange" : "primary",
                      "&:hover": {
                        backgroundColor:
                          currentAlignBtn === "left" ? "darkorange" : "primary",
                      },
                    }}
                  >
                    <FormatAlignLeftIcon />
                  </Button>
                  <Button
                    onClick={() => handleCurrentAlignBtn("center")}
                    sx={{
                      backgroundColor:
                        currentAlignBtn === "center" ? "darkorange" : "primary",
                      "&:hover": {
                        backgroundColor:
                          currentAlignBtn === "center"
                            ? "darkorange"
                            : "primary",
                      },
                    }}
                  >
                    <FormatAlignJustifyIcon />
                  </Button>
                  <Button
                    onClick={() => handleCurrentAlignBtn("right")}
                    sx={{
                      backgroundColor:
                        currentAlignBtn === "right" ? "darkorange" : "primary",
                      "&:hover": {
                        backgroundColor:
                          currentAlignBtn === "right"
                            ? "darkorange"
                            : "primary",
                      },
                    }}
                  >
                    <FormatAlignRightIcon />
                  </Button>
                </ButtonGroup>
                <FormControl fullWidth sx={{ mt: "16px", mb: "16px" }}>
                  <InputLabel id="fontSizeLabel">Size</InputLabel>
                  <Select
                    labelId="fontSizeLabel"
                    id="fontSizeSelect"
                    value={fontSize}
                    label="Size"
                    onChange={handleSetFontSize}
                  >
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"12"}>12</MenuItem>
                    <MenuItem value={"14"}>14</MenuItem>
                    <MenuItem value={"16"}>16</MenuItem>
                    <MenuItem value={"18"}>18</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                  </Select>
                </FormControl>
                <div style={{ display: "inline-grid" }}>
                  <Button variant="contained" color="primary" sx={{ m: "4px" }}>
                    Add company data
                  </Button>
                  <Button variant="contained" color="primary" sx={{ m: "4px" }}>
                    Add vendor data
                  </Button>
                  <Button variant="contained" color="primary" sx={{ m: "4px" }}>
                    Add document date
                  </Button>
                  <Button variant="contained" color="primary" sx={{ m: "4px" }}>
                    Add document number
                  </Button>
                </div>
                <TextField
                  id="textInput"
                  label="Write here!"
                  multiline
                  rows={6}
                  sx={{
                    width: "100%",
                    mt: "16px",
                    fontFamily: font, // Apply the selected font
                    fontSize: fontSize + "px", // Apply the selected font size
                    textAlign: currentAlignBtn, // Apply the selected alignment
                  }}
                  placeholder="Write here..."
                  value={appliedText} // Bind value to the state
                  onChange={(e) => setAppliedText(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: "44%", mt: "16px" }}
                  onClick={handleApplyButtonClick}
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default DocumentCustomizationPage;
