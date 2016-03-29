# Burst event detection frontend project
=============

## Introduction

This frontend project is written for the Burst event detection system which is a complex NLP system.

This project was implemented by Vue and Webpack. There are few other tools have been used in this project like Webpack-dev-server, eslint and so on. 

## usage 
#### install
Run the code below to satisfy the dependence
```bash
npm install
```
#### configuration
The configuration file is in the source code directory ```/src/services/globalConfig.js```. In this file we can set some global parameter of this project.

```javascript
jsonServerUrl //this parameter is the data server of this project 
```
#### development mode
Run the code below in the root directory of this project can use this project in developer mode
```bash
npm run dev
```
In the dev mode the buildfile will be served via websocket.
The browser will be refreshed every time you edit the source code in dev mode, and the commend line will output the result of the eslint.
#### production mode
Run the code below to get the buildfile
```bash
npm run build
```