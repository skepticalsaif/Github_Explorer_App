import React from 'react';
import './App.css';
import Search from './components/Search';
import UserCard from './components/UserCard';
import RepoCard from './components/RepoCard';
import { withRouter } from 'react-router-dom';

//const PAGE_SIZE = 10;

class App extends React.Component {
  state = {
    user: null,
    reposit: [],
    userDataError: null,
    repositError: null,
    loading: false,
    pageSize: 10, // earlier it was a string = '10'
    page: 1,
    fetchingRepos: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    const { match } = this.props

    if (match.params.username) this.fetchData(match.params.username)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const currentScroll = Math.round(window.scrollY)
    const maxScroll = window.scrollMaxY
    const { page, pageSize, user } = this.state

    if (user && maxScroll - currentScroll <= 100 && (page - 1) * pageSize < user.public_repos)
      this.loadPage()
  }

  fetchUserData = async (username) => {
    const res = await fetch(
      `https://api.github.com/users/${username}`
    )
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      // saving the data in the internal state
      return { data }
    }
    const error = (await res.json()).message
    return { error }
  }

  fetchReposit = async (username) => {
    const { pageSize, page } = this.state;
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`
    )
    if (res.ok) {
      const data = await res.json()
      return { data }
    }
    const error = (await res.json()).message
    return { error }
  }

  fetchData = async (username, page) => {
    this.setState({ loading: true }, async () => {
      // fetch github api
      try {
        const [user, reposit] = await Promise.all(
          [
            this.fetchUserData(username),
            this.fetchReposit(username)
          ]
        );
        if (user.data !== undefined && reposit.data !== undefined) {
          return this.setState({
            user: user.data,
            reposit: reposit.data,
            page: 2,
            loading: false
          })
        }
        this.setState({
          userDataError: user.error,
          repositError: reposit.error,
          loading: false
        })
      } catch (err) {
        console.log(err)

        this.setState({
          error: "There was some error !",
          loading: false
        })
      }
    })
  }

  loadPage = async () => {
    if (this.state.fetchingRepos === true) return;

    this.setState({ fetchingRepos: true }, async () => {
      const { data } = await this.fetchReposit(this.state.user.login)
      if (data)
        this.setState(state => ({
          reposit: [...state.reposit, ...data],
          page: state.page + 1,
          fetchingRepos: false
        }));
    });
  }

  // handlePageChange = (page) => {
  //   this.setState({ page }, () => this.loadPage());
  // }

  // handlePageSizeChange = (e) => {
  //   this.setState({
  //     pageSize: e.target.value,
  //   }, () => this.loadPage())
  // }

  render() {
    const { userDataError, repositError, loading, user, reposit, //pageSize 
    } = this.state

    const { match } = this.props

    const renderRepos = !loading && !repositError && !!reposit.length;

    return (
      <>
        <Search
          // fetchData={this.fetchData}
          username={match.params.username}
        />
        <div className="container">
          <div className="text-center pt-5">
            {(loading && (<p>Loading...</p>))}
            {userDataError && <p className="text-danger">{userDataError}</p>}
          </div>
          {!loading && !userDataError && user && <UserCard user={user} />}
          {repositError && <p className="text-danger">{repositError}</p>}

          {renderRepos && (
            <React.Fragment>
              {/* <div className="mb-4">
                {[...new Array(Math.ceil(user.public_repos / pageSize))].map(
                  (_, index) => (
                    <button
                      key={index}
                      className="btn btn-success m-2"
                      onClick={() => this.handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  ),
                )}
              </div> */}

              {/* <div className="d-inline-block mb-4">
                <select
                  className="form-control"
                  value={pageSize}
                  onChange={this.handlePageSizeChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div> */}

              {
                reposit.map(repo => <RepoCard key={repo.id} repo={repo} />)
              }

            </React.Fragment>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(App);
