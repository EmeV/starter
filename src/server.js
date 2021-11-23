const express = require('express');

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
}; 
const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

const app = express();

app.use(urlLogger, timeLogger);
app.use(express.static('src/public'));

app.get('/json', (request, response) => {
 // response.send('hello world');
 response.status(200).json({"name": "Robbie"});
});

app.get('/', (request, response) => {
  response.send('hello world');
  //static file
 });

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
}); 

