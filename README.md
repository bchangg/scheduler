# Interview Scheduler

This is a project completed at Lighthouse Labs.

The project is designed for first time React users to learn how to use React, therefore many of the CSS styles and classes were given to us. Our task was then just to implement the actual functionality of the app.

It is a single page application built with React hooks, and allows the user to book an interview with a specific interviewer on any weekday.

The app persists data in a PSQL database that is local to the development environment. The data is requested through a server that is also local to the development environment on our computers. However, this means the app is theoretically able to grab data from anywhere, transform it to be used properly inside the app, and show any schedules from anywhere. Persisting said data might be much more difficult if it is not the testing environment that was set up.

The application does not use any class components, but is rather built using `React Hooks` to manage state and re-rendering.

## Getting Started

Install dependencies with `npm install`.

Start WebPack Development Server with `npm start`

Run Jest Test Framework with `npm test`

Run Storybook Visual Testbed with `npm run storybook`

Run Cypress Test Environment with `npm run cypress`

## Screenshots

![App Main](/docs/0.png)

![Booking An Interview](/docs/1.png)

![Interview Booked](/docs/2.png)

![Deleting An Interview](/docs/3.png)

![Interview Deleted](/docs/4.png)
