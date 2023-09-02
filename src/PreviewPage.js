import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTemplates } from "./firebase";
import { Card, CardContent, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const removeButtonsFromContent = (content) => {
  // Define a regular expression to match button elements
  const buttonRegex = /<button\b[^>]*>.*?<\/button>/g;

  // Remove all button elements from the content
  const cleanContent = content.replace(buttonRegex, "");

  return cleanContent;
};

const PreviewPage = () => {
  const [previewContent, setPreviewContent] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const templateId = new URLSearchParams(location.search).get("template");

  const divRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  const exportToPDF = async () => {
    const documentCard = document.getElementById("document");

    if (documentCard) {
      try {
        const canvas = await html2canvas(documentCard, {
          scale: 4, // You can adjust this scale for better quality
          logging: false, // Disable console logging from html2canvas
        });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("document.pdf");
      } catch (error) {
        console.error("Error exporting to PDF:", error);
      }
    }
  };

  React.useEffect(() => {
    // Function to attach the click event listener to AddIcon buttons and update style
    // Fetch the current template by templateId and update the templateContent state
    if (templateId) {
      getTemplates()
        .then((templates) => {
          const template = templates.find(
            (template) => template.id === templateId
          );
          if (template) {
            const parsedContent = JSON.parse(template.data.content);

            if (parsedContent["1"]) {
              const cleanedContent = removeButtonsFromContent(
                parsedContent["1"]
              );
              divRefs["1"].current.innerHTML = cleanedContent;
              // Remove the bottom border
              divRefs["1"].current.style.borderBottom = "none";
            }
            if (parsedContent["2"]) {
              const cleanedContent = removeButtonsFromContent(
                parsedContent["2"]
              );
              divRefs["2"].current.innerHTML = cleanedContent;
              // Remove the bottom border
              divRefs["2"].current.style.borderBottom = "none";
            }
            if (parsedContent["3"]) {
              const cleanedContent = removeButtonsFromContent(
                parsedContent["3"]
              );
              divRefs["3"].current.innerHTML = cleanedContent;
              // Remove the bottom border
              divRefs["3"].current.style.borderBottom = "none";
            }

            setPreviewContent(parsedContent);
          }
        })
        .catch((error) => {
          console.error("Error fetching templates:", error);
        });
    }
  }, [templateId]);

  return (
    <div>
      <Button
        onClick={() => {
          exportToPDF();
        }}
      >
        Export to PDF
      </Button>
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
          <div ref={divRefs["1"]} id="upper"></div>
          <div ref={divRefs["2"]} id="middle"></div>
          <div id="down" ref={divRefs["3"]}></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewPage;
