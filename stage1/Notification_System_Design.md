# Stage 1: Notification System Design

## Overview
The goal of this microservice stage is to implement a **Priority Inbox** for campus notifications. Given the high volume of notifications (Placements, Events, Results), students need a way to see the most critical updates first without losing track of others.

## Priority Logic
The prioritization is based on two primary factors:
1.  **Weightage (Categorical Importance)**:
    *   **Placement**: Highest priority (Weight: 3). These are career-defining updates and require immediate attention.
    *   **Result**: Medium priority (Weight: 2). Important academic milestones.
    *   **Event**: Lower priority (Weight: 1). General campus activities and social updates.
2.  **Recency (Temporal Relevance)**:
    *   Within the same category, newer notifications are ranked higher to ensure students see the latest updates first.

### Algorithm
The algorithm performs a stable sort using the following comparator:
```typescript
(a, b) => {
    if (weight(a.Type) !== weight(b.Type)) {
        return weight(b.Type) - weight(a.Type);
    }
    return timestamp(b) - timestamp(a);
}
```

## Maintenance of Top 10
To maintain the Top 10 efficiently as new notifications arrive:
*   **Current Approach**: For a stateless microservice fetching from an external API, a standard sort of the current batch is sufficient.
*   **Scalable Approach (Streaming)**: In a real-time system, we would use a **Min-Priority Queue (Heap)** of size `k` (where `k=10`). 
    *   When a new notification arrives, we compare it with the root (minimum priority) of the heap.
    *   If the new notification has a higher priority, we replace the root and heapify.
    *   Complexity: $O(N \log k)$ for $N$ notifications, which is highly efficient for real-time streams.

## Implementation Details
*   **Language**: TypeScript (Node.js)
*   **Data Structure**: Array-based sorting for the initial evaluation.
*   **Scalability**: The system is designed to be stateless, making it easy to scale horizontally.
