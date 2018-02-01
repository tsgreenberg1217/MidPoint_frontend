# Midpoint
## Check out the app [here](https://midpoints.herokuapp.com/login)


Hate the dread of making decisions on where to meet up with friends? Midpoint is your one-stop to make the process equitable and easy. Tell us where your friends are coming from and what you want to do, then we'll do the rest. Our software calculates the midpoint and gives you options based off that area.

## Getting Started

Copy the link of repository upper right of this page (clone or download).

```Git clone git@github.com:tsgreenberg1217/MidPoint_backend.git
```


### Installing

Once you have gone into the folder for Midpoint, the following will download the necessary files for our app to run.

```npm install && npm start
```
## Nuts and Bolts

The rails application interacts with the front-end React application in various ways. The first is through the sign-up/login process that either persists your data or logs you in. This is done using bcrypt user authentication to make sure your data is secure. Based off your user data, it loads your saved locations that you have made during other sessions on our site.

The other times the front-end interacts with the back is through API requests. Midpoint uses the google coordinates, google maps react, and Yelp API's. We request information google coordinates when you submit the locations of yourself and your friends. The google maps react API is then sent a request to get a proper map based off of the locations of your group. Lastly, the Yelp API is sent a request with the location as the coordinates of your party's midpoint along with the type of establishment you are interested in


## Built With

* A lot of debugger and byebug
* React
* Rails
* Bcrypt
* Semantic
* Tender, loving, care


## Authors

* **Todd Greenberg** - *Initial work* - [Github](https://github.com/tsgreenberg1217)
* **Nick Hall** - *Initial work* - [Github](https://github.com/nh83012001)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* CityYelp and the endless wisdom of Nicholas Paolino
