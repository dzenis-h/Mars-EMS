// Here goes the Client ID
// Go to https://console.cloud.google.com
// Create a new project
// Enable Google Spreasheets API
// Create OAuth credentials - for React side (client) choose Web client
// Copy the Client ID and paste it here
// NOTE: Don't forget to do similar for the backend -Look into the 'client_secret' JSON file for more info
// Both of them have to point to the same project. There you'll choose 'Other client' aka Installed
// Download the file and save inside of the root backend folder under the name 'client_secret.json'
export const CLIENT_ID =
  "870282256260-v6prtq04v67g06trdsbmmaskqk5jod6u.apps.googleusercontent.com";

export const gapi = window.gapi;

// Here goes the base URL (backend) that we use across all the areas of this app
// When you deploy, this URL has to change to match the domain from where the app is served
export const baseApiUrl = "https://hr-ems.herokuapp.com/server/";

// Local Host: http://localhost:1337/server/
// HEROKU: https://hr-ems.herokuapp.com/server/

// Here we add emails that should have access to the app
export const emails = [
  // Add or remove emails in order to give or remove access
  // Look inside of the components/Login.js file to activate this option
  // Right now every Google account is able to login (if they grant access to their basic info)

  // EMIAL RESTIRICTION IS CURRENTLY OFF. - CHECK OUT THE 'Login.js' FILE
  "bigga.test.2018@gmail.com"
];
