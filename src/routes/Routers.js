import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PhotoCollageMake from "../pages/PhotoCollageMake";
import PhotoCollageTemplate from "../pages/PhotoCollageTemplate";
import listTemplates from "../assets/fake-data/template";

const Routers = () => {
  const [listDrop, setListDrop] = useState(listTemplates[0].data);
  const [template, setTemplate] = useState(listTemplates[0].type);
  
  return (
    <Routes>
      <Route
        path="/"
        element={<PhotoCollageMake listDrop={listDrop} setListDrop={setListDrop} template={template} />}
      />
      <Route
        path="/photo-collage-templates"
        element={<PhotoCollageTemplate setListDrop={setListDrop} setTemplate={setTemplate} />}
      />
    </Routes>
  );
};

export default Routers;
