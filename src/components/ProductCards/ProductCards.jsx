import React from 'react'
import './ProductCards.css'
import Barley from './Imgs/Barley.svg'
import Canola from './Imgs/Canola.svg'
import Corn from './Imgs/Corn.svg'
import Oats from './Imgs/Oats.svg'
import Soybeans from './Imgs/Soybeans.svg'
import Wheat from './Imgs/Wheat.svg'

function ProductCards({ items }) {
  function logoDefiner(type) {
    switch (type) {
      case 'Barley':
        return Barley
      case 'Canola':
        return Canola
      case 'Corn':
        return Corn
      case 'Oats':
        return Oats
      case 'Soybeans':
        return Soybeans
      case 'Wheat':
        return Wheat
      default:
        null
    }
  }
  if (items.length === 0) return <div className="cards-container">nothing was found for your search</div>
  return (
    <div className="cards-container">
      {items.map(item => (
        <div className="card" key={item.id}>
          <img className="card__img" width="116px" src={logoDefiner(item.categoryName)} alt="product img" />
          <div className="card__info">
            <span className="category-name">{item.categoryName}</span>
            <span className="product-name">{item.name}</span>
            <span className="product-description">{item.description}</span>
            <div className="product-price">
              <span className="product-value">${item.price}</span>
              {item.discount && <span className="product-discount">Discount ${item.discount} per bag</span>}
            </div>
            <div className="product-extras">
              {item.isLimited && <span className="product-limited">Limited</span>}
              {item.isNew && <span className="product-new">New</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCards
