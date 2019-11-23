___
> #### It's an **EMS software** - [employee management system] which was built to help companies reduce their time spent regarding the Accounting and HR departments.

> #### It helps with generating salaries, penalties, bonuses, etc. Employing a new staff member is only a few clicks away or giving an end date takes one click. 

> #### It contains many other features, like giving loans to employees, tracking their instalments, making annual/ monthly reports, and much more. It looks and feels great thanks to great structure and design, and even though it possesses many features, the complexity is hidden from the end-user. So it always appears easy to use, no matter what level of functionality you choose to use. 

> #### It uses **ReactJS** on the frontend and **NodeJS** on the backend.
___
> >
> #### Among other things it uses:
> > * **React** on the fronend,
> > * **Redux** for state management,
> > * **React Router** for better navigation,
> > * **Sails** as a MVC Node framework,
> > * **MongoDB** as a local storage,
> > * **mLab** as a remote MongoDB storage,
> > * **Bootstrap** for a better responsiveness,
> > * **jQuery & Lodash** as helper libraries,
> > * **GAS** (Google Apps Scripts),
> > * **Google OAuth2**, 
> > * **Google Drive & Spreadsheets APIs**
> > * ... and so much more ...
___
> > <img src="https://github.com/BiggaHD/Automated-Accountant/blob/master/stack.svg" height="450" width="600">

> #### In order to use this app, you'll have to set up your own Google Sheets API, get the necessary credentials, and replace them in this project. That needs to be done in the config.js files [backend & frontend]. Also, I recommend checking out the 'Local Setup' docs which you can find in this repo to get you started. Additionally, this is a work in process, and as I go along I'll update instructions. Currently working on adding new features.
___
> # Instructions:
In order to run & use this app locally: 

Clone the repository:  git clone https://github.com/BiggaHD/Mars-EMS  
 
##### Install the necessary dependencies: Run NPM install in all three folders:  
- ROOT folder (Mars-EMS). 
- BACKEND folder (Mars-EMS\backend ).  
- FRONTEND folder (Mars-EMS\frontend ). 
 
##### Add your own credentials: ▪ Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a new project. 
- Enable the Google Spreadsheets API. 
- Create OAuth credentials - for the client choose Web client 
- Copy the Client ID and paste it inside of the config file (frontend\src\config\config.js). 
- Don't forget to do similar for the backend -Look into the 'client_secret' JSON file for more info. 
- For the backend, you’ll have to choose 'Other’ aka Installed. 
- Download the file and save inside of the backend (it’s root) folder under the name 'client_secret.json'. 

**NOTE:** Both of them have to point to the same project. Additionally, if you want to use a remote MongoDB storage, you’ll have to the connections.js file and change your preferences. 
The file is located inside of the backend\config\connections.js file. 
 
##### Now let’s start the project: 
Run an instance of your local MongoDB:    mongod [ Important – this needs to start first ]  
Run the following command inside of the root folder:   npm start  

NOTE: It will start the NodeJS backend and the ReactJS frontend at the same time. 

##### It’s time to login:  Login restriction has been removed [ by default ]. To log in, you can use your Gmail account. 
Previously, the login was restricted, and to log in you had to use the email which I was providing. If you’re still interested in changing the default behavior, you can achieve that, on a basic level, by editing the config file located in **frontend\src\config\config.js**
 
 
This part is very important:  After you get redirected, copy the code received from Google, go back to localhost: 3000 or Heroku (depending on where you're doing the testing), paste it into your app and confirm.  
 
Deployed version: To test it online please visit: [Mars-EMS](https://hr-ems.herokuapp.com)
Login with the same email and password provided above, after redirect allow the app the permissions needed [ it's my mail anyways :) ], copy the code, go back, paste the code, submit and enjoy while testing it. If you want to test the app to its fullest, here are links for the 2 Google sheets used in this app:    

a) [Employee spreadsheet](https://docs.google.com/spreadsheets/d/1vz26VMZW1Bn04dNx0wJYQb2jKO0AXVuLqz6tCR2WWJs/edit?usp=sharing) (used to manage employees, their salaries, status, bonuses, penalties, etc.).  
b) [Accountant spreadsheet](https://docs.google.com/spreadsheets/d/1TcqyztMXuzbL5SPzO78lAL0HbOjlH_L9cURU5UzAqjs/edit?usp=sharing) (used to calculate salaries).
