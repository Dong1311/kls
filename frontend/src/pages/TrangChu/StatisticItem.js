import React from 'react'

const StatisticItem = ({ label, value }) => {
  return (
    <li
      style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>
        <b>{label}</b>
      </span>
      <span>{value}</span>
    </li>
  )
}

export default StatisticItem
