import { NavLink } from "react-router-dom"
import { Navbar, Button, Position } from "@blueprintjs/core"
import { Popover2 } from "@blueprintjs/popover2"

import { useAuth } from "@/context/AuthContext"
import { useWindowSize } from "@/hooks/useWindowResize"
import { NavMenu } from "./NavMenu"

export const NavBar = () => {
  const { onLogout } = useAuth()
  const { width } = useWindowSize()

  return (
    <Navbar fixedToTop>
      <Navbar.Group align="left">
        <Navbar.Heading>
          <NavButton to="/" text="SophosU" style={ { fontSize: "1.5rem" } } />
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align="right">
        {
          width > 620
            ? (
              <>
                <NavButton to="/students" text="Students" icon="people" />
                <NavButton to="/teachers" text="Teachers" icon="learning" />
                <NavButton to="/courses" text="Courses" icon="book" />
                <Navbar.Divider />
                <Button
                  minimal
                  intent="danger"
                  icon="log-out"
                  onClick={ onLogout }
                />
              </>
            ) : (
              <>
                <Popover2
                  minimal
                  content={ <NavMenu onLogout={ onLogout } />}
                  position={Position.BOTTOM_RIGHT}
                >
                  <Button minimal icon="menu" />
                </Popover2>
              </>
            )
        }
      </Navbar.Group>
    </Navbar>
  )
}

interface INavButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string
  text?: string
  icon?: string
}
const NavButton = ({ to, text, icon, ...props }: INavButtonProps) => {
  return (
    <NavLink
      to={ to }
      { ...props }
      className={
        ({ isActive }) => (isActive ? "bp4-active " : "") +
          "bp4-button bp4-minimal bp4-large" +
          (icon ? ` bp4-icon-${icon}` : "") +
          (text ? "" : " bp4-icon-only") +
          (to === "/" ? " bp4-intent-primary" : "") +
          (to === "/logout" ? " bp4-intent-danger" : "")
      }
    >{ text }</NavLink>
  )
}
