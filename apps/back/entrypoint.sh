#!/bin/sh


[ ! -d "node_modules" ] && npm install
npm run build
npm run start:prod
