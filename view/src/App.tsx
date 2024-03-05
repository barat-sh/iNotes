import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <Suspense fallback="Loading...">
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback="Loading...">
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
