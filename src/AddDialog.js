import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { currentUser, newProject, newTemplate } from "./firebase";

const AddDialog = ({
  open,
  handleClose,
  projectsDB,
  templatesDB,
  isProject,
  currentProjectId,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const handleAddProject = () => {
    // Implement newProject function
    newProject(name, description, formattedDate, currentUser)
      .then(() => {
        handleClose();
        projectsDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddTemplate = () => {
    // Implement newProject function
    newTemplate(name, description, formattedDate, currentUser, currentProjectId)
      .then(() => {
        handleClose();
        templatesDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isProject ? "Add New Project" : "Add New Template"}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ m: "6px" }}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ m: "6px" }}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={isProject ? handleAddProject : handleAddTemplate}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
