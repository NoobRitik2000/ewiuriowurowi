// pages/admin.tsx
import { useState } from 'react';
import AdminSidebar from '../components/AdminNavbar';
import { Box, Typography, TextField, Button } from '@mui/material';

const AdminLogin = () => {


   

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminSidebar />
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="h4" gutterBottom textAlign={'center'}>
                    Admin Login
                </Typography>
            
            </Box>
        </Box>
    );
};

export default AdminLogin;
