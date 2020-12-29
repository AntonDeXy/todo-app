import { Link } from 'react-router-dom'
import { Link as LinkSt } from '@material-ui/core'

type ReactLinkWithStylesType = {
  path: string
  label: string
}

export const ReactLinkWithStyles:React.FC<ReactLinkWithStylesType> = ({path, label}) => {
  return (
    <Link to={path}><LinkSt>{label}</LinkSt></Link>
  )
} 