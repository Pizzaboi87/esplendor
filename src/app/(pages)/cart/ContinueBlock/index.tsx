import Image from 'next/image'
import { Button } from '../../../_components/Button'
import classes from './index.module.scss'

const ContinueBlock = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <Image
          src="/assets/images/woman-ring-1.webp"
          alt="Woman with a beautiful ring"
          width={400}
          height={400}
          className={classes.image}
        />
      </div>
      <div className={classes.content}>
        <h2 className={classes.title}>Continue Shopping</h2>
        <p className={classes.description}>
          Continue to explore our unique collection of rings
          <br className={classes.break} />
          and find the perfect one for you.
        </p>
        <Button appearance="primary" href="/products" className={classes.button}>
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}

export default ContinueBlock
