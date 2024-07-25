import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'
import { FaBars } from "react-icons/fa"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import MinNav from "./Navs/MinNav"
import { RxAvatar } from "react-icons/rx"
const Header = () => {
    const [show, setshow] = useState(false)
    const hide = () => {
        setshow(false)
    }
    return (
        <header
            className="flex px-3  py-2 border border-b-[#aaaa] justify-between items-center bg-white"
        >
            <FaBars size={30}
                onClick={() => setshow(true)}
            />
            <AnimatePresence>
                {show && <MinNav hide={hide} />}
            </AnimatePresence>
            <Link to={'/'}
                className="flex justify-center"
            >
                <img src={logo}
                    className="w-[120px]"
                />
            </Link>
            <RxAvatar size={33} />




        </header>
    )
}

export default Header