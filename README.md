# popRate

Simple application that returns the average rating (IMDB + Metacritic + Rotten Tomatoes) for most Movies/Games/Series

## Requirements

* Node - https://nodejs.org/en/
* Ionic - http://ionicframework.com/getting-started/

* Gulp
```
npm install gulp
```

## How to run application

In the terminal inside the popRate dir:

**iOS:**

Run the following to test in emulator:

```
ionic platform add ios
ionic build ios
ionic emulate ios
```

**Android:**

Run the following to test in emulator:

```
ionic platform add android 
ionic build android
ionic emulate android
```

## Test in browser

Run `ionic serve` from inside the popRate directory.

## To Dos:

* Add connection timeout when API is not accessible 
~~App icon and splashcreen~~
* Set weight in average equation for each rating site
* Style to dark theme and more animations
* Move search input box to header (i.e. Twitter mobile app)
