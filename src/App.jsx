import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthentificationPage from "./AuthentificationPage";
import ProjectsPage from "./ProjectsPage";
import TemplatesPage from "./TemplatesPage"
import Header from "./Header";

function App() {

  const [isProject, setIsProject]=React.useState(false)
  const [currentProjectId, setCurrentProjectId] = React.useState({});

 const handleIsProject = (bool) =>{
  setIsProject(bool)
 }



  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<AuthentificationPage />} />
          <Route path="/projects" element={<ProjectsPage isProject={isProject} handleIsProject={handleIsProject} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId} />} />
          <Route path='/templates' element={<TemplatesPage isProject={isProject} handleIsProject={handleIsProject} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
