import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Detail from "./pages/detail/Detail";
import Dashboard from "./pages/dashboard/Dashboard";
import { MainContext } from "./Context";
import { useEffect, useState } from "react";

function App() {
  const authToken = localStorage.getItem("authToken");
  const [cauthToken, setCauthToken] = useState(null);
  const [cauthTokenType, setCauthTokenType] = useState(null);
  const [cuserId, setCuserId] = useState("");
  const [cuserName, setCuserName] = useState("");
  const [cname, setCname] = useState("");

  const data = {
    cauthToken,
    cauthTokenType,
    cuserId,
    cuserName,
    cname,
    setCauthToken,
    setCauthTokenType,
    setCuserId,
    setCuserName,
    setCname,
  };

  useEffect(() => {
    
    setCauthToken(localStorage.getItem('authToken'))
    setCauthTokenType(localStorage.getItem('authTokenType'))
    setCuserId(localStorage.getItem('userId'))
    setCuserName(localStorage.getItem('userName'))
    setCname(localStorage.getItem('name'))

  },[])

  const ProtectedRoute = ({ path, element }) => {
    return authToken ? (
      <Route path={path} element={element} />
    ) : (
      <Navigate to="/" replace={true} />
    );
  };

  return (
    <MainContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<List />} />
          <Route path="/vehicle/:id" element={<Detail />} />

          {/* Protected Dashboard route */}
          {authToken ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route
              path="/dashboard"
              element={<Navigate to="/" replace={true} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
