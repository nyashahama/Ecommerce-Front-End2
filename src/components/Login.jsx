import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      login(response.data);
      navigate("/");
    } catch (error) {
      // ... error handling ...
    }
  };

  return <div>Login Component</div>;
};

export default Login;
