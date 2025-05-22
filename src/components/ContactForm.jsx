import React, { useState } from 'react';

const ContactForm = () => {
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
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });

    if (name === 'name' && value.length < 5) {
      setNameError('Name must be at least 5 characters long.');
    } else if (name === 'name') {
      setNameError('');
    }

    if (name === 'phone') {
      if (value === '1234567890') {
        setPhoneError('Phone number is invalid');
      } else if (value.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    }

    if (name === 'password') {
      const lowerPassword = value.toLowerCase();
      const lowerName = inputValues.name.toLowerCase();

      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      } else if (lowerPassword === 'password') {
        setPasswordError("Password cannot be 'password'.");
      } else if (lowerPassword.includes(lowerName) && inputValues.name !== '') {
        setPasswordError("Password should not contain your name.");
      } else {
        setPasswordError('');
      }

      if (inputValues.confirmPassword && value !== inputValues.confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }

    if (name === 'confirmPassword') {
      if (value !== inputValues.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameError) return setError('Please fix name error.');
    if (phoneError) return setError('Please fix phone number error.');
    if (passwordError) return setError('Please fix password error.');
    if (confirmPasswordError) return setError('Please fix confirm password error.');

    console.log("Form submitted", inputValues);
    alert(`Name: ${inputValues.name}\nEmail: ${inputValues.email}\nPhone: ${inputValues.phone}`);
  };

  return (
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
        />
        {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
      </label>

      <label>
        Email: <br />
        <input
          type="email"
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={inputValues.phone}
          onChange={handleChange}
          required
          pattern="^[789]\d{9}$"
        />
        {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleChange}
          required
        />
      </label>
      {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={inputValues.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>
      {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
