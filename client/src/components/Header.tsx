import React from 'react'
import Link from '@material-ui/core/Link'
import { HeaderSt } from '../styled/other-styled'
import { motion } from 'framer-motion'

type HeaderType = {
  username: string
  logout: () => void
}

const Header: React.FC<HeaderType> = ({ username, logout }) => {
  return (
    <HeaderSt>
      <motion.div
        className='animation-wrapper'
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3>Hey, {username}</h3>
        <Link onClick={logout}>LogOut</Link>
      </motion.div>
    </HeaderSt>
  )
}

export default Header