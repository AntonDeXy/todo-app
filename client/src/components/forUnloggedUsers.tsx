import React from 'react'
import { ForUnloggedUsersSt } from '../styled/other-styled'
import { ReactLinkWithStyles } from './common'
import Spinner from "react-spinners/BounceLoader"
import { spinnerStyles } from '../App'

type ForUnloggedUsersType = {
  isLoading: boolean
}

const ForUnloggedUsers:React.FC<ForUnloggedUsersType> = ({isLoading}) => {
  return (
    <ForUnloggedUsersSt>
      <span>
        For using this app please
        <ReactLinkWithStyles path='/signIn' label='sign in' />
          or
        <ReactLinkWithStyles path='/signUp' label='sign up' />
      </span>
      {
        isLoading && (
          <Spinner css={spinnerStyles} size={55} color={'black'} />
        )
      }

    </ForUnloggedUsersSt>
  )
}


export default ForUnloggedUsers