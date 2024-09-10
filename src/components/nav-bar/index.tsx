import React from "react"
import { NavButton } from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUser } from "react-icons/fi"
import { FaUser } from "react-icons/fa"

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FiUser />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUser />}>
            Подписчики
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
