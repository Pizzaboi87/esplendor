'use client'

import Image from 'next/image'
import Link from 'next/link'

import React, { useState } from 'react'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, id, addItemToCart }) => {
  const [quantity, setQuantity] = useState<number>(qty)

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      addItemToCart({ product, quantity: Number(quantity - 1) })
    }
  }

  const increment = () => {
    setQuantity(quantity + 1)
    addItemToCart({ product, quantity: Number(quantity + 1) })
  }

  const enterQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    if (value === 0 || event.target.value === '') {
      setQuantity(1)
      addItemToCart({ product, quantity: 1 })
    } else if (value > 99) {
      setQuantity(99)
      addItemToCart({ product, quantity: 99 })
    } else {
      setQuantity(value)
      addItemToCart({ product, quantity: value })
    }
  }

  return (
    <li className={classes.item} key={id}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>
            {title.split('-').map((part: string, index: number) => (
              <React.Fragment key={index}>
                {part}
                {index < title.split('-').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h6>
          <Price product={product} button={false} />
        </div>

        <div className={classes.quantity}>
          <div onClick={decrement} className={classes.quantityBtn}>
            <Image
              src="/assets/icons/minus.svg"
              alt="decrement"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input
            type="number"
            value={quantity}
            onChange={enterQuantity}
            className={classes.quantityInput}
            min={1}
            max={99}
          />

          <div onClick={increment} className={classes.quantityBtn}>
            <Image
              src="/assets/icons/plus.svg"
              alt="increment"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>

      <div className={classes.deleteWrapper}>
        <RemoveFromCartButton product={product} />
      </div>

      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={quantity} />
      </div>
    </li>
  )
}

export default CartItem
