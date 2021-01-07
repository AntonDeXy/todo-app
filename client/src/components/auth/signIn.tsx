import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { FormEvent, useState } from 'react'
import { AuthPanelSt } from '../../styled/other-styled'
import { Link } from 'react-router-dom'
import Spinner from "react-spinners/BounceLoader"
import { spinnerStyles } from '../../App'

type SignInType = {
  err: string
  login: (username: string, password: string, cb: () => void) => void
}

const SignIn: React.FC<SignInType> = ({ err, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    login(username, password, () => {
      setLoading(false)
    })
  }

  return (
    <AuthPanelSt onSubmit={handleLogin}>
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
      <Button type='submit' disabled={isLoading} variant="contained" color="primary">
        Sign In
        <Spinner css={spinnerStyles} size={25} color={'white'} loading={isLoading} />
      </Button>
      <Link to='/signUp' >
        <Button disabled={isLoading} variant="outlined" color="primary">
          Sign Up
      </Button>
      </Link>
    </AuthPanelSt>
  )
}

export default SignIn