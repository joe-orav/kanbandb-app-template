import React from "react"

const Button = ({ label, onClick, className }) => (
  <button className={`form-btn ${className}`} onClick={onClick}>
    {label}
  </button>
)

export default Button