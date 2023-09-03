import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthentificationPage from "./AuthentificationPage";
import ProjectsPage from "./ProjectsPage";
import TemplatesPage from "./TemplatesPage"
import Header from "./Header";
import DocumentCustomizationPage from "./DocumentCustomizationPage";
import PreviewPage from "./PreviewPage"
import ProfilePage from "./ProfilePage";
import MyVendors from "./MyVendors"
import MyProducts from "./MyProducts";

function App() {

  

  const [isProject, setIsProject] = React.useState(false);
  const [currentProjectId, setCurrentProjectId] = React.useState({});

  const handleIsProject = (bool) => {
    setIsProject(bool);
  };

  

  return (
    <div>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<AuthentificationPage />} />
          <Route path="/projects" element={<ProjectsPage isProject={isProject} handleIsProject={handleIsProject} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId} />} />
          <Route path='/templates' element={<TemplatesPage isProject={isProject} handleIsProject={handleIsProject} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId}/>}/>
          <Route path='/documentCustomization' element={<DocumentCustomizationPage/>} />
          <Route path='/previewPage' element={<PreviewPage/>} />
          <Route path='/profilePage' element={<ProfilePage/>} />
          <Route path='/myVendors' element={<MyVendors/>} />
          <Route path='/myProducts' element={<MyProducts/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
