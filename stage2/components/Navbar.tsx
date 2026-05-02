'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function Navbar() {
    const [mounted, setMounted] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'white', color: 'text.primary' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <NotificationsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AFFORDMED
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                        <Button
                            component={Link}
                            href="/"
                            color={pathname === '/' ? 'primary' : 'inherit'}
                            sx={{ fontWeight: pathname === '/' ? 700 : 400 }}
                        >
                            All Notifications
                        </Button>
                        <Button
                            component={Link}
                            href="/priority"
                            color={pathname === '/priority' ? 'primary' : 'inherit'}
                            startIcon={<PriorityHighIcon />}
                            sx={{ fontWeight: pathname === '/priority' ? 700 : 400 }}
                        >
                            Priority Inbox
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
