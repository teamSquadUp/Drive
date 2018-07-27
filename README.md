<p align="center">
  <img src="https://github.com/teamSquadUp/SquadUpDrive/blob/master/src/images/squadlogo.png">
</p>

# SquadUp

SquadUp is a group decision making progressive web app that helps large groups decide where to eat at. The application is designed for easy use and accessibility as only one group member needs to create an account and then a group code can be shared. As it is a progressive web app, SquadUp is accessible across all devices, does not take up storage space, and is straightforward and fast to use. The app is live at [squadup.app](squadup.app)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You first need to install node.js and npm at https://nodejs.org/en/download/. Then you can check the version of npm using
```
npm -v
```
This project was created with npm 4.6.1. All the packages should be in the node modules so there is not need to install individual packages.

You will need to create a Google developers account to recieve API keys to make the Google places API calls that we do in this repository. The reference link to using Google Material UI can be found at : https://material-ui.com/getting-started/installation/

### Installing

You can install and run this repository by gitcloning and then going to the SquadUp folder cloned then running the following command:

```
cd SquadUp
npm run start
```

If the npm command has authorization issues, you can put sudo infront of the command to install the folder. Then open [http://localhost:3000/](http://localhost:3000/)to see the app.

## Deployment

This progressive web app was depoyed using firebase [https://firebase.google.com/](https://firebase.google.com/). Create a firebase account and add this project to firebase to enable user authentication and database use. 

## Demo of SquadUp
A demonstration of the app login and dining selection is below:
![Demo](https://github.com/teamSquadUp/SquadUpDrive/blob/master/demologin.gif)

The card swiping to vote yes or no on a resturant and top result is below:
![Demo](https://github.com/teamSquadUp/SquadUpDrive/blob/master/demoswipe.gif)

## Contributing

Please read Contributing.md in the repository for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Rakia Segev** - *Initial work* - [rakiasegev](https://github.com/rakiasegev)
* **Brittany Wang** - *Initial work* - [brittanywang](https://github.com/brittanywang)
* **Shivam Malpani** - *Initial work* - [malpaniHMC](https://github.com/malpaniHMC)
* **Ke Jin** - *Initial work* - [kekekekekekekekeke](https://github.com/kekekekekekekekeke)

See also the list of [contributors](https://github.com/teamSquadUp/SquadUpDrive/contributors) who participated in this project.

## License

You must consult us and cite us if you use any part of our code or app features.

## Acknowledgments

Prof. Zach Dodds and Prof. Colleen Lewis from Harvey Mudd College for being our advisors and supporting us in this project
Facebook's create-react-app was used as a starting point for developing this progressive web app.
