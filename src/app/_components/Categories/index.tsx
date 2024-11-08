import Link from 'next/link'
import { Category } from '../../../payload/payload-types'

import classes from './index.module.scss'
import CategoryCard from './CategoryCard'

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop by Categories</h3>

        <Link href="/products" className={classes.link}>
          View All
        </Link>
      </div>

      <div className={classes.list}>
        {categories
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
      </div>
    </section>
  )
}

export default Categories
