import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router} from 'react-router-dom';

import App from './components/App';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
});

const Root = () => {
  return (
    <Router>
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
