# Campus Notifications - Stage 2

This is the full-stack implementation of the Campus Notification System, built with **Next.js 15**, **TypeScript**, and **Material UI**.

## Features

- **Priority Feed**: Automatically sorts notifications by importance (Placement > Result > Event) and then by time.
- **Interactive UI**: View, mark as read, and manage notifications with a sleek Material UI dashboard.
- **Robust API Integration**: Seamless connection to the evaluation backend with secure bearer token authentication.
- **System Logging**: Middleware-based logging for tracking API calls and system events.
- **Health Monitoring**: Built-in health check endpoints.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Material UI (MUI) & Vanilla CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Logging**: Custom Middleware & Utility

## API Endpoints & Outputs

The following screenshots demonstrate the API functionality and responses from the backend service.

### 1. Health Check
Ensures the backend service is operational.
![Health Check Output](./outputs/health_check.png)

### 2. Fetch Priority Notifications
Retrieves the top N notifications sorted by priority and recency.
![Priority Notifications Output](./outputs/priority_notifications.png)

### 3. Cached Notifications
Demonstrates the caching mechanism for optimized retrieval.
![Cached Notifications Output](./outputs/cached_notifications.png)

### 4. Refresh Feed
Manual trigger to refresh and re-evaluate the priority inbox.
![Refresh Feed Output](./outputs/refresh_notifications.png)

## Installation

```bash
cd stage2
npm install
```

## Environment Setup

Ensure you have the required `TOKEN` configured in `lib/notifications.ts` or as an environment variable.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Implementation Highlights

### Priority Logic
The sorting algorithm uses a weighted system:
- **Placement**: 3
- **Result**: 2
- **Event**: 1

```typescript
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
```

---

*Developed for the Afford Medical Campus Notification System.*
