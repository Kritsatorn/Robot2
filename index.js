// Import express
const express = require('express');
const cors = require('cors');

const host = '0.0.0.0';
const port = 8080;

const app = express();

app.use(cors());
app.use(express.json());

let robots = [];
let currentId = 0;

// localhost:8080/robots
app.get("/robots", function (request, response) {
  console.log("YAY! New request is coming!");
  response.status(200).send(robots);
});

// localhost:8080/distance
app.post("/distance", function (request, response) {
  const {
    first_pos,
    second_pos
  } = request.body;

  const robot = {
    distance : Math.sqrt( (first_pos.x-second_pos.x)*(first_pos.x-second_pos.x) + (first_pos.y-second_pos.y)*(first_pos.y-second_pos.y)  ),
    id : currentId
  }

    robots.push(robot);
    response.sendStatus(201);
});





// POST localhost:8080/tweets
app.post("/tweets", function (request, response) {
  const {
    username,
    content
  } = request.body;
  const newTweet = {
    username: username,
    content: content,
    time: Date(),
    id: currentId,
  };

  tweets.push(newTweet);
  currentId += 1;
  console.log(`@${username}: ${content}`);
  response.sendStatus(201);
});

// GET localhost:8080/tweets
app.get("/tweets", function (request, response) {
  response.send(tweets);
})

// PUT localhost:8080/tweets/:id
app.put("/tweets/:id", function (request, response) {
  const id = request.params.id;
  const {
    username,
    content
  } = request.body;

  const tweetToEdit = tweets.find(function (tweet) {
    return tweet.id == id;
  });

  tweetToEdit.username = username;
  tweetToEdit.content = content;

  response.sendStatus(200);
})

// DELETE localhost:8080/tweets/:id
app.delete("/tweets/:id", function (request, response) {
  const id = request.params.id;
  tweets = tweets.filter(function (tweet) {
    return tweet.id != id;
  });
  response.sendStatus(200);
})

app.listen(port, host, function () {
  console.log("Application is running");
  console.log(port);
});
