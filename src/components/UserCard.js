import React from 'react'

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <div className="card-body">
        <img src={user.avatar_url} alt={user.login} />
        <h1>{user.name}</h1>
        <p>{user.company}</p>
        <p>{user.bio}</p>
      </div>
    </div>
  )
}

export default UserCard