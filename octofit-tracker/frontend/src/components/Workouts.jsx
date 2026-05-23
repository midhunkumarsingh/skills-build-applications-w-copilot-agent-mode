import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Workouts() {
  const [data, setData] = useState([])


  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      columns={["id", "user", "name", "duration", "difficulty"]}
      data={data}
    />
  )
}