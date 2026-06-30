import { Component } from 'react'
import ErrorState from './ErrorState.jsx'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: null }
  }

  static getDerivedStateFromError(err) {
    return { hasError: true, message: err?.message ?? 'An unexpected error occurred.' }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 24px' }}>
          <ErrorState message={this.state.message} />
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={() => this.setState({ hasError: false, message: null })}
              style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '8px 20px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
