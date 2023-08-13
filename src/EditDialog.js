import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { editProjectData, editTemplateData } from "./firebase";

const EditDialog = ({
  open,
  handleClose,
  projectsDB,
  currentProjectId,
  setShowEditProjectDialog,
  setShowEditTemplateDialog,
  isProject,
  templatesDB,
  currentTemplateId,
}) => {
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const handleEditProject = () => {
    // Implement editProjectData function
    editProjectData(currentProjectId, formattedDate, editName, editDescription)
      .then(() => {
        setShowEditProjectDialog(false);
        projectsDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditTemplate = () => {
    // Implement editProjectData function
    editTemplateData(
      currentTemplateId,
      formattedDate,
      editName,
      editDescription,
      currentProjectId
    )
      .then(() => {
        setShowEditTemplateDialog(false);
        templatesDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isProject ? "Edit Project" : "Edit Template"}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ m: "6px" }}
          label="Edit Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <TextField
          sx={{ m: "6px" }}
          label="Edit Description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={isProject ? handleEditProject : handleEditTemplate}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
