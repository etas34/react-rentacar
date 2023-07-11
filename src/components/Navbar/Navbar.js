import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./navbar.css";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = () => {
    
    console.log("Login", email, password);

    setEmail("");
    setPassword("");
    
    handleLoginClose();
  };

  const handleRegister = () => {
    
    if (password !== confirmPassword) {
      // Password and confirm password do not match
      alert("Password and confirm password do not match");
      return;
    }
    // Perform register logic using email and password
    console.log("Register", email, password);
    // Reset email, password, and confirm password fields
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    // Close the register popup
    handleRegisterClose();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <h2 className="logo">CAR RENTAL</h2>
        <div className="navItems">
          <Button className="navButton" onClick={handleRegisterOpen}>
            Register
          </Button>
          <Button className="navButton" onClick={handleLoginOpen}>
            Login
          </Button>
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
