import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './scenes/login/Login';
// import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Login/>}>
//       <Route path="/app" element={<App/>}/>
//     </Route>
//   )
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //      <App />
  //   </BrowserRouter>
  //  </React.StrictMode>

  <Router>
      <Routes>
        {/* React Router v6 uses 'element' instead of 'component' */}
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>


  // <React.StrictMode>
  //   <RouterProvider router={router}/>
  //  </React.StrictMode>
  //  <React.StrictMode>
  //     <Router>
  //    <Routes>
  //      {/* <Route path="/" element={<Login />} />  Login route */}
  //      <Route path="/" element={<App />} /> {/* Dashboard route */}
  //   </Routes>
  //  </Router>,
  //  </React.StrictMode>
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<Login />} />  {/* Login route */}
  //     <Route path="/app" element={<App />} /> {/* Dashboard route */}
  //   </Routes>
  // </Router>,
  // <Router>  {/* This is where the BrowserRouter starts */}
  //   <Routes>  {/* This is where you define your routes */}
  //        {/* The login page */}
  //     <Route path="/App" element={<App />} />  {/* The main app/dashboard page */}
  //   </Routes>
  // </Router>,
);


