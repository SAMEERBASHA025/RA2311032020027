'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { Notification, markAsViewed } from '@/lib/notifications';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    notification: Notification;
    isViewed: boolean;
    onViewed: (id: string) => void;
}

const TYPE_CONFIG = {
    Placement: { color: 'error' as const, icon: <WorkIcon fontSize="small" /> },
    Result: { color: 'secondary' as const, icon: <SchoolIcon fontSize="small" /> },
    Event: { color: 'info' as const, icon: <EventIcon fontSize="small" /> },
};

export default function NotificationCard({ notification, isViewed, onViewed }: Props) {
    const config = TYPE_CONFIG[notification.Type] || TYPE_CONFIG.Event;

    const handleView = () => {
        if (!isViewed) {
            markAsViewed(notification.ID);
            onViewed(notification.ID);
        }
    };

    return (
        <Badge
            color="primary"
            variant="dot"
            invisible={isViewed}
            sx={{ width: '100%' }}
        >
            <Card 
                sx={{ 
                    width: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    },
                    bgcolor: isViewed ? 'background.paper' : 'rgba(46, 125, 50, 0.03)',
                    borderLeft: isViewed ? 'none' : '4px solid',
                    borderColor: 'primary.main'
                }}
                onClick={handleView}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Chip 
                            icon={config.icon} 
                            label={notification.Type} 
                            color={config.color} 
                            size="small" 
                            variant="outlined" 
                        />
                        <Typography variant="caption" color="text.secondary">
                            {new Date(notification.Timestamp).toLocaleString()}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: isViewed ? 400 : 600 }}>
                        {notification.Message}
                    </Typography>
                </CardContent>
            </Card>
        </Badge>
    );
}
