import axios from 'axios';
import { withLogging } from './logger';

const API_BASE = '/api/evaluation-service/notifications';
const VIEWED_KEY = 'viewed_notifications';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnNlZXhwiJoxNzQzNTc0MzQ0LCJpYyOiE3NDM1NzQwNDQsImI0NzkyZysInN1YiI6InJhbWtyaXNobmEAYWJjLmVkdSJLCJlWbWfpbCI6InJhbWtyaXNobmEAYWJjLmVkdSInMS5hbWUiOiJyYW1rcmlzaG5hIiwjInVjbXByOByI6ImFhMmliiwYWNjZXNzQ29kZSI6InhnQXNNCiIsImNsaWVudElkIjoiZDljYmI2OTktNmEyNy00NGE1LThkNTktOGIxYmVmYTgxNmRhInVpYmRnMmRIY2pZWzU0U2VjcmV0IjoiZkYwU0JKTZVhjUlh1TSJ9.YApD98g0IN_Oww7JMFmuUfK1m4hLTm7AiCLDcLAzVg';

const WEIGHTS: Record<string, number> = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

export interface Notification {
    ID: string;
    Type: string;
    Message: string;
    Timestamp: string;
}

export const getViewedIds = (): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    const stored = localStorage.getItem(VIEWED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
};

export const markAsViewed = (id: string) => {
    const viewed = getViewedIds();
    viewed.add(id);
    localStorage.setItem(VIEWED_KEY, JSON.stringify(Array.from(viewed)));
};

/**
 * Fetches notifications with optional filters.
 */
export const fetchNotifications = withLogging(async (params: {
    limit?: number;
    page?: number;
    notification_type?: string
} = {}) => {
    const response = await axios.get(API_BASE, { 
        params,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    });
    return response.data.notifications as Notification[];
}, 'fetchNotifications', 'api');

/**
 * Prioritizes notifications: Placement > Result > Event, then Recency.
 */
export const getPriorityNotifications = (notifications: Notification[], n: number = 10): Notification[] => {
    return [...notifications]
        .sort((a, b) => {
            const weightA = WEIGHTS[a.Type] || 0;
            const weightB = WEIGHTS[b.Type] || 0;
            if (weightA !== weightB) return weightB - weightA;
            return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
        })
        .slice(0, n);
};
