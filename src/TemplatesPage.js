import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
  CardActionArea,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { getTemplates, currentUser } from "./firebase.js"; // Import your template storage functions here
import AddDialog from "./AddDialog.js";
import DeleteDialog from "./DeleteDialog.js";
import EditDialog from "./EditDialog.js";

import { useNavigate, useLocation } from "react-router-dom";

const TemplatesPage = ({
  currentProjectId,
  setCurrentProjectId,
  handleIsProject,
  isProject,
}) => {
  const [templates, setTemplates] = useState([]);
  const [currentTemplateId, setCurrentTemplateId] = useState({});
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false);
  const [showEditTemplateDialog, setShowEditTemplateDialog] = useState(false);
  const [showDeleteTemplateDialog, setShowDeleteTemplateDialog] =
    useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState("");
  const [displayMode, setDisplayMode] = useState("grid");

  const location = useLocation(); // Use the useLocation hook

  const handleListDisplay = () => {
    setDisplayMode("list");
  };

  const handleGridDisplay = () => {
    setDisplayMode("grid");
  };

  const handleAddTemplate = () => {
    setShowAddTemplateDialog(true);
  };

  const handleCloseDialogs = () => {
    setShowAddTemplateDialog(false);
    setShowEditTemplateDialog(false);
    setShowDeleteTemplateDialog(false);
  };

  const handleEditTemplate = (templateId) => {
    setCurrentTemplateId(templateId);
    setShowEditTemplateDialog(true);
  };

  const handleDeleteTemplate = (templateId) => {
    setCurrentTemplateId(templateId);
    setShowDeleteTemplateDialog(true);
    setDeleteTemplateId(templateId);
  };

  const templatesDB = () => {
    // Implement getTemplates function
    getTemplates().then((getTemplatesQueryResult) => {
      const filteredTemplates = getTemplatesQueryResult
        .filter((template) => template.data.currentUser === currentUser)
        .filter((t) => t.data.projectId == currentProjectId);
      setTemplates(filteredTemplates);
    });
  };

  useEffect(() => {
    templatesDB();
    if (location.pathname.includes("templates")) {
      handleIsProject(false);
    }
  }, []);

  return (
    <Container maxWidth>
      <div
        id="categories"
        style={{ margin: "10px", marginTop: "20px", textAlign: "end" }}
      >
        <Button
          variant="contained"
          onClick={handleListDisplay}
          sx={{ mr: "6px" }}
        >
          <FormatListBulletedIcon />
        </Button>
        <Button variant="contained" onClick={handleGridDisplay}>
          <GridViewIcon />
        </Button>
      </div>

      <div id="templatesMain">
        {displayMode === "grid" && (
          <Button sx={{ m: "10px" }} onClick={handleAddTemplate}>
            <AddCircleIcon /> Add new template
          </Button>
        )}

        {displayMode === "list" && (
          <Button sx={{ m: "10px" }} onClick={handleAddTemplate}>
            <AddCircleIcon /> Add new template
          </Button>
        )}

        {displayMode === "grid" && (
          <Grid container spacing={2}>
            {templates.map((template) => (
              <Grid item key={template.id} xs={12} sm={6} md={4} lg={3}>
                <Card elevation={5}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{ m: "6px", ml: "20px" }}
                    >
                      {template.data.name}
                    </Typography>
                    <Typography variant="body1" sx={{ m: "6px", ml: "20px" }}>
                      {template.data.description}
                    </Typography>

                    <div style={{ display: "flex" }}>
                      <Typography variant="body1" sx={{ m: "6px", ml: "20px" }}>
                        {template.data.date}
                      </Typography>
                      <IconButton
                        sx={{ mr: "0px", ml: "auto" }}
                        color="secondary"
                        onClick={() => handleEditTemplate(template.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ mr: "0px", ml: "1px" }}
                        color="secondary"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {displayMode === "list" && (
          <div>
            <div style={{ display: "flex" }}>
              <Typography
                variant="subtitle2"
                color="secondary"
                sx={{ ml: "24px", width: "29%", color: "grey" }}
              >
                Title
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ ml: "20px", width: "29%", color: "grey" }}
              >
                Description
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ ml: "20px", width: "31%", color: "grey" }}
              >
                Date
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "grey" }}>
                Options
              </Typography>
            </div>

            <List>
              {templates.map((template) => (
                <ListItem key={template.id}>
                  <Card sx={{ width: "100%" }} onClick={setDeleteTemplateId}>
                    <CardActionArea>
                      <div style={{ display: "flex" }}>
                        <Typography
                          variant="h6"
                          sx={{ m: "6px", ml: "20px", width: "28%" }}
                        >
                          {template.data.name}
                        </Typography>
                        <Divider width="20px" orientation="vertical" flexItem />
                        <Typography
                          variant="h6"
                          sx={{ m: "6px", ml: "20px", width: "28%" }}
                        >
                          {template.data.description}
                        </Typography>
                        <Divider width="20px" orientation="vertical" flexItem />
                        <Typography
                          variant="h6"
                          sx={{ m: "6px", ml: "20px", width: "28%" }}
                        >
                          {template.data.date}
                        </Typography>
                        <Divider width="20px" orientation="vertical" flexItem />
                        <div style={{ display: "flex" }}>
                          <IconButton
                            color="secondary"
                            onClick={() => handleEditTemplate(template.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>

      {showAddTemplateDialog && (
        <AddDialog
          templatesDB={templatesDB}
          open={showAddTemplateDialog}
          handleClose={handleCloseDialogs}
          isProject={isProject}
          currentProjectId={currentProjectId}
          setCurrentProjectId={setCurrentProjectId}
        />
      )}

      {showEditTemplateDialog && (
        <EditDialog
          currentTemplateId={currentTemplateId}
          open={showEditTemplateDialog}
          handleClose={handleCloseDialogs}
          templatesDB={templatesDB}
          setShowEditTemplateDialog={setShowEditTemplateDialog}
          isProject={isProject}
          currentProjectId={currentProjectId}
          setCurrentProjectId={setCurrentProjectId}
        />
      )}

      {showDeleteTemplateDialog && (
        <DeleteDialog
          deleteTemplateId={deleteTemplateId}
          setShowDeleteTemplateDialog={setShowDeleteTemplateDialog}
          templatesDB={templatesDB}
          open={showDeleteTemplateDialog}
          handleClose={handleCloseDialogs}
          isProject={isProject}
          currentProjectId={currentProjectId}
        />
      )}
    </Container>
  );
};

export default TemplatesPage;
