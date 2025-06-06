import { Box } from '@mui/material';
import React from 'react';

function Main({ children }) {
  return (
    <Box
      sx={{
        backgroundColor: '#e3f2fd',
        minHeight: '100vh',         // ensures full height
        paddingBottom: '80px',      // leaves space for fixed footer
      }}
    >
      {children}
    </Box>
  );
}

export default Main;
