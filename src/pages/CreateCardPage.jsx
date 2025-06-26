import { Box } from '@mui/material'
import React from 'react'
import CreateCardForm from '../users/components/CreateCardForm'

function CreateCardPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd', // light blue
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 0,
  
      }}

    >
      <CreateCardForm />

    </Box>
  )
}

export default CreateCardPage