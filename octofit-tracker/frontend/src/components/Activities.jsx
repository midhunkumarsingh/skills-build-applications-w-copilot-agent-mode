import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Activities() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/activities')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <ResourcePage
      resource="activities"
      title="Activities"
      columns={["id", "user", "activityType", "duration", "timestamp"]}
      data={data}
    />
  )
}