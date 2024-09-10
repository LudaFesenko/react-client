import React, { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { CiLogout } from "react-icons/ci"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuth = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleIsLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bolt text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg-flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuth && (
            <Button
              className="gap-2"
              color="default"
              variant="flat"
              endContent={<CiLogout />}
              onClick={handleIsLogout}
            >
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
