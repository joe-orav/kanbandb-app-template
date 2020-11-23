import React from "react"

const InputField = ({ value, className, onChange, placeholder }) => (
  <input
    type="text"
    className={`form-field ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)

export default InputField