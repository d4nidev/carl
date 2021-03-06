#!/usr/bin/env node
require("es6-promise").polyfill();
require("isomorphic-fetch");

const protocolRegex = /http(s)?:\/\//gm;

const prompt = require("./lib/prompt");
const { processResponse } = require("./lib/response-processor");
const { printResponse } = require("./lib/response-printer");

const [, , ...args] = process.argv;
let url = args[0];

const doFetch = () => {
  if (!protocolRegex.test(url)) {
    url = `https://${url}`;
  }

  fetch(url)
    .then(processResponse)
    .then(printResponse)
    .catch(console.error);
};

if (!url) {
  prompt()
    .then(responses => {
      url = responses.url;
    })
    .then(doFetch);
} else {
  doFetch();
}
