import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import links from '../../../constanst/Navs'
import logo from '../../../assets/logo.png'
const MinNav = ({ hide }) => {
    const minLinks = links.map(e => {
        return <Link
            to={`/${e.name}`}
            key={e.name}
            onClick={hide}
            className='text-[#333] border-b-[1px] border-[#dedede] w-10/12 mx-auto my-1 pb-4 hover:scale-105 hover:text-black hover:border-[#aaa] flex items-center '
        >
            <img src={e.img}
                className='w-[30px] mr-5'

            />
            {e.name}
        </Link>
    })
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={hide}
                className='z-40 opacity-30 bg-[#333] fixed w-full h-screen top-0 left-0'
            ></motion.div>
            <motion.nav
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                exit={{ x: -1000 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="fixed h-screen left-0 top-0 bg-white w-6/12 flex flex-col py-7 z-[5000]"
            >
                <Link to={'/'}
                    className='border-b w-full flex justify-center border-b-[#777] mb-5'
                >
                    <img
                        className='h-[100px] '
                        src={logo} />
                </Link>
                {minLinks}
            </motion.nav>
        </>
    )
}

export default MinNav