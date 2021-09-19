# React Native Template

[![Moove It](https://circleci.com/gh/moove-it/react-native-template.svg?style=svg)](https://app.circleci.com/pipelines/github/moove-it/react-native-template?branch=master)

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure, core dependencies, and boilerplate to jumpstart development.


## Steps to run the app
1) Clone the repo.
2) Copy the `drugnotifierapp` file from the dowloaded repo.
3) Go to `C:\Program Files\MySQL\MySQL Server 8.0\bin`(Loation can be different but go to mysql server 8 bin folder).
4) Paste the `drugnotifierapp` file downloded from repo(delete the existing file if present).
5) Open the springrest floder in eclipse and run maven build. In the goals, enter `spring-boot:run` then click Run button.
6) You will in the console `Tomcat started on port(s): 8090 (http) with context path ''`. This the port on which server is running.
7) Goto command prompt and run ipconfig. There you will find the ipv4 address of the network.
8) Open the `Frontend` folder in vscode and goto `config.js`. Replace the previous ipv4 address with your ipv4 address i.e. do find and replace all to run the app locally.
9) In the terminal type `npm start` or `expo start`.
10) Connect the emulator or connect your phone to run the app.
