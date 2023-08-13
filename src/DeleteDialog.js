import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { deleteProjectDB, deleteTemplateDB } from "./firebase";

const DeleteDialog = ({
  deleteProjectId,
  projectsDB,
  templatesDB,
  setShowDeleteProjectDialog,
  open,
  handleClose,
  isProject,
  deleteTemplateId,
  setShowDeleteTemplateDialog,
}) => {
  const handleConfirmDeleteProject = () => {
    // Implement deleteProjectDB function
    deleteProjectDB(deleteProjectId)
      .then(() => {
        setShowDeleteProjectDialog(false);
        projectsDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmDeleteTemplate = () => {
    // Implement deleteProjectDB function
    deleteTemplateDB(deleteTemplateId)
      .then(() => {
        setShowDeleteTemplateDialog(false);
        templatesDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isProject ? "Delete Project" : "Delete Template"}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this{" "}
          {isProject ? "project" : "template"}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={
            isProject ? handleConfirmDeleteProject : handleConfirmDeleteTemplate
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
