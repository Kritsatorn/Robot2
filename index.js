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
    second_pos,
    metric
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

  dis = Math.sqrt( (a-c)*(a-c) + (b-d)*(b-d)  )
  if( metric ) {
    if (metric == "manhattan") {
      dis = Math.abs(a-c) + Math.abs(b-d);
    }
  }

  const distance = {
    dis
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

//

function euclid(x1,y1,x2,y2)
{
  	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

//http://localhost:8080/nearest
app.post("/nearest", function (request, response) {
  let Body = request.body;
  //response.send(Body);
  let ref = Body["ref_position"];
  let min = Math.pow(2,50);
  let id_ans = 0;

  robots.forEach(function(item){
     let k = euclid(item.position.x,item.position.y,ref.x,ref.y);
     if(k<min)
     {
      min = k;
      id_ans = item.id;
     }
  });
  let Arr = []

  if(id_ans != 0 && id_ans != null)
    Arr.push(id_ans);

  const ans = {
    "robot_ids":Arr
  };

  response.status(200).send(ans);
});


app.listen(port, host, function () {
  console.log("Application is running");
  console.log(port);
});
