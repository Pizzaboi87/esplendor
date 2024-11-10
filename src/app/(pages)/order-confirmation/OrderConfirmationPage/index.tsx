'use client'

import Image from 'next/image'
import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <Fragment>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className={classes.actions}>
            <Button
              href="/account"
              label="View account"
              appearance="primary"
              className={classes.button}
            />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
              className={classes.button}
            />
          </div>
        </Fragment>
      ) : (
        <div className={classes.container}>
          <div className={classes.content}>
            <h3>Thank you for your order!</h3>
            <p>
              Your order has been confirmed. You will receive an email confirmation shortly.
              <br />
              {`Your order ID is ${orderID}.`}
            </p>
            <div className={classes.actions}>
              <Button
                href={`/account/orders/${orderID}`}
                label="View order"
                appearance="primary"
                className={classes.button}
              />
              <Button
                href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
                label="View all orders"
                appearance="secondary"
                className={classes.button}
              />
            </div>
          </div>
          <div className={classes.imageWrapper}>
            <Image
              src="/assets/images/ring-box.webp"
              alt="Ring box"
              width={300}
              height={300}
              className={classes.image}
            />
          </div>
        </div>
      )}
    </Fragment>
  )
}
