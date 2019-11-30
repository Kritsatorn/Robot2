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

  if (typeof first_pos === 'string') {
    arr = first_pos.split("");
    if (arr.length == 7){
      id = arr[6];
    }
    else {
      id = arr[6] + arr[7];
    }
    const robotFind =  robots.find(function (robot) {
      return  robot.id == id;
    });
    a = robotFind.position.x;
    b = robotFind.position.y;
  }
  else {
    a = first_pos.x;
    b = first_pos.y;
  }

  if (typeof second_pos === 'string') {
    arr = second_pos.split("");
    if (arr.length == 7){
      id = arr[6];
    }
    else {
      id = arr[6] + arr[7];
    }
    const robotFind =  robots.find(function (robot) {
      return  robot.id == id;
    });
    c = robotFind.position.x;
    d = robotFind.position.y;
  }
  else {
    c = second_pos.x;
    d = second_pos.y;
  }
  console.log(first_pos)

  const distance = {
    dis : Math.sqrt( (a-c)*(a-c) + (b-d)*(b-d)  )
  }

    response.status(200).send(distance);
    response.sendStatus(201);
});

// PUT localhost:8080/robot/{robot_id}/position
app.put("/robot/:id/position", function (request, response) {
  const id = request.params.id;
  const {
    position
  } = request.body;

  const robotToEdit =  robots.find(function (robot) {
    return  robot.id == id;
  });

  if (robotToEdit) {
    robotToEdit.position = position;
  }
  else {
    const robot = {
      id,
      position : position
    }
    robots.push(robot);
  }

  response.sendStatus(200);
});


app.listen(port, host, function () {
  console.log("Application is running");
  console.log(port);
});
