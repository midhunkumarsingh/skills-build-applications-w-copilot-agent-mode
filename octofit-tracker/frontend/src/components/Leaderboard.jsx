import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Leaderboard() {
  const [data, setData] = useState([])



  return (
    <ResourcePage
      resource="leaderboard"
      title="Leaderboard"
      columns={["id", "user", "score", "rank"]}
      data={data}
    />
  )
}