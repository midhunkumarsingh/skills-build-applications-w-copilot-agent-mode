import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Leaderboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <ResourcePage
      resource="leaderboard"
      title="Leaderboard"
      columns={["id", "user", "score", "rank"]}
      data={data}
    />
  )
}