'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { setCategoryFilters } = useFilter()

  return (
    <Link href="/products" className={classes.card}>
      <Image
        src={(category.media as Media).url}
        alt={category.title}
        layout="fill"
        objectFit="cover"
        className={classes.background}
        onClick={() => setCategoryFilters([category.id])}
      />

      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
