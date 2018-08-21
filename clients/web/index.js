/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { onError } from 'apollo-link-error'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Router } from 'react-router-dom'

import history from './history'
import App from './components/App'
import AppContainer from './components/AppContainer/AppContainer'
import Error from './components/Error/Error'
import './style/style.css'

/**
 * General error handling.
 * @type {Object}
 */
const generalError = onError(({ args }) => {
  console.log(args)
  // ReactDOM.render(
  //   <Error error={networkError.message} />
  //   , document.querySelector('#app'),
  // )
})

/**
 * Set up link to GraphQL server.
 * @type {HttpLink}
 */
const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
})

// const networkInterface = createNetworkInterface({
//   uri: 'http://localhost:3000/graphql',
//   opts: {
//     credentials: 'same-origin',
//   },
// })

/**
 * Set up Apollo (GraphQL interface).
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
})

/**
 * Create the root element to contain the app. Router handles the app routes
 * while ApolloProvider enables graphQL functionality in all sub-components.
 */
const Root = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <AppContainer>
        <App />
      </AppContainer>
    </Router>
  </ApolloProvider>
)

/**
 * Render the element to the page.
 */
ReactDOM.render(
  <Root />,
  document.querySelector('#app'),
)
