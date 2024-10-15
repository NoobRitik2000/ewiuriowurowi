// components/AdminSidebar.tsx
import React from 'react';
import { Drawer, AppBar, Toolbar, Typography, Button, List } from '@mui/material';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const AdminSidebar = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <AppBar position="static" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6">Admin Panel</Typography>
                </Toolbar>
            </AppBar>
            <List>
               
                <Button fullWidth onClick={() => handleNavigation('/ManageLibrarian')}>
                    Manage Librarians
                </Button>
                <Button fullWidth onClick={() => handleNavigation('/admin/manage-patrons')}>
                    Manage Patrons
                </Button>
                <Button fullWidth onClick={() => handleNavigation('/admin/manage-information')}>
                    Manage Information
                </Button>
            </List>
        </Drawer>
    );
};

export default AdminSidebar;
