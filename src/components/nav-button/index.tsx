import { Button } from "../button"
import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode
  href: string
  icon: JSX.Element
}

export const NavButton: React.FC<Props> = ({ children, href, icon }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
