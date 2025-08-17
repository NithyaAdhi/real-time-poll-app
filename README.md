# Real-Time Collaborative Poll App



A dynamic, real-time polling application built with modern web technologies. Users can create a poll, share a unique link, and watch as votes are cast and results are updated live for everyone to see.

**Live Demo:** [[https://real-time-poll-app-two.vercel.app/](https://real-time-poll-app-two.vercel.app/) ](https://real-time-poll-app-sg5f.vercel.app/)
---

## Features

*   **Poll Creation:** A clean, user-friendly form to create a new poll with a question and multiple customizable options.
*   **Real-Time Voting:** Utilizes WebSockets via Firebase to provide a live voting experience.
*   **Live Data Visualization:** Poll results are displayed in a dynamic bar chart that updates instantly as new votes are cast.
*   **Shareable Links:** Each poll generates a unique, shareable URL for easy distribution.
*   **Responsive Design:** A clean, mobile-first interface that works beautifully on any device.

---

## Tech Stack & Architecture

This project was built as a full-stack application, demonstrating a range of modern web development skills.

### Frontend

*   **Framework:** Angular (v18)
*   **State Management:** Angular Signals for efficient, fine-grained reactivity.
*   **Forms:** Angular Reactive Forms for robust and scalable form handling.
*   **Routing:** Angular Router for seamless single-page application (SPA) navigation.
*   **UI Components:** [Angular Material](https://material.angular.io/) for a professional and consistent design system.
*   **Data Visualization:** [ngx-charts](https://swimlane.github.io/ngx-charts/) for dynamic and animated charts.
*   **Language:** TypeScript

### Backend & Database

*   **Backend as a Service :** Firebase
*   **Database:** Firestore for its real-time, NoSQL database capabilities.

### Deployment & DevOps

*   **Hosting:** Vercel
*   **CI/CD:** Fully automated push-to-deploy pipeline using Vercel's integration with GitHub. Every push to the `main` branch triggers a new build and deployment.
