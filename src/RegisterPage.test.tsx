import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import RegisterPage from './RegisterPage'
import React from 'react'
import '@testing-library/jest-dom'

describe('RegisterPage validate function', () => {
  it('should display an error if username is empty', () => {
    render(<RegisterPage />)

    const usernameInput = screen.getByLabelText(/username/i)
    const mobileInput = screen.getByLabelText(/mobile number/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(mobileInput, { target: { value: '1234567890' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/username is required/i)).toBeInTheDocument()
  })

  it('should display an error if username contains invalid characters', () => {
    render(<RegisterPage />)

    const usernameInput = screen.getByLabelText(/username/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(usernameInput, { target: { value: 'Invalid@Username' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/username must contain only lowercase letters and numbers/i)).toBeInTheDocument()
  })

  it('should display an error if mobile number is empty', () => {
    render(<RegisterPage />)

    const usernameInput = screen.getByLabelText(/username/i)
    const mobileInput = screen.getByLabelText(/mobile number/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(usernameInput, { target: { value: 'validusername' } })
    fireEvent.change(mobileInput, { target: { value: '' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/mobile number is required/i)).toBeInTheDocument()
  })

  it('should display an error if mobile number is not 10 digits', () => {
    render(<RegisterPage />)

    const mobileInput = screen.getByLabelText(/mobile number/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(mobileInput, { target: { value: '12345' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/mobile number must be 10 digits/i)).toBeInTheDocument()
  })

  it('should not display any errors if inputs are valid', () => {
    render(<RegisterPage />)

    const usernameInput = screen.getByLabelText(/username/i)
    const mobileInput = screen.getByLabelText(/mobile number/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(usernameInput, { target: { value: 'validusername' } })
    fireEvent.change(mobileInput, { target: { value: '1234567890' } })
    fireEvent.click(submitButton)

    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/mobile number is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/username must contain only lowercase letters and numbers/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/mobile number must be 10 digits/i)).not.toBeInTheDocument()
  })
})