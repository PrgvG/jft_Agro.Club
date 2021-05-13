import React from 'react'
import './Error.css'

function Error({ handler }) {
  return (
    <div className="error">
      Something went wrong &nbsp;
      <button className="error-button" type="button" onClick={handler}>
        try again
      </button>
    </div>
  )
}

export default Error
