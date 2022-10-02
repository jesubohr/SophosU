import { NavLink } from "react-router-dom"
import { Navbar } from "@blueprintjs/core"

export const NavBar = () => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group align="left">
        <Navbar.Heading>
          <NavButton to="/" text="SophosU" style={ { fontSize: "1.5rem" } } />
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align="right">
        <NavButton to="/students" text="Students" icon="people" />
        <NavButton to="/teachers" text="Teachers" icon="learning" />
        <NavButton to="/courses" text="Courses" icon="book" />
        <Navbar.Divider />
        <NavButton to="/logout" icon="log-out" />
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
      to={to}
      {...props}
      className={
        ({ isActive }) => (isActive ? "bp4-active " : "") +
        "bp4-button bp4-minimal bp4-large" +
        (icon ? ` bp4-icon-${icon}` : "") +
        (text ? "" : " bp4-icon-only") +
        (to === "/" ? " bp4-intent-primary" : "") +
        (to === "/logout" ? " bp4-intent-danger" : "")
      }
    >{text}</NavLink>
  )
}
