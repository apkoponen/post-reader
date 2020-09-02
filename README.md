# Post Reader

This Next.js app includes the frontend for a Post Reader -project.

## Technologies

Links to most important technologies:

- [npm](https://docs.npmjs.com/)
- [prettier](https://prettier.io/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## <a name="installation"></a> Installation

1. Install node.js (anything above 8.11 should work).
2. Clone this repo
3. `npm install` in repository root.
4. `npm run build` to build the Next.js app.

## Development

1. [Install the app](#installation)
2. Run `npm run dev` to start a development server with hot reloading.

## Building and running for E2E tests

1. [Install the app](#installation)
2. Run `npm run build:e2e` to build the app with mock APIs.
3. Run `npm run start:e2e` to serve the app with mock APIs.
4. Run `npm run e2e` to run e2e tests against the app.

### Debugging and running E2E tests during development

To be able to pause tests and to run only specific suites you need to use Cypress
console. After building and starting the app run: `npm run e2e:open`
to open the console and select the suite you wish to run.

To run the e2e-tests while watching the application code use commands:

```
npm run dev:e2e
npm run e2e:open
```

Now each time you make a change to the application code, the app is rebuilt 
and changesare hot reloaded to the e2e-tests like in normal development mode. 
Then you can rerun the suites you are working on in the Cypress console. 
Please note that if you make changes during a test execution the hot reload
might mess up your active test execution.

