# Campus Notification System

A comprehensive system designed to help students manage and prioritize campus notifications efficiently. This project is divided into two stages: a backend logic design and a full-stack Next.js application.

## Project Structure

- **[Stage 1](./stage1/)**: Focuses on the core logic and design of the notification system.
  - Implements the **Priority Inbox** algorithm.
  - Defines weightage: Placement (3) > Result (2) > Event (1).
  - Handles recency-based sorting within categories.
- **[Stage 2](./stage2/)**: A full-stack web application built with Next.js 15.
  - Interactive UI built with Material UI.
  - Integration with external evaluation APIs.
  - Advanced logging and error handling.
  - Real-time priority management.

## Key Features

- **Smart Prioritization**: Career-defining placement updates always appear first.
- **Recency Awareness**: Stay up-to-date with the latest notifications within each category.
- **Professional UI**: Clean, responsive, and user-friendly interface using modern web technologies.
- **System Monitoring**: Integrated health checks and logging for robust operations.

## Quick Start

### Stage 1: Logic Evaluation
```bash
cd stage1
npm install
# View logic implementation in priority_inbox.ts
```

### Stage 2: Web Application
```bash
cd stage2
npm install
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

*This project was developed as part of the Afford Medical evaluation.*
