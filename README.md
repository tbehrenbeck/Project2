# Macros + Meals
[View on Heroku](https://project2-ey.herokuapp.com/)

## Motivation
Macros + Meals was designed to create a simple, easy to use app for users to best optimize their nutrition according to their lifestyle. In the fast pace world we live in, Macros + Meals helps the user quickly determine their daily macro needs based upon their fitness goals, then search for and save recipes that meet this criteria.

## Features
- Account creation
- Personalized nutrition information
- Recipe recomendations

## Development

### Technologies Used

- [Edamam API](https://developer.edamam.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Bootstrap CSS Framework](http://getbootstrap.com/)
- [Passport](http://www.passportjs.org/)
- [Sequelize](http://docs.sequelizejs.com/) 

### Contribute
If you have any ideas to improve this app, we encourage you to contribute! Here are the steps to get you up and running:
1. Get a copy of the code on your machine and install dependencies:
```bash
git clone https://github.com/tbehrenbeck/Project2.git
cd Project2
npm install
```
2. Setup your database credentials in `config/config.json` and run:
```bash
npm run setup_db # creates tables based on our Model configuration
```

3. Setup your environment variables in a file called `.env` in the root of this repo:
```bash
appID="Your Edamam API app id here"
apiKey="Your Edamam API key here"
SECRETPHRASE="keyboard cat" # this can be anything, it is used to hash passwords
```

4. Make your changes and test locally, then push up your branch and make a pull request!

## Contributors

- Eddy Yousef
- Tommie Behrenbeck
- Brittani Slimp
- Adams Lowe
- Austin Walker

## Link 

https://project2-ey.herokuapp.com/