# Task Management App

## Overview

This Task Management App is a robust, user-friendly application designed to help you efficiently manage your tasks. Built with modern technologies, it provides a seamless and interactive experience for task management. The app leverages React for the frontend, Tailwind CSS for styling, Redux Toolkit for state management, and PrimeReact for UI components, ensuring a high-performance and visually appealing user interface.

## Features

- **Task Creation and Editing:** Easily create new tasks or edit existing ones with an intuitive form.
- **Task Filtering:** Filter tasks based on their status (completed, date) to focus on what matters most.
- **Task Completion:** Mark tasks as completed to keep track of your progress.
- **Task Deletion:** Remove tasks that are no longer needed.
- **Interactive UI:** Leveraging PrimeReact components for a polished and interactive user interface.
- **Global State Management:** Using Redux Toolkit to handle the state of tasks across the application efficiently.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **Redux & Redux Toolkit:** A predictable state container for JavaScript apps, with tools to streamline the development process.
- **PrimeReact:** A rich set of open-source UI components for React.
- **TypeScript:** Superset of JavaScript that adds static types for improved code quality and maintainability.

## Installation

1.  **Clone the repository:**

### git clone https://github.com/IlhomBek-F/task-management-app.git

2.  **Install dependencies:**

### npm install

3.  **Start the application:**

### npm start

The app should now be running on http://localhost:3000

## Folder Structure

```
├── public/
├── src/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── TaskTable.tsx
│ │ └── shared/
│ │ ├── ButtonElem.tsx
│ │ ├── DatePickerElem.tsx
│ │ ├── DialogElem.tsx
│ │ ├── Form.tsx
│ │ └── Select.tsx
│ ├── core/
│ │ ├── enums/
│ │ │ └── async-thunk-type.ts
│ │ ├── models/
│ │ │ └── form-props-model.ts
│ │ │ └── state-model.ts
│ │ │ └── task-model.ts
│ ├── redux/
│ │ ├── slices/
│ │ │ └── tasksSlice.ts
│ │ └── store.ts
│ ├── App.tsx
│ ├── index.tsx
│ └── styles/
│ └── index.css
│ │ ├── data-table.css
│ │ ├── form.css
│ │ ├── header.css
│ │ ├── index.css
├── README.md
├── package.json
└── tsconfig.json
```
