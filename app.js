const express = require('express');
const jwt  = require('jsonwebtoken');
const fetchUrl = require('fetch').fetchUrl;


const app = express();
const port = 5000;


app.get('/api', (req, res) => {

  fetchUrl("http://jsonplaceholder.typicode.com/posts", function(error, meta, body){
    //Create a array to hold the posts from fetch
    var posts = []
    var counter = 0;
    var today = new Date();
    
    for(var i = 0; i < body.length; i++){
      posts[i] = body[i]
      counter++;
    }

    //console.log(body.toString());
    res.json({
      message: `The response contained ${counter} items`
    });
});

  let client = {
    name: 'Fisco',
    Budget: 10000,
    Balance: 1500,
    ROI: 950,
    yearEnd: 2021
  }

  let person = {
    name: 'Mario Zaldivar',
    age: 31,
    phone: '123-456-7890',
    email: 'test@mario.com',
    address: '123 Main St Tacoma, WA 98045',
    client: client
  }
  // res.json({
  //   message: person
  // });
});



//Create a protected route
app.post('/api/posts', verifyToken, (req, res) => {
  //
  jwt.verify(req.token, 'secret_key', (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        message: 'Post created...',
        authData
      });

    }
  });

});

//--------------Implement json web token
app.post('/api/login', (req, res) => {
  //Create a mock user
  const user = {
    id: 1,
    username: 'Franklin',
    email: 'test@mail.com'
  }

  //Call JWT
  jwt.sign({user}, 'secret_key', {expiresIn: '30s'}, (err, token) => {
    res.json({
       token
    });
  });
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>


//Create verifyToken function
function verifyToken(req, res, next){
  //Get the authorization header value. Send token in the header as the authorization value
  const beaerHeader = req.headers['authorization'];

  //Check if bearer is not undefined
  if(typeof beaerHeader !== 'undefined'){
    //Split at the space
    const bearer = beaerHeader.split(' ');
    //Get token from array
    const bearerToken = bearer[1];

    //Set the token
    req.token = bearerToken;

    //Next middleWare
    next();
  }else{
    //Forbidden
    res.sendStatus(403);
  }

}


//FETCH REMOTE DATA --------------------------------------------

//--------------------------------------------------------------
app.listen(port, () => console.log(`Server started on port ${port}`));