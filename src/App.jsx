import { useState } from 'react';
import './App.css';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'; // Import axios

function App() {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputValues({ ...inputValues, [name]: value });

    // Name validation: if length is less than 5 characters
    if (name === 'name' && value.length < 5) {
      setNameError('Name must be at least 5 characters long.');
    } else {
      setNameError('');
    }

    // Phone number validation
    if (name === 'phone') {
      if (value === '1234567890') {
        setPhoneError('Phone number is invalid');
      } else if (value.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    }

    // Password confirmation validation
    if (name === 'confirmPassword') {
      if (value !== inputValues.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match on form submission
    if (inputValues.password !== inputValues.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if name has error
    if (nameError) {
      setError('Please fix name error.');
      return;
    }

    // Check if phone number has error
    if (phoneError) {
      setError('Please fix phone number error.');
      return;
    }

    // Handle form submission (like sending data to the backend)
    console.log("Form submitted", inputValues);
    alert("Name: " + inputValues.name + " Email: " + inputValues.email + " Phone: " + inputValues.phone);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Contact Form</h2>
        <label>
          Name: <br />
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
            required
            className="name"
          />
          {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        </label>
        <br />
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            required
            className="email"
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="^[789]\d{9}$"
            value={inputValues.phone}
            onChange={handleChange}
            required
            className="phone"
          />
          {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
            required
            className="password"
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={inputValues.confirmPassword}
            onChange={handleChange}
            required
            className="confirmPassword"
          />
        </label>
        <br />
        {/* Display error if passwords don't match */}
        {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;

