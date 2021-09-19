# React Native Template

[![Moove It](https://circleci.com/gh/moove-it/react-native-template.svg?style=svg)](https://app.circleci.com/pipelines/github/moove-it/react-native-template?branch=master)

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure, core dependencies, and boilerplate to jumpstart development.

## Tech Stack Used.
1.)Frontend- React Native.<br />
2.)Backend- Mysql.<br />
3.)Spring Boot Application for the management of APIs and business logic.<br />


## Steps to run the app
1) Clone the repo.
2) Copy the `drugnotifierapp` file from the `backend` folder of the cloned repo.
3) Go to `C:\Program Files\MySQL\MySQL Server 8.0\bin`(Loation can be different but go to mysql server 8 bin folder).
4) Paste the `drugnotifierapp` file downloded from repo(delete the existing file if present).
5) Open the springrest floder in eclipse and run maven build. In the goals, enter `spring-boot:run` then click Run button.
6) Check the console  `Spring rest application will be  started on port(s): 8090 (http) with context path ''`. This the port on which the server is running.
7) Goto command prompt and run ipconfig. There you will find the ipv4 address of the network.
8) Open the `Frontend` folder in vscode and goto `config.js`. Replace the previous ipv4 address with your ipv4 address i.e. do find and replace all to run the app locally.
9) Go to `frontend folder`(cd frontend\) and start the terminal from that folder and  type `npm start`.
10) Connect the emulator or connect your phone to run the app.
