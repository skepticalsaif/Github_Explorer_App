import React from "react";

class Search extends React.Component {
  state = {
    username: ''
  }

  // 2-way mapping of the input field
  handleUserNameChange = e => {
    const value = e.target.value;
    this.setState({
      username: value
    })
  }

  render() {
    const { username } = this.state
    return <input value={username} onChange={this.handleUserNameChange} type="text" name="username" placeholder="Enter username" />
  }
}

export default Search;