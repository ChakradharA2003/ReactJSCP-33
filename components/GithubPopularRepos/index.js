import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem/index'
import RepositoryItem from '../RepositoryItem/index'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    languages: languageFiltersData[0].id,
    popularRepos: [],
    currentApiStatus: apiStatusConstants.loading,
  }

  componentDidMount() {
    this.renderRepositoryItems()
  }

  onChangeLanguages = id => {
    this.setState({languages: id},
    this.renderRepositoryItems)
  }

  renderRepositoryItems = async () => {
    this.setState({currentApiStatus: apiStatusConstants.loading})
    const {languages} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languages}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.popular_repos)
      const updatedData = data.popular_repos.map(repo => ({
        avatarUrl: repo.avatar_url,
        forksCount: repo.forks_count,
        id: repo.id,
        issuesCount: repo.issues_count,
        name: repo.name,
        starsCount: repo.stars_count,
      }))
      console.log(updatedData)
      this.setState({
        popularRepos: updatedData,
        currentApiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({currentApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
    </div>
  )

  renderSuccessView = () => {
    const {popularRepos} = this.state
    return (
      <ul className="popular-repos">
        {popularRepos.map(repo => (
          <RepositoryItem key={repo.id} repoDetails={repo} />
        ))}
      </ul>
    )
  }

  currentStatusView = () => {
    const {currentApiStatus} = this.state
    switch (currentApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {languages} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="filter-list">
          {languageFiltersData.map(lang => (
            <LanguageFilterItem
              key={lang.id}
              language={lang.language}
              id={lang.id}
              selectedLanguage={languages === lang.id}
              onChangeLanguages={this.onChangeLanguages}
            />
          ))}
        </ul>

        {this.currentStatusView()}
      </div>
    )
  }
}
export default GithubPopularRepos
