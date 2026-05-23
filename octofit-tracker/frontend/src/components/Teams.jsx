import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Teams() {
  const [data, setData] = useState([])

  return (
    <ResourcePage
      resource="teams"
      title="Teams"
      columns={["id", "name", "members", "score"]}
      data={data}
    />
  )
}