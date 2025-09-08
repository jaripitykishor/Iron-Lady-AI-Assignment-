# Iron Lady AI Tech Intern Assignment

This repository contains my solutions for the Iron Lady AI & Technology internship assignment.

## Assignment Overview

### Task 1: Iron Lady FAQ Chatbot
- Objective: Interactive chatbot that answers FAQs about Iron Lady’s leadership programs.
- Location: `./task1-chatbot/`
- Tech Stack: HTML5, CSS3, Vanilla JavaScript.
- Key Features:
  - Pattern-matching FAQ responses (programs, duration, format, certificates, mentors, contact).
  - Typing indicators and contextual follow-up questions.
  - Mobile-first responsive design.

### Task 2: Course Management System
- Objective: Full CRUD application for managing Iron Lady’s courses.
- Location: `./task2-simple-app/`
- Tech Stack: HTML5, CSS3, Vanilla JavaScript, Browser Local Storage.
- Key Features:
  - Create, Read, Update, Delete courses.
  - Dashboard displaying total courses, hours, ratings, students.
  - Real-time search, filtering, and sorting.
  - AI-simulated suggestions for course names, descriptions.
  - Responsive layout and toast notifications for user feedback.

## How to Run

### Direct File Opening
1. Navigate to either project folder:
   - `cd task1-chatbot`
   - `cd task2-simple-app`
2. Open `index.html` in your browser.

### Local Server (Recommended)
npx http-server -p 8000

Open http://localhost:8000 in your browser.

## Project Structure
├── task1-chatbot/ # FAQ Chatbot
│ ├── index.html
│ ├── styles.css
│ └── script.js
├── task2-simple-app/ # Course Management System
│ ├── index.html
│ ├── styles.css
│ └── script.js
├── DEMO_INSTRUCTIONS.md # Video demo guide
└── README.md # This documentation


## Technical Highlights

### Chatbot (Task 1)
- Object-oriented JavaScript class handling chat logic.
- Keyword-based intent detection and contextual follow-ups.
- CSS animations for typing indicator and chat bubble entrance.
- Fully responsive design with mobile optimizations.

### Course Management (Task 2)
- MVC-inspired JavaScript class managing state and UI updates.
- Local Storage API for persistence across sessions.
- Interactive star-rating component and dynamic modals.
- Real-time search, filtering, and multi-criteria sorting.
- AI-simulated content generation via button-triggered templates.

## Demo Instructions
See **DEMO_INSTRUCTIONS.md** for detailed video walkthrough steps covering:
- Opening each app.
- Demonstrating core features and advanced AI simulations.
- Responsive design checks and backup plans.

---

*Created by Kishor J for the Iron Lady AI & Technology Intern application.*  

