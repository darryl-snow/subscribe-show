import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router } from 'react-router-dom';

import history from './history';
import App from './components/App';
import './style/style.css';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    opts: {
      credentials: 'same-origin',
    },
  }),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
});

const Root = () => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#app')
);
