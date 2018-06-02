/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Router } from 'react-router-dom'

import history from './history'
import App from './components/App'
import './style/style.css'

/**
 * Connect to GraphQL server.
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    opts: {
      credentials: 'same-origin',
    },
  }),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
})

/**
 * Create the root element to contain the app. Router handles the app routes
 * while ApolloProvider enables graphQL functionality in all sub-components.
 */
const Root = () => (
  <Router history={history}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
)

/**
 * Render the element to the page.
 */
ReactDOM.render(
  <Root />,
  document.querySelector('#app'),
)
