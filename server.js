const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  const quote = pickFromArray(quotes);
  response.send(quote);
});

app.get("/quotes/search", function (request, response) {
 let termQuery = request.query.term;
 let authorQuery = request.query.author;
  console.log(termQuery);

  let result = []
 for (const obj of quotes){
  let objMatchesTerm = obj.quote.toLocaleLowerCase()
  .includes(termQuery.toLocaleLowerCase());
  let objMatchesAuthor = obj.quote.toLocaleLowerCase()
  .includes(authorQuery.toLocaleLowerCase());


    if (objMatchesTerm || objMatchesAuthor){
      result.push(obj);
    }
    }
   response.send(result);
  });


//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  const random=Math.random() * arr.length
  const randomIndex = Math.floor(random);
  return arr[randomIndex];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
