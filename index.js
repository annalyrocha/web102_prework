/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

console.log(GAMES_JSON.length)
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

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (var i = 0; i < games.length; i++) {
        console.log(games[i]);

        var obj = `<div class='game-card'>
               <p>${games[i].name}</p>
               <img class='game-img' src=${games[i].img}>
               </div>`;
        var el = document.createElement("div");
        el.innerHTML = obj;
        gamesContainer.appendChild(el);
    }
}

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container


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
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

console.log("totalContributions", totalContributions.toLocaleString('en-US'));

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = '$' + totalRaised.toLocaleString('en-US');

// grab the number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML =GAMES_JSON.length


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    // use the function to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
//filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    // use the function to add funded games to the DOM
    addGamesToPage(fundedGames);
}
//filterFundedOnly();
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners to the buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// calculate the total amount raised for all games
const totalAmountRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// format the total amount raised with commas
const formattedTotalRaised = totalAmountRaised.toLocaleString();

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesText = `We currently have ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'unfunded game' : 'unfunded games'}.`;

// create a string for the total amount raised and the number of games
const totalRaisedText = `We have a total of $${formattedTotalRaised} raised for ${GAMES_JSON.length} games.`;

// create a string for the help request
const helpRequestText = `We need your help to fund these amazing games!`;

// create a new DOM element containing the template strings and append it to the description container
const infoElement = document.createElement("p");
infoElement.textContent = `Welcome to our company! ${totalRaisedText} ${unfundedGamesText} ${helpRequestText}`;
descriptionContainer.appendChild(infoElement);
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
const [firstGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `Top Game: ${firstGame.name} - $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `Runner-up: ${secondGame.name} - $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);