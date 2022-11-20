import { useLocation } from "react-router-dom"
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core"

export interface INavMenuProps {
  onLogout: () => void
}
export const NavMenu = ({ onLogout }: INavMenuProps) => {
  const { pathname } = useLocation()

  return (
    <Menu>
      <MenuItem
        href="/students"
        icon="people"
        text="Students"
        active={pathname === "/students"}
      />
      <MenuItem
        href="/teachers"
        icon="learning"
        text="Teachers"
        active={pathname === "/teachers"}
      />
      <MenuItem
        href="/courses"
        icon="book"
        text="Courses"
        active={pathname === "/courses"}
      />
      <MenuDivider />
      <MenuItem
        intent="danger"
        icon="log-out"
        text="Logout"
        onClick={onLogout}
      />
    </Menu>
  )
}
