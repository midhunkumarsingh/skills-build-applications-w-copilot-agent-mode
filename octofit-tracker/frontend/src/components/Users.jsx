import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Users() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <ResourcePage
      resource="users"
      title="Users"
      columns={["id", "username", "email", "role"]}
      data={data}
    />
  )
}