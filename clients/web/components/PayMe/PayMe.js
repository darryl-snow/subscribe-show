// Dependencies
import React from 'react'
import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

/**
 * This comonent was copied directly from the Stripe docs. Its purpose is to
 * enable users to use the Payment API to make a donation.
 * @extends React
 */
class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props)

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    })

    paymentRequest.on('token', ({ complete, token, ...data }) => {
      console.info('Received Stripe token: ', token)
      console.info('Received customer information: ', data)
      complete('success')
    })

    paymentRequest.canMakePayment().then((result) => {
      this.setState({ canMakePayment: !!result })
    })

    this.state = {
      canMakePayment: false,
      paymentRequest,
    }
  }

  /**
   * Click handler for the pay me button. Used only for logging the event.
   */
  onClick = () => {
    // Log the event.
    ReactGA.event({
      category: 'Pay Me',
      action: 'Click Button',
    })
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        className="PaymentRequestButton"
        paymentRequest={this.state.paymentRequest}
        onClick={this.onClick}
        style={{
          paymentRequestButton: {
            theme: 'dark',
            height: '64px',
            type: 'donate',
          },
        }}
      />
    ) : null
  }
}

export default injectStripe(PaymentRequestForm)

/**
 * Define the types for each property.
 * @type {Object}
 */
PaymentRequestForm.propTypes = {
  stripe: PropTypes.object,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
PaymentRequestForm.defaultProps = {
  stripe: {
    paymentRequest: () => {},
  },
}
