import React from 'react'
import ResourcePage from './ResourcePage'

export default function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
      title="Leaderboard"
      columns={["id", "user", "score", "rank"]}
    />
  )
}
