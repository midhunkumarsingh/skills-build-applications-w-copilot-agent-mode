import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Teams() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/teams')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <ResourcePage
      resource="teams"
      title="Teams"
      columns={["id", "name", "members", "score"]}
      data={data}
    />
  )
}