import React,{useState} from 'react';
import '../auth.form.scss';
import './register.scss';
import { useNavigate } from 'react-router';
import { useAuth } from '../useAuth';

const Register = () => {
  const {loading, handleRegister}=useAuth();
  const navigate=useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const success = await handleRegister({username, email, password});

      if (success) {
        navigate('/');
      }
  }

  if(loading){
    return <main><h1>Loading.......</h1></main>
  }

  return (
    <main className="login-page">
      <div className="form-container register-container">

        <div className="login-header">
          <h1>Create Account ✨</h1>
          <p>Join us and get started today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              onChange={(e)=>{setUsername(e.target.value)}}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>

          <button className="button primary-button">
            Create Account
          </button>
        </form>

        <p className="signup-text">
          Already have an account?{' '}
          <a href="/login" className="signup-link">
            Login
          </a>
        </p>

      </div>
    </main>
  );
};

export default Register;