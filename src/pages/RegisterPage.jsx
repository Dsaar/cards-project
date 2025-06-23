import React from 'react'
import RegisterForm from '../users/components/RegisterForm'
import { Box } from '@mui/material'

function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd', // light blue
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <RegisterForm />
    </Box>
  )
}

export default RegisterPage