const serverless = require('serverless-http'),
    express = require('express');

const bibleQuoteApp = express(),
    helloWorld = require('./src/handlers/helloWorld')

bibleQuoteApp.get('/', helloWorld)

module.exports.handler = serverless(bibleQuoteApp)