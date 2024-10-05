import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from './utils/firebase';

const Signup = () => {
  const [formFields, setFormFields] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = formFields;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Reset form fields after submission
  const resetFormFields = () => {
    setFormFields({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Create user with email and password
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // Save user details in Firestore
      await createUserDocFromAuth(user, { displayName });

      // Reset form and redirect to login page
      resetFormFields();
      navigate('/login'); // Optional: Redirect to login or homepage after signup
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      } else {
        setError('Error in creating account. Please try again.');
      }
      console.error('Signup error:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <label>Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <div className="redirect-login">
        <p>Already have an account?</p>
        <Link to="/login">Sign in here</Link>
      </div>
    </div>
  );
};

export default Signup;
