#!/usr/bin/env node

import momentTimezone from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';
import fs from 'fs';


const args = minimist(process.argv.slice(2));


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







    let timezone = moment.tz.guess();
    if (args.z) {
        timezone = args.z 
    } else {
    timezone = moment.tz.guess();
    }
    

const latitude = args.n || args.s * -1;

const longitude = args.e || args.w * -1;


var day = 1;

if (args.d != undefined) {
	day = args.d;
}

const url = "https://api.open-meteo.com/v1/forecast?" + "latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&current_weather=true&timezone=" + timezone;
const response = await fetch(url);
const data = await response.json();

if (args.j) {
	console.log(data);
	process.exit(0);
}


if (day == 0) {
    console.log("today's precipitation hour is " + data.daily.precipitation_hours[0] + ".")
      if (data.daily.precipitation_hours[0] != 0) {
          console.log("You might need your galoshes") 
      } else {
          console.log("You will not need your galoshes")
      }	
  } else if (day > 1) {
    console.log("in " + days + " days, the precipitation hour is " + data.daily.precipitation_hours[days - 1] + ".")
      if (data.daily.precipitation_hours[days-1] != 0) {
          console.log("You might need your galoshes") 
      } else {
          console.log("You will not need your galoshes")
      }
  } else {
    console.log("tomorrow precipitation hour is " + data.daily.precipitation_hours[1] + ".")
      if (data.daily.precipitation_hours[1] != 0) {
          console.log("You might need your galoshes")
      } else {
          console.log("You will not need your galoshes")
      }
  }

