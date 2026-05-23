import React, { useEffect, useState } from 'react'
import ResourcePage from './ResourcePage'

export default function Users() {
  const [data, setData] = useState([])


  return (
    <ResourcePage
      resource="users"
      title="Users"
      columns={["id", "username", "email", "role"]}
      data={data}
    />
  )
}