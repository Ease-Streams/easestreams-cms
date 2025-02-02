'use client'
import React, { useState } from 'react'
import { useField } from '@payloadcms/ui'
import { Button, Input } from '@payloadcms/ui'
import axios from 'axios'

const ForwardEnquiry = ({ path, field }) => {
  const { value, setValue } = useField < string > { path }
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setValue(e.target.value)
  }

  const handleForwardEmail = async () => {
    try {
      const response = await axios.post('/api/forward-enquiry', {
        email,
        enquiry: value,
      })
      setMessage('Email forwarded successfully!')
    } catch (error) {
      setMessage('Failed to forward email.')
    }
  }

  return (
    <div className="field-type text-field">
      <label className="field-label">{field.label}</label>
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter email address"
        required
      />
      <Button onClick={handleForwardEmail}>Forward Email</Button>
      {message && <div>{message}</div>}
    </div>
  )
}

export default ForwardEnquiry
