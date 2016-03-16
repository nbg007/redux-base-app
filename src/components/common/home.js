import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div>
      <h3>Home</h3>
      <Link to='/admin'>Admin</Link>
      {' '}
      <Link to='/async'>Async component</Link>
    </div>
  )
}

export default Home
