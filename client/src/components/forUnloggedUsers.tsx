import React from 'react'
import { ForUnloggedUsersSt } from '../styled/other-styled';
import { ReactLinkWithStyles } from './common';

const ForUnloggedUsers = () => {
  return (
    <ForUnloggedUsersSt>
      <span>
        For using this app please
        <ReactLinkWithStyles path='/signIn' label='sign in' />
          or
        <ReactLinkWithStyles path='/signUp' label='sign up' />
      </span>
    </ForUnloggedUsersSt>
  )
}


export default ForUnloggedUsers