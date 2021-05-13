import React from 'react'
import styles from './ProductList.module.scss'
import { useProductList } from './useProductList'
import Header from './Header/Header'
import ProductCards from './ProductCards/ProductCards'
import Error from './Error/Error'
import Filters from './Filters/Filters'

const ProductList = () => {
  const { items, filter, status, categoryStatus, updateFilter, categories, resetFilter } = useProductList()
  const handleFilterIsNewUpdate = () => updateFilter({ isNew: !filter.isNew })
  const handleFilterIsLimitedUpdate = () => updateFilter({ isLimited: !filter.isLimited })
  const handleFilterСategoryUpdate = e =>
    updateFilter({
      category: [...filter.category, ...Object.values(...categories.filter(it => it.name === e.target.name))],
    })
  const cleaningFilterCategories = () => updateFilter({ category: [] })
  const handleSearchUpdate = e => {
    updateFilter({ search: e.target.value })
  }
  const pageReloadHandler = () => resetFilter()
  return (
    <>
      <Header handler={handleSearchUpdate} />
      <div className={styles.root}>
        <Filters
          clearHandler={cleaningFilterCategories}
          handler={handleFilterСategoryUpdate}
          categories={categories}
          isLimitedHandler={handleFilterIsLimitedUpdate}
          isNewHandler={handleFilterIsNewUpdate}
          items={items}
          filter={filter}
        />
        {status === 'success' && categoryStatus === 'success' && <ProductCards items={items} />}
        {(status === 'error' || categoryStatus === 'error') && <Error handler={pageReloadHandler} />}
      </div>
    </>
  )
}

export default ProductList
