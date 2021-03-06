/* eslint-env browser */

// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import ReactGA from 'react-ga'
import { onError } from 'apollo-link-error'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Router } from 'react-router-dom'
// import { StripeProvider } from 'react-stripe-elements'

// App components
import config from './config'
import history from './history'
import App from './components/App'
import AppContainerComponent from './components/AppContainer/AppContainer'
import Error from './components/Error/Error'

// Styles
import './style/style.css'

// Config
const {
  GA_TRACKING_CODE,
  GRAPHQL_PATH,
  HOST,
  PROTOCOL,
  SERVER_PORT,
} = config

/**
 * General error handling.
 * @type {Object}
 */
const generalError = onError(({ networkError }) => {
  if (networkError) {
    ReactDOM.render(
      <Error error={networkError ? networkError.message : ''} />
      , document.querySelector('#app'),
    )
  }
})

/**
 * Set up link to GraphQL server.
 * @type {HttpLink}
 */
const link = createHttpLink({
  uri: `${PROTOCOL}://${HOST}:${SERVER_PORT}/${GRAPHQL_PATH}`,
  credentials: 'include',
})

/**
 * Set up Apollo (GraphQL interface).
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  link: generalError.concat(link),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
})

/**
 * Initialize Google Analytics
 */
ReactGA.initialize(GA_TRACKING_CODE, {
  debug: config.GA_DEBUG,
  titleCase: false,
})

/**
 * Create the root element to contain the app. Router handles the app routes
 * while ApolloProvider enables graphQL functionality in all sub-components.
 */
const Root = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <AppContainerComponent>
        <App />
      </AppContainerComponent>
    </Router>
  </ApolloProvider>
)

// TODO: pay me button
// <StripeProvider apiKey="pk_test_K4i3N250qcdeJ9sIy0a09jqY">
// </StripeProvider>

/**
 * Render the element to the page.
 */
ReactDOM.render(
  <Root />,
  document.querySelector('#app'),
)
