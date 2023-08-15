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
import { getProjects, currentUser } from "./firebase.js"; // Import your project storage functions here
import AddDialog from "./AddDialog.js";
import DeleteDialog from "./DeleteDialog.js";
import EditDialog from "./EditDialog.js";
import { useNavigate, useLocation } from "react-router-dom";

const ProjectsPage = ({
  currentProjectId,
  setCurrentProjectId,
  handleIsProject,
  isProject,
}) => {
  const [projects, setProjects] = useState([]);

  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [showEditProjectDialog, setShowEditProjectDialog] = useState(false);
  const [showDeleteProjectDialog, setShowDeleteProjectDialog] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [displayMode, setDisplayMode] = useState("grid");

  const navigate = useNavigate();

  const location = useLocation(); // Use the useLocation hook

  const handleListDisplay = () => {
    setDisplayMode("list");
  };

  const handleGridDisplay = () => {
    setDisplayMode("grid");
  };

  const handleAddProject = () => {
    setShowAddProjectDialog(true);
  };

  const handleCloseDialogs = () => {
    setShowAddProjectDialog(false);
    setShowEditProjectDialog(false);
    setShowDeleteProjectDialog(false);
  };

  const handleEditProject = (projectId) => {
    setCurrentProjectId(projectId);
    setShowEditProjectDialog(true);
  };

  const handleDeleteProject = (projectId) => {
    setCurrentProjectId(projectId);
    setShowDeleteProjectDialog(true);
    setDeleteProjectId(projectId);
  };

  const handleClickProject = (projectId, projectName) => {
    setCurrentProjectId(projectId);
    navigate(`/templates?project=${projectName}`);
  };

  const projectsDB = () => {
    // Implement getProjects function
    getProjects().then((getProjectsQueryResult) => {
      const filteredProjects = getProjectsQueryResult.filter(
        (project) => project.data.currentUser === currentUser
      );
      setProjects(filteredProjects);
    });
  };

  useEffect(() => {
    projectsDB();
    if (location.pathname.includes("projects")) {
      handleIsProject(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <div id="projectsMain">
        {displayMode === "grid" && (
          <Button sx={{ m: "10px" }} onClick={handleAddProject}>
            <AddCircleIcon /> Add new project
          </Button>
        )}

        {displayMode === "list" && (
          <Button sx={{ m: "10px" }} onClick={handleAddProject}>
            <AddCircleIcon /> Add new project
          </Button>
        )}

        {displayMode === "grid" && (
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4} lg={3}>
                <Card elevation={5}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{ m: "6px", ml: "20px" }}
                      onClick={() =>
                        handleClickProject(project.id, project.data.name)
                      }
                    >
                      {project.data.name}
                    </Typography>
                    <Typography variant="body1" sx={{ m: "6px", ml: "20px" }}>
                      {project.data.description}
                    </Typography>

                    <div style={{ display: "flex" }}>
                      <Typography variant="body1" sx={{ m: "6px", ml: "20px" }}>
                        {project.data.date}
                      </Typography>
                      <IconButton
                        sx={{ mr: "0px", ml: "auto" }}
                        color="secondary"
                        onClick={() => handleEditProject(project.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ mr: "0px", ml: "1px" }}
                        color="secondary"
                        onClick={() => handleDeleteProject(project.id)}
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
              {projects.map((project) => (
                <ListItem key={project.id}>
                  <Card sx={{ width: "100%" }} onClick={setDeleteProjectId}>
                    <CardActionArea>
                      <div style={{ display: "flex" }}>
                        <Typography
                          onClick={() =>
                            navigate(`/templates?project=${project.data.name}`)
                          }
                          variant="h6"
                          sx={{ m: "6px", ml: "20px", width: "28%" }}
                        >
                          {project.data.name}
                        </Typography>
                        <Divider width="20px" orientation="vertical" flexItem />
                        <Typography
                          variant="h6"
                          sx={{ m: "6px", ml: "20px", width: "28%" }}
                        >
                          {project.data.description}
                        </Typography>
                        <Divider width="20px" orientation="vertical" flexItem />
                        <Typography
                          variant="h6"
                          sx={{ m: "6px", ml: "20px", width: "28%" }}
                        >
                          {project.data.date}
                        </Typography>
                        <Divider width="20px" orientation="vertical" flexItem />
                        <div style={{ display: "flex" }}>
                          <IconButton
                            color="secondary"
                            onClick={() => handleEditProject(project.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteProject(project.id)}
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

      {showAddProjectDialog && (
        <AddDialog
          projectsDB={projectsDB}
          open={showAddProjectDialog}
          handleClose={handleCloseDialogs}
          isProject={isProject}
        />
      )}

      {showEditProjectDialog && (
        <EditDialog
          currentProjectId={currentProjectId}
          open={showEditProjectDialog}
          handleClose={handleCloseDialogs}
          projectsDB={projectsDB}
          setShowEditProjectDialog={setShowEditProjectDialog}
          isProject={isProject}
        />
      )}

      {showDeleteProjectDialog && (
        <DeleteDialog
          deleteProjectId={deleteProjectId}
          setShowDeleteProjectDialog={setShowDeleteProjectDialog}
          projectsDB={projectsDB}
          open={showDeleteProjectDialog}
          handleClose={handleCloseDialogs}
          isProject={isProject}
        />
      )}
    </Container>
  );
};

export default ProjectsPage;
