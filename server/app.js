const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

//  Middleware
app.use('/graphql', graphqlHTTP({}));

const port = 5000;

app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});
