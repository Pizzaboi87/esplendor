'use client'

import Image from 'next/image'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'
import { useRouter } from 'next/navigation'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { setCategoryFilters } = useFilter()
  const navigation = useRouter()

  const handleSelect = (categoryId: string) => {
    setCategoryFilters([categoryId])
    navigation.push('/products')
  }

  return (
    <div className={classes.card} onClick={() => handleSelect(category.id)}>
      <Image
        src={(category.media as Media).url}
        alt={category.title}
        layout="fill"
        objectFit="cover"
        className={classes.background}
      />

      <p className={classes.title}>{category.title}</p>
    </div>
  )
}

export default CategoryCard
