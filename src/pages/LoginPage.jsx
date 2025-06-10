import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // Email validation: format + min length 5
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length < 5 || !emailRegex.test(email)) {
    alert('Email must be a valid email address and at least 5 characters long.');
    return;
  }

  // Password validation:
  // - Length: 7–20 characters
  // - Includes uppercase, lowercase, number, special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-])[A-Za-z\d!@#$%^&*\-]{7,20}$/;
  if (!passwordRegex.test(password)) {
    alert(
      'Password must be 7–20 characters long and include an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-'
    );
    return;
  }

  // Simulate sign-in if valid
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${email}, ${password}`
      );
      resolve();
    }, 300);
  });

  return promise;
};

function LoginPage() {
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true }
        }}
      />
    </AppProvider>
  );
}

export default LoginPage;
