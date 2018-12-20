const express = require('express');
const graphqlHTTP = require('express-graphql');

//  graphQL imports
const schema = require('./schema/schema');

const app = express();

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
