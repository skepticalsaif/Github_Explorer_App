import React from 'react'

const RepoCard = ({ repo }) => {
  return (
    <div className="card">
      <div className="card-body">
        <a href={repo.html_url} rel="noreferrer" target="_blank">
          <h3>{repo.name}</h3>
        </a>
        <p><strong>Stars: </strong>{repo.stargazers_count}</p>
        <p><strong>Watchers: </strong>{repo.Watchers_count}</p>
      </div>
    </div>
  )

}

export default RepoCard;