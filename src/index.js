#!/usr/bin/env node
import "babel-polyfill";
import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let regeneratorRuntime =  require("regenerator-runtime");
//var compression = require('compression')
//var busboy = require('connect-busboy'); //middleware for form/file


let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/', api({ config, db }));

	//app.use(compression({filter: shouldCompress}))
	//app.use(busboy());

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;

