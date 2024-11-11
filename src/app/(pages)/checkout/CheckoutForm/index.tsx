'use client'

import React, { useCallback } from 'react'
import { PaymentElement, AddressElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setIsLoading(true)

      try {
        const { error: stripeError, paymentIntent } = await stripe?.confirmPayment({
          elements: elements!,
          redirect: 'if_required',
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order-confirmation`,
          },
        })

        if (stripeError) {
          setError(stripeError.message)
          setIsLoading(false)
        }

        if (paymentIntent) {
          try {
            const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                total: cartTotal.raw,
                stripePaymentIntentID: paymentIntent.id,
                items: (cart?.items || [])?.map(({ product, quantity }) => ({
                  product: typeof product === 'string' ? product : product.id,
                  quantity,
                  price:
                    typeof product === 'object'
                      ? priceFromJSON(product.priceJSON, 1, true)
                      : undefined,
                })),
              }),
            })

            if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

            const {
              error: errorFromRes,
              doc,
            }: {
              message?: string
              error?: string
              doc: Order
            } = await orderReq.json()

            if (errorFromRes) throw new Error(errorFromRes)

            router.push(`/order-confirmation?order_id=${doc.id}`)
          } catch (err) {
            console.error(err.message)
            router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`)
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting payment: ${msg}`)
        setIsLoading(false)
      }
    },
    [stripe, elements, router, cart, cartTotal],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error && <Message error={error} />}
      <PaymentElement />
      <AddressElement
        options={{
          mode: 'shipping',
          defaultValues: {
            name: '',
            address: {
              line1: '',
              line2: '',
              city: '',
              state: '',
              postal_code: '',
              country: '',
            },
          },
        }}
      />
      <div className={classes.actions}>
        <Button
          label="Back to cart"
          href="/cart"
          appearance="secondary"
          className={classes.button}
        />
        <Button
          label={isLoading ? 'Loading...' : 'Checkout'}
          type="submit"
          appearance="primary"
          disabled={!stripe || isLoading}
          className={classes.button}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
