const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

//  allows for the use of .env files and variables
require('dotenv').config();

//  file imports
const schema = require('./schema/schema');
const mongoose = require('./config/mongo');

const app = express();

app.use(cors());

//  Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

//  Default route
app.get('/', (req, res) => {
  res.send('Welcome to this graphQL intro.');
});

const port = 5000;

app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});
