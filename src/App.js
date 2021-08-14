import react from 'react';
import './App.css';
import Search from './components/Search';
import UserCard from './components/UserCard';

class App extends react.Component {
  state = {
    user: null,
    error: null,
    loading: false
  }

  fetchUserData = async username => {
    this.setState({ loading: true }, async () => {
      // fetch github api
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (res.ok) {
          const data = await res.json()
          console.log(data)
          // saving the data in the internal state
          return this.setState({
            user: data,
            loading: false
          })
        }
        const error = (await res.json()).message
        this.setState({
          error,
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

  render() {
    const { error, loading, user } = this.state
    return (
      <div>
        <Search fetchData={this.fetchUserData} />
        <div className="text-center pt-5">
          {(loading && (<p>Loading...</p>))}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && user && <UserCard user={user} />}
        </div>
      </div>
    )
  }
}

export default App;
