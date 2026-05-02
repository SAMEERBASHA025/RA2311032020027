'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    fetchNotifications, 
    getPriorityNotifications, 
    Notification, 
    getViewedIds 
} from '@/lib/notifications';
import NotificationCard from './NotificationCard';
import { 
    Grid, 
    Typography, 
    Box, 
    CircularProgress, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Alert,
    Pagination,
    Stack
} from '@mui/material';

interface Props {
    mode: 'all' | 'priority';
}

export default function NotificationList({ mode }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
    
    // Filters
    const [type, setType] = useState<string>('');
    const [page, setPage] = useState(1);
    const limit = 10;

    const loadNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            // In 'priority' mode, we fetch more to find the top N across types,
            // or we use the expanded API with priority logic if supported.
            // For this evaluation, we'll fetch based on current filters.
            const data = await fetchNotifications({
                limit: mode === 'priority' ? 50 : limit,
                page,
                notification_type: type || undefined
            });

            if (mode === 'priority') {
                setNotifications(getPriorityNotifications(data, 10));
            } else {
                setNotifications(data);
            }
            
            setViewedIds(getViewedIds());
        } catch (err) {
            setError('Failed to load notifications. Please check the API connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, [mode, type, page]);

    const handleViewed = (id: string) => {
        setViewedIds(prev => new Set(Array.from(prev).concat(id)));
    };

    if (loading && notifications.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    {mode === 'priority' ? 'Priority Inbox' : 'All Notifications'}
                </Typography>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="type-filter-label">Filter by Type</InputLabel>
                    <Select
                        labelId="type-filter-label"
                        value={type}
                        label="Filter by Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Placement">Placements</MenuItem>
                        <MenuItem value="Result">Results</MenuItem>
                        <MenuItem value="Event">Events</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            )}

            <Grid container spacing={2}>
                {notifications.map((n) => (
                    <Grid item xs={12} key={n.ID}>
                        <NotificationCard 
                            notification={n} 
                            isViewed={viewedIds.has(n.ID)} 
                            onViewed={handleViewed}
                        />
                    </Grid>
                ))}
            </Grid>

            {notifications.length === 0 && !loading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography color="text.secondary">No notifications found.</Typography>
                </Box>
            )}

            {mode === 'all' && (
                <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
                    <Pagination 
                        count={10} 
                        page={page} 
                        onChange={(_, v) => setPage(v)} 
                        color="primary" 
                    />
                </Stack>
            )}
        </Box>
    );
}
