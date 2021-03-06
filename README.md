# Interview Scheduler

Interview scheduler is an application that allows users to book and cancel interviews. I use React combined with a concise API and a WebSocket server to build a realtime user experience.  

*This project was built as part my web development journey with Lighthouse Labs.*

<br>

## Approach

* Components were built in isolation from the most basic node using Storybook and then built up in the application tree.

* Appointments state data is retrieved from an API and rendered using the built components.

* Visual state management imnplemented using a custom hook to allow create, edit, and delete functions.

* State and live updates is managed using advance React patterns.

<br>

## Technical Specifications

* React
* Webpack, Babel
* Axios, WebSockets
* Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.
Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

<br>

## Setup

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the Webpack Development Server using the `npm start` command. The app will be served at <http://localhost:8000/>.
4. Go to <http://localhost:8000/> in your browser.

5. Optionally, set up the scheduler-api with mock data using [this repo](https://github.com/lighthouse-labs/scheduler-api).
<br>

## Screen Views

*Booking, editing, and deleting flows with live update of remaining timeslots:*
!["Booking, editing, and deleting flows:"](https://github.com/c5ho/scheduler/blob/master/docs/scheduler_flow.gif?raw=true)

*Error handling in saving and deleting flows:*
!["Error handling in saving and deleting flows:"](https://github.com/c5ho/scheduler/blob/master/docs/scheduler_error.gif?raw=true)
