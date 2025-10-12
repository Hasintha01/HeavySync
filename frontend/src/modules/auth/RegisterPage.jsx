
// RegisterPage.jsx
// User registration page for HeavySync
// Renders the RegisterForm centered on the page
import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
