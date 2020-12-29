import React from 'react'
import Link from '@material-ui/core/Link'
import { HeaderSt } from '../styled/other-styled'

type HeaderType = {
  username: string
  logout: () => void
}

const Header:React.FC<HeaderType> = ({username, logout}) => {
  return (
    <HeaderSt>
      <h3>Hey, {username}</h3>
      <Link onClick={logout}>LogOut</Link>
    </HeaderSt>
  )
}

export default Header