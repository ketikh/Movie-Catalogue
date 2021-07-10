// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  movieApiBase: 'http://www.omdbapi.com/?apikey=540d1872',
  firebase: {
    apiKey: "AIzaSyB_y-QSuS1O1T-hxh1wC-tNWhPgjpF6WKw",
    authDomain: "movie-catalogue-a4c36.firebaseapp.com",
    projectId: "movie-catalogue-a4c36",
    storageBucket: "movie-catalogue-a4c36.appspot.com",
    messagingSenderId: "435045276169",
    appId: "1:435045276169:web:e5a16542a574f1c0c5f6d8"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
