import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';

import { ApolloProvider } from 'react-apollo';

import client from './config/apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
