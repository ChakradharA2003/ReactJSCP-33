// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, name, forksCount, starsCount, issuesCount} = repoDetails
  console.log(avatarUrl)
  return (
    <li className="repo">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="name">{name}</h1>
      <ul className="count-lists">
        <li className="list">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="counts-images"
          />
          <p className="counts">{starsCount} stars</p>
        </li>
        <li className="list">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="counts-images"
          />
          <p className="counts">{forksCount} forks</p>
        </li>
        <li className="list">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="counts-images"
          />
          <p className="counts">{issuesCount} open issues</p>
        </li>
      </ul>
    </li>
  )
}
export default RepositoryItem
