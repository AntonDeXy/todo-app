import { Link } from 'react-router-dom'

type ReactLinkWithStylesType = {
  path: string
  label: string
}

export const ReactLinkWithStyles:React.FC<ReactLinkWithStylesType> = ({path, label}) => {
  return (
    <Link className='link-styled' to={path}>{label}</Link>
  )
} 