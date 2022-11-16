#!/usr/bin/env node

import momentTimezone from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';
import fs from 'fs';


if (args.h) {
	
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
    `)	
    process.exit(0)
    }

const args = minimist(process.argv.slice(2));

const timezone = moment.tz.guess()

const latitude = args.n || args.s * -1;

const longitude = args.e || args.w * -1;

