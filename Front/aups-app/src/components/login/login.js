import React from "react";
import{ useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import classes from './login.css'

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email:"",
    password:"",
  });
  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("All fields required.");
      return;
    }

    await context.onLogin(loginForm);
  };

 

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
            className={classes.input}
          />
        </div>
        <div>
          <label className={classes.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
            className={classes.input}
          />
        </div>
        <button type="submit" className={classes.submitButton}>Login</button>
      </form>
      
      
    </div>
  );
};

export default Login;