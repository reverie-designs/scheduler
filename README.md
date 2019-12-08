# Interview Scheduler  📅 📝
The Scheduler App allows you to book, edit and delete appointments in any of the available open slots for the week.
Shut down server? no problem the database will be updated and remember your changes.

## MAKE APPOINTMENT
!["Screenshot of: Making an Appointment"](https://github.com/reverie-designs/scheduler/blob/master/public/docs/scheduler-make-appointment.gif)

## EDIT APPOINTMENT
!["Screenshot of: Editing an Appointment in Resposive Mode"](https://github.com/reverie-designs/scheduler/blob/master/public/docs/scheduler-edit-appointment.gif)

## DELETE APPOINTMENT

!["Screenshot of: Deleting an Appointment"](https://github.com/reverie-designs/scheduler/blob/master/public/docs/scheduler-delete-appointment.gif)


## Technical Specs 💻
The Scheduler Client App was created using [create react app](https://create-react-app.dev/).

[Scheduler-Api](https://github.com/lighthouse-labs/scheduler-api) App server uses Express. 
- React
- Webpack Dev Server
- Babel
- Axios
- Storybook
- Jest

## Set Up ℹ️

Install dependencies with `npm install`.

##  Running Webpack Development Server 🌐

```sh
npm start
```

## Running Jest Test Framework 💯

```sh
npm test
```
- see note about **Cypress** tests in Scheduler-Api section below

## Running Storybook Visual Testbed 📖

```sh
npm run storybook
```
## Scheduler-API - Databse Server  📚
Please refer to the [Scheduler-Api](https://github.com/lighthouse-labs/scheduler-api) repository for the database setup instructions

__Note__: While **Cypress** tests are also available you will need to set up your own test db in this repository to run them


## Dependencies  ❗⛓️
  - React: ^16.9.0
  - React-Dom: ^16.9.0
  - React-Scripts: 3.0.
  - Axios: ^0.19.0
  - Classnames: ^2.2.6
  - Normalize.css: ^8.0.1
  
## Dev Dependencies ❗⛓️
  - Babel: ^7.4.3
  - Storybook: ^5.0.10
  - Babel-Loader: ^8.0.5
  - Node-Sass: ^4.11.0
  - Storybook/addon-actions: ^5.0.10
  - Storybook/addon-backgrounds: ^5.0.10
  - Storybook/addon-links: ^5.0.10
  - Storybook/addons: ^5.0.10
  - Storybook/react: ^5.0.10
  - Testing-library/jest-dom: ^4.0.0
  - Testing-library/react: ^8.0.7
  - Testing-library/react-hooks: ^3.2.1
  - Prop-types: ^15.7.2
  - React-test-renderer: ^16.9.0
## Functionality 👀

### __React State Management Functionality:__

__Inside SRC__:

- **Hooks**: 
    - __useApplicationData__: manages all tracked states of the app including axios requests
    - __useVisualMode__: manages the visual rendering and visual state of booking an appointment
- **Reducer**: 
    - __application.js__: state management of react components

### __Selector Functionality__
__Inside SRC__:

- Helpers: 
 
  - __selectors__: manages the rendering of specific data according to user selection

## Troubleshooting 💣
Make sure that you have both the scheduler and the [Scheduler-Api](https://github.com/lighthouse-labs/scheduler-api)

__Both servers run concurrently:__ 
          requests are proxied from the Webpack development server to the API server.

You must have have __postgreSQL__ or a VM that has __postgreSQL__ to run the db server


