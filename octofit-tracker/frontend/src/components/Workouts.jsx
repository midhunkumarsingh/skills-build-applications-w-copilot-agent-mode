import React from 'react'
import ResourcePage from './ResourcePage'

export default function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      columns={["id", "user", "name", "duration", "difficulty"]}
    />
  )
}
