'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'

import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState<number>(qty)

  const decrement = () => {}
  const increment = () => {}
  const enterQuantity = () => {}

  return (
    <li className={classes.item}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
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

      <div className={classes.subtotalWrapper}>
        <RemoveFromCartButton product={product} />
        <Price product={product} button={false} quantity={quantity} />
      </div>
    </li>
  )
}

export default CartItem
