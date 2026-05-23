import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Activities() {
  const [data, setData] = useState([])



  return (
    <ResourcePage
      resource="activities"
      title="Activities"
      columns={["id", "user", "activityType", "duration", "timestamp"]}
      data={data}
    />
  )
}