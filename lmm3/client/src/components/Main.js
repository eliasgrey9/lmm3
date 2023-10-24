import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import WebsiteInMaintenance from "./WebsiteInMaintenance/WebsiteInMaintenance";

function Main() {
  return (
    <div className="App">
      <div>Hi</div>
      <Routes>
        {/* <Route path="/lasermaps/:userId" element={<Map />}></Route> */}
        {/* <Route path="/*" element={<Navigate to="/lasermaps/guest" />} /> */}
      </Routes>
    </div>
  );
}

export default Main;
