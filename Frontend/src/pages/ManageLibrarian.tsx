// pages/admin/add-librarian.tsx
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Snackbar,
    Alert,
    Box
} from '@mui/material';

const AddLibrarian = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('librarian'); // Default role
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add new librarian
        try {
            const response = await fetch('/api/librarians', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (response.ok) {
                alert('Librarian added successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setRole('librarian'); // Reset role to default
                setError('');
            } else {
                const { message } = await response.json();
                setError(message);
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error adding librarian:', error);
            setError('Failed to add librarian.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5" // Optional: Background color
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                bgcolor="white"
                p={3}
                borderRadius={2}
                boxShadow={3}
                width={400}
            >
                <Typography variant="h4" gutterBottom>
                    Add New Librarian
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            value={role} // Ensure it reflects the state
                            onChange={(e) => setRole(e.target.value)}
                            disabled // Keep the select disabled
                        >
                            <MenuItem value="librarian">Librarian</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Add Librarian
                    </Button>
                </Stack>

                {/* Snackbar for error messages */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default AddLibrarian;
