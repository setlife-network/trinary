# project-trinary

## Development

### Overview

#### Frontend

The `/src` folder contains core source code needed for frontend development.

#### Backend

The `server.js` file is responsible for initial set up of the backend and the `/api` folder contains core source code needed for API/backend development.

### Setup

1. Clone the repo

```
git clone https://github.com/setlife-network/trinary
```

2. Install packages

```
cd trinary
npm install
```

3. Copy the sample environment configuration file

```
cp .env.example .env
```

4. Obtain a `.env` file from a project maintainer or fill out your own values

5. Run the UI server

```
npm run ui
```

6. Open a new Terminal tab and run the web server

```
npm run server
// or for hot-reloaded backend code
npm run dev-server
```

7. UI should open in the browser at `localhost:6002`

8. An API Explorer is accessible in the browser at `localhost:6001/api/graph`

If using VSCode, be sure to disable the Prettier: Format on Save feature to prevent unwanted changes to the code styles.

## Using a local database 

If you want to set up a local database, follow these steps or follow [this tutorial](https://dev.mysql.com/doc/refman/8.0/en/tutorial.html):

1. Download and install [MySQL server](https://dev.mysql.com/doc/refman/8.0/en/installing.html) (Usually it comes with others features like Workbench).

2. To connect to the server open the command prompt or shell and type the next command:
```aidl
shell> mysql -h host -u user -p
Enter password: ********
```
To disconnect you can use this commands:
```aidl
mysql> QUIT
Bye
```
3. To create a database use this command:
```
mysql> CREATE DATABASE setLife;
```

4. To select the created database use this command:
```aidl
shell> mysql -h host -u user -p setLife
```

5. If you want to show all the created databases use this command:
```aidl
mysql> SHOW DATABASES;
```

6. To use the created database in the Trinary project, you need to setup your enviroment variables file also known as `.env` file, an example file is available in the code called `.env.example`, copy the code inside this file into a new one named `.env` on the main path of the project.

7. After the `.env` file is created, fill in the variables that start with `MYSQL_DB` with your own values after the equal sign.
```
e.g.
MYSQL_DB_HOST=127.0.0.1
```
   
8. With all database variables filled you can run the `npm run server` or `npm run dev-server` command and the necessary tables will be created.

## Troubleshooting

If you are encountering an error that says: "react scripts start is not recognized as an internal or external command," or any related error with dependencies, upon running "npm start" or "npm ui" within terminal, run the following command:

```
npm update
```

Wait for the update, and it should be back to normal.

## Reference

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about Sequelize and how proceed to create migrations, check out the following resources
* [Sequelize](https://sequelize.org/).
* [How create migrations with Sequelize](https://sequelize.org/master/manual/migrations.html)

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
