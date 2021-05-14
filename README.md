# Simple Todo List

__Demo__ [https://todo-list-z6y1.pages.dev/](https://todo-list-z6y1.pages.dev/)

This app is a fairly simple To-Do list app intended to demonstrate some of my React knowledge.

The intention of the app is not to be a full, production ready app, and many decisions have been made to keep the lifecycle short.

For example;

- I've chosen to forgo building in linting in the build process
- I've forgone Typescript
- Using a UI component library for most UI components
- Testing is abbreviated (but you'll get the idea)
- The entirety of the app's logic is in one component, and we make use of a little prop drilling. This one's often contentious, but I believe one to two levels is perfectly fine.
- I've tried to avoid 'premature' optimisation, but also give a couple of examples where optimisation could be needed.

I've thrown a couple of extras in here and there for fun;

- You can filter (hide) completed tasks (and the counts will reflect this)
- Todos state is saved to local storage with a custom hook

## Development

To start up the dev server, clone the repo

```bash
git clone ...
cd ...
```

Then install dependencies

```bash
yarn install
# OR
npm install
```

And start the dev server:

```bash
yarn start
```

The dev server should be available on `http://localhost:8080`

## Testing

After cloning the project and installing dependencies (see **Development**), run tests by;

```bash
yarn test
# OR
npm run test
```

Tests are run using Jest & react-testing-library.
