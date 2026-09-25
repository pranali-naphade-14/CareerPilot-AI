import React, { useState } from 'react';
import "../auth.form.scss"
import { useAuth } from '../useAuth';
import { useNavigate,Link } from 'react-router';

const Login = () => {
  const {loading, handleLogin} = useAuth();
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const success = await handleLogin({email, password});

      if (success) {
        navigate('/');
      }
  }

  if(loading){
    return <main><h1>Loading.......</h1></main>
  }
  return (
    <main className="login-page">
      <div className="form-container">
        <div className="login-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button className="button primary-button">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{' '}
          <a href="/register" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
};

export default Login;