import React from "react"

const StatusSelectField = ({ statuses, value, onChange, className }) => (
  <select
    className={`form-field ${className}`}
    value={value}
    onChange={onChange}
  >
    {statuses.map((status) => (
      <option key={status.code} value={status.code}>
        {status.label}
      </option>
    ))}
  </select>
)

export default StatusSelectField