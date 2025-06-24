import React from 'react'
import LoginForm from '../users/components/LoginForm'
import { Box } from '@mui/material'

function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd', // light blue
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 0,
        m:-7
      }}
    >
      <LoginForm />
    </Box>
  )
}

export default LoginPage
