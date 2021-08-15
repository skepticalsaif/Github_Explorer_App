import React from 'react'

export default class TestComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    console.log('I am in Constructor')
  }

  static getDerivedStateFromProps(props, state) {
    console.log('I am in getDerivedStateFromProps')
    return { pageSize: props.pageSize }
  }

  componentDidMount() {
    console.log('I am in componentDidMount')
  }

  static getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('I am in getSnapshotBeforeUpdate', prevProps, prevState)
  }

  componentDidUpdate() {
    console.log('I am in componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('going to be removed')
  }

  render() {
    console.log('I am the render function')
    return "I am the render function"
  }
}
