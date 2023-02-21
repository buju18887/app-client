import { beforeEach, fireEvent, render, screen } from 'vitest'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Login from '../pages/Login'

const localStorageMock = (() => {
    let store = {}
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString()
      },
      removeItem: (key) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  })()
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })


describe('Login component', () => {
  const mockStore = configureStore([])

  it('renders the Login component correctly', () => {
    const store = mockStore({ auth: { user: null, isError: false, isSuccess: false, message: '' } })
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
  })

  it('updates the email field when typing in it', () => {
    const store = mockStore({ auth: { user: null, isError: false, isSuccess: false, message: '' } })
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(emailInput.value).toBe('test@example.com')
  })

  it('updates the password field when typing in it', () => {
    const store = mockStore({ auth: { user: null, isError: false, isSuccess: false, message: '' } })
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    const passwordInput = screen.getByLabelText('Password')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(passwordInput.value).toBe('password123')
  })

  it('shows an error message when submitting an empty form', () => {
    const store = mockStore({ auth: { user: null, isError: false, isSuccess: false, message: '' } })
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })
})
