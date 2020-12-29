import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { AuthPanelSt } from '../../styled/other-styled'
import { Link, Redirect } from 'react-router-dom';

type SignUpType = {
  err: string
  register: (username: string, password: string, cb: (isRegisteredSuccess: boolean) => void) => void
}

const SignUp:React.FC<SignUpType> = ({err, register}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isRegistered, setRegistered] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    register(username, password, (isRegisteredSuccess: boolean) => {
      setLoading(false)
      if (isRegisteredSuccess) {
        setRegistered(true)
      }
    })
  }

  if (isRegistered) {
    return <Redirect to='/signIn' />
  }

  return (
    <AuthPanelSt>
      {
        err && (
          <span className='err'>{err}</span>
        )
      }
      <TextField
        disabled={isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        id="outlined-basic standard-required standard-helperText"
        label="Username"
        helperText="More than 4 symbs"
        variant="outlined" />
      <TextField
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        id="outlined-basic standard-password-input standard-required standard-helperText"
        label="Password"
        type='password'
        autoComplete="current-password"
        helperText="More than 8 symbs"
        variant="outlined" />
      <Button onClick={handleRegister} disabled={isLoading} variant="contained" color="primary">
        Sign Up
      </Button>
      <Link to='/signin' >
        <Button disabled={isLoading} variant="outlined" color="primary">
          Sign In
        </Button>
      </Link>
    </AuthPanelSt>
  )
}

export default SignUp