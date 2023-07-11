import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../Context";

const API_URL = "http://127.0.0.1:8000/";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const {setCauthToken} = useContext(MainContext)

  useEffect(()=>{
    setAuthToken(localStorage.getItem('authToken'))
    setAuthTokenType(localStorage.getItem('authTokenType'))
    setUserId(localStorage.getItem('userId'))
    setUserName(localStorage.getItem('userName'))
    setName(localStorage.getItem('name'))


  },[])



  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);

    setEmail("");
    setPassword("");
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);

    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = () => {
    let formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
  
    fetch(API_URL + "token", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Login failed. Please check your credentials.");
      })
      .then((data) => {
        console.log(data);
        setAuthToken(data.access_token);
        setAuthTokenType(data.token_type);
        setUserId(data.user_id);
        setUserName(data.user_name);
        setName(data.name);
  
        window.localStorage.setItem("authToken", data.access_token);
        window.localStorage.setItem("authTokenType", data.token_type);
        window.localStorage.setItem("userName", data.user_name);
        window.localStorage.setItem("userId", data.user_id);
        window.localStorage.setItem("name", data.name);

        setCauthToken(data.access_token)

        
      })
      .catch((error) => {
        alert(error.message);
      });
  
    console.log("Login", email, password);
  
    // navigate(`/dashboard`)
    handleLoginClose();
  };

  const handleLogout = ()=> {

    setAuthToken(null);
    setAuthTokenType(null);
    setUserId('');
    setUserName('');
    
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('authTokenType');
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('name')
    
    navigate(`/`)
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    // Perform register logic using email and password
    console.log("Register", userName, email, password);

    const json_string= JSON.stringify({
      name: userName,
      email : email,
      password : password
    })

    const requestOption= {
      method : 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body : json_string
    }

    fetch(API_URL + 'user/', requestOption)
    .then(response=>{
      if(response.ok) {
        return response.json()
      }  
      throw response      
    })
    .then(data => {
      handleLogin()

    })
    .catch(error=>{
      console.log(error)
      alert(error)
    })



    // Reset email, password, and confirm password fields
    // Close the register popup
    handleRegisterClose();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="logo">CAR RENTAL</h2>
        </Link>
        <div className="navItems">
          {authToken ? (
            <Button  variant="outlined" sx={{color:'white'}}  onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <div>
              <Button  variant="outlined" sx={{color:'white', marginRight:2}}  onClick={handleRegisterOpen}>
                Register
              </Button>
              <Button  variant="outlined" sx={{color:'white'}}  onClick={handleLoginOpen}>
                Login
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Login Popup */}
      <Dialog open={loginOpen} onClose={handleLoginClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleLoginClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Register Popup */}
      <Dialog open={registerOpen} onClose={handleRegisterClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            type="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegister}>Register</Button>
          <Button onClick={handleRegisterClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
