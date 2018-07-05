<p align="center">
  <img src="https://github.com/teamSquadUp/SquadUpDrive/blob/master/src/images/logo.png">
</p>

# SquadUp

Squad Assemble! 

SquadUp is a group decision making progressive web app that helps large groups decide where to eat at, allows for bill splitting among group members, and facilitates traveling to different destinations. Only one group member is required to create an account to start the decision making process and obtain a group code, which can be shared. The appliciation is accessible across all devices and does not take up storage space. 

Squad Decide!

## Installation
For frontend installation, the latest stable version of `node` is recommended. 
```bash
# Clone the repository 
> git clone https://github.com/teamSquadUp/SquadUpDrive.git
> cd SquadUpDrive

```

This project uses [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) as a proxy. 
```bash
> git clone https://github.com/Rob--W/cors-anywhere.git
> cd cors-anywhere
```

### Running Locally
```bash
> cd SquadUpDrive
> npm run start 
```
...and in a separate shell:
```bash
> cd cors-anywhere
> npm run start
```
Open [http://localhost:3000](http://localhost:3000) to see the app.



## Demo of SquadUp
A demonstration of the app login and dining selection is below:
![demologin](https://user-images.githubusercontent.com/35832643/42336459-991cfb60-8038-11e8-8c81-383065dbe532.gif)

The card swiping to vote yes or no on a resturant and top result is below:
![demoswipe](https://user-images.githubusercontent.com/35832643/42336501-b90298ea-8038-11e8-8920-72b1f4563af3.gif)


## Contributing

Please read Contributing.md in the repository for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Rakia Segev** - *Initial work* - [rakiasegev](https://github.com/rakiasegev)
* **Brittany Wang** - *Initial work* - [brittanywang](https://github.com/brittanywang)
* **Shivam Malpani** - *Initial work* - [malpaniHMC](https://github.com/malpaniHMC)
* **Ke Jin** - *Initial work* - [kekekekekekekekeke](https://github.com/kekekekekekekekeke)

See also the list of [contributors](https://github.com/teamSquadUp/SquadUpDrive/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

We would like to thank Prof. Zach Dodds and Prof. Colleen Lewis from Harvey Mudd College for being our advisors and supporting us in this project. Facebook's create-react-app was used as a starting point for developing this progressive web app.
