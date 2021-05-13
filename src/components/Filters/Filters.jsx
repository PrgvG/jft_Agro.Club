import React from 'react'
import './Filters.css'
import logo from './imgs/FiltersLogo.svg'
import check from './imgs/check.svg'

function Filters({ clearHandler, handler, categories, isLimitedHandler, isNewHandler, items, filter }) {
  return (
    <div className="container">
      <div className="title">
        <img className="title__logo" src={logo} />
        <div className="title__text">Filters</div>
      </div>
      <div className="options">
        <fieldset className="options__block">
          <legend className="legend">Category</legend>
          <button
            className={filter.category.length === 0 ? 'button button--checked' : 'button'}
            type="button"
            onClick={clearHandler}
          >
            All
          </button>
          {categories.map(it => {
            return (
              <button
                className={filter.category.find(type => type === it.name) ? 'button button--checked' : 'button'}
                name={it.name}
                key={it.id}
                type="button"
                onClick={handler}
                disabled={items.find(item => item.categoryName === it.name) ? false : true}
              >
                {it.name}
              </button>
            )
          })}
        </fieldset>
        <fieldset className="options__block">
          <legend className="legend">Status</legend>
          <label className="check-box__label" htmlFor="is_limited">
            <span className="check-box__sqr">{filter.isLimited && <img src={check} />}</span>
            Limited
          </label>
          <input
            className="check-box"
            id="is_limited"
            type="checkbox"
            onChange={isLimitedHandler}
            checked={filter.isLimited}
          />
          <label className="check-box__label" htmlFor="is_new">
            <span className="check-box__sqr">{filter.isNew && <img src={check} />}</span>
            New
          </label>
          <input className="check-box" id="is_new" type="checkbox" onChange={isNewHandler} checked={filter.isNew} />
        </fieldset>
      </div>
    </div>
  )
}

export default Filters
