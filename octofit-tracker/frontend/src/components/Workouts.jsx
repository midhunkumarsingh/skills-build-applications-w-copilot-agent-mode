import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Workouts() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/workouts')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      columns={["id", "user", "name", "duration", "difficulty"]}
      data={data}
    />
  )
}