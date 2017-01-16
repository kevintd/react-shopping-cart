/**
 * @flow
 * @module CheckoutButton
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React stateless component.
 * Checkout button with grand total.
 *
 */
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Transition from 'react-overlays/lib/Transition';

import { animate } from '../../helpers';

const
/**
  * @static propTypes
  * @memberof CheckoutButton
  *
  * @prop {string} checkoutURL - Link to checkout page.
  * Required
  * @prop {string} iconCheckoutClassName - ClassName
  * for cart icon on checkout button.
  * Default is 'icon-basket'
  */
  propTypes = {
    checkoutURL: PropTypes.string.isRequired,
    iconCheckoutClassName: PropTypes.string,
  },
/**
  * @static containerPropTypes
  * @memberof CheckoutButton
  *
  * @prop {number} grandTotal - Amount of money to pay. Required.
  * @prop {boolean} hidden - Show or hide button. Required.
  * @prop {string} currency - Current cart currency. Required.
  * @prop {getBoundLocalizationType} getLocalization - Required.
  */
  containerPropTypes = {
    grandTotal: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {
    iconCheckoutClassName: 'icon-basket',
  };

export default function CheckoutButton (
  {
    grandTotal,
    hidden,
    checkoutURL,
    currency,
    iconCheckoutClassName,
    getLocalization,
  } : Object,
) : React$Element<any> {
  return !hidden && (
    <Transition
      style={animate(500)}
      in={!hidden}
      enteringClassName="fadeInUp"
      exitingClassName="fadeOut"
      timeout={500}
      unmountOnExit
    >
      <Link
        to={checkoutURL}
        className={`btn btn-primary btn-block${!grandTotal ? ' disabled' : ''}`}
      >
        <i className={iconCheckoutClassName} />
        {
          getLocalization(
            'checkoutTotal', {
              currency: getLocalization(
                currency,
              ),
              total: grandTotal,
            },
          )
        }
      </Link>
    </Transition>
  );
}

CheckoutButton.propTypes = { ...propTypes, ...containerPropTypes };
CheckoutButton.defaultProps = defaultProps;