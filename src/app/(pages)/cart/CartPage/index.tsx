'use client'

import React, { Fragment } from 'react'
import CartItem from '../CartItem'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, cartTotal, hasInitializedCart, addItemToCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.cartWrapper}>
              <h3>Your Cart is empty</h3>
            </div>
          ) : (
            <Fragment>
              <h3 className={classes.mainTitle}>Your Cart</h3>
              <div className={classes.cartWrapper}>
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          key={id}
                          id={id}
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>

                <div className={classes.summary}>
                  <div className={classes.row}>
                    <h6 className={classes.cartTotal}>Summary</h6>
                  </div>

                  <div className={classes.row}>
                    <p className={classes.cartTotal}>Delivery Charge</p>
                    <p className={classes.cartTotal}>€0.00</p>
                  </div>

                  <div className={classes.row}>
                    <p className={classes.cartTotal}>Grand Total</p>
                    <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                  </div>

                  <Button
                    className={classes.checkoutButton}
                    href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                    label={user ? 'Checkout' : 'Login to checkout'}
                    appearance="primary"
                  />
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
