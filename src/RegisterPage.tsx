import { useState } from 'react'

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', mobile: '' })
  const [errors, setErrors] = useState({ username: '', mobile: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    let isValid = true
    const newErrors = { username: '', mobile: '' }

    // Username validation: only lowercase letters and numbers
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    } else if (!/^[a-z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Username must contain only lowercase letters and numbers'
      isValid = false
    }

    // Mobile validation: must be 10 digits
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
      isValid = false
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      alert('Form submitted successfully!')
      setFormData({ username: '', mobile: '' }) // Reset form
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage