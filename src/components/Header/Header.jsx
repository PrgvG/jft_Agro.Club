import React from 'react'
import logo from './Imgs/SearchLogo.svg'
import './Header.css'

// простой хеддер с инпутом
function Header({ handler }) {
  return (
    <header className="header">
      <div className="logo">Products</div>
      <div className="search">
        <img className="search__logo" src={logo} />
        <input className="input" type="text" placeholder="Search among products" onChange={handler} />
      </div>
    </header>
  )
}

export default Header
