/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds al   l data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for ( let i = 0; i < games.length; i++) {
        
        // create a new div element, which will become the game card
        let game_div = document.createElement("div");

        // add the class game-card to the list
        game_div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        game_div.innerHTML = `
            <h2> Name : ${games[i].name} </h2>
            <img src="${games[i].img}" class="game-img" alt="${games[i].name}">
            <p> Description : ${games[i].description} </p>
            <h3> Backers: ${games[i].backers} </h3>
        `;

        // append the game to the games-container
        gamesContainer.append(game_div);
        
        
    }    
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, GAMES_JSON) => {
    return acc + GAMES_JSON.backers;
}, 0);



// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
     ${totalContributions.toLocaleString('en-us')}
`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
     $${totalRaised.toLocaleString('en-us')}
`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (acc, GAMES_JSON) => {
    return acc + 1; //this was pretty straightforward lol
}, 0);

gamesCard.innerHTML = `
     ${totalGames.toLocaleString('en-us')}
`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);


    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (GAMES_JSON) => {
        return GAMES_JSON.pledged < GAMES_JSON.goal 
    }, 0);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (GAMES_JSON) => {
        return GAMES_JSON.pledged >= GAMES_JSON.goal 
    }, 0);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly)

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly)

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames)

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedNumber = GAMES_JSON.reduce( (acc, GAMES_JSON) => {
    return GAMES_JSON.pledged < GAMES_JSON.goal ? acc + 1 : acc; //idk if this is how we're supposed to do it but it feels witty
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayString = unfundedNumber > 0 ? `
A total of $${totalRaised.toLocaleString('eng-us')} has been raised for ${totalGames.toLocaleString('eng-us')}.
 Currently, ${unfundedNumber} ${unfundedNumber > 1 ? "games" : "game"} remains unfunded. We need your help to fund these amazing games!
` : 
`
A total of $${totalRaised.toLocaleString('eng-us')} has been raised for ${totalGames.toLocaleString('eng-us')}.
All games have been funded currently. Awesome!

`; //using a ternary operator here also feels very witty

let infoElement = document.createElement("p");
infoElement.innerHTML = displayString;

descriptionContainer.append(infoElement);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...otherGames] =  sortedGames;


// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameElement = document.createElement("p");
firstGameElement.innerHTML = firstGame.name;
firstGameContainer.append(firstGameElement);

// do the same for the runner up item
let secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.append(secondGameElement);