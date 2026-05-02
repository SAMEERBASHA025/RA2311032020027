// Stage 1: Campus Notifications Priority Inbox Logic

import axios from 'axios';

// Weightage for Notification Types
const WEIGHTS: Record<string, number> = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

interface Notification {
    ID: string;
    Type: string;
    Message: string;
    Timestamp: string;
}

/**
 * Priority Logic:
 * 1. Primary Sort: Weight (Placement > Result > Event)
 * 2. Secondary Sort: Recency (Newest First)
 */
export function getPriorityNotifications(notifications: Notification[], n: number = 10): Notification[] {
    return notifications
        .sort((a, b) => {
            const weightA = WEIGHTS[a.Type] || 0;
            const weightB = WEIGHTS[b.Type] || 0;

            if (weightA !== weightB) {
                return weightB - weightA; // Higher weight first
            }

            // Recency sort
            return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
        })
        .slice(0, n);
}

async function fetchNotifications() {
    try {
        // API Endpoint from Evaluation Doc
        console.log('Fetching notifications from API...');
        const response = await axios.get('http://20.207.122.201/evaluation-service/notifications', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnNlZXhwiJoxNzQzNTc0MzQ0LCJpYyOiE3NDM1NzQwNDQsImI0NzkyZysInN1YiI6InJhbWtyaXNobmEAYWJjLmVkdSJLCJlWbWfpbCI6InJhbWtyaXNobmEAYWJjLmVkdSInMS5hbWUiOiJyYW1rcmlzaG5hIiwjInVjbXByOByI6ImFhMmliiwYWNjZXNzQ29kZSI6InhnQXNNCiIsImNsaWVudElkIjoiZDljYmI2OTktNmEyNy00NGE1LThkNTktOGIxYmVmYTgxNmRhInVpYmRnMmRIY2pZWzU0U2VjcmV0IjoiZkYwU0JKTZVhjUlh1TSJ9.YApD98g0IN_Oww7JMFmuUfK1m4hLTm7AiCLDcLAzVg'
            }
        });
        const notifications: Notification[] = response.data.notifications;

        console.log(`\n--- Found ${notifications.length} notifications ---`);
        
        const priorityInbox = getPriorityNotifications(notifications, 10);

        console.log('\n--- Priority Inbox (Top 10) ---');
        priorityInbox.forEach((n, i) => {
            console.log(`${i + 1}. [${n.Type}] - ${n.Message} (${n.Timestamp})`);
        });

        return priorityInbox;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.error('Error: Authorization header is required by the API.');
        } else {
            console.error('Error fetching notifications:', error.message);
        }
        return [];
    }
}

// Execute
fetchNotifications();
