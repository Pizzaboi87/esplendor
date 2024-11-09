'use client'

import { useState, useEffect } from 'react'
import classes from './index.module.scss'
import Image from 'next/image'
import { Button } from '../Button'

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const getEndOfMonth = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const lastDay = new Date(year, month + 1, 0)
      lastDay.setHours(24, 0, 0, 0)

      return lastDay
    }

    const updateCountdown = () => {
      const now = new Date()
      const endOfMonth = getEndOfMonth()
      const remainingTime = endOfMonth.getTime() - now.getTime()

      if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
        const seconds = Math.floor((remainingTime / 1000) % 60)

        setTime({ days, hours, minutes, seconds })
      } else {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deal of the Month</h3>
        <p>
          <strong>Discover the Deal of the Month at Esplend'or!</strong> This month only, explore
          our most exquisite wedding and engagement rings at exceptional prices. Make your special
          moments unforgettable with a ring that symbolizes eternity. Don't miss out - choose love,
          choose Esplend'or!
        </p>

        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>

        <Button href="/products" label="Shop Now" appearance="primary" className={classes.button} />
      </div>

      <div className={classes.imageContainer}>
        <Image
          src="/assets/images/promo.webp"
          alt="Promotion"
          width={500}
          height={500}
          className={classes.promoImage}
        />
      </div>
    </section>
  )
}

export default Promotion
