import { Link } from 'react-router-dom'
import links from '../constanst/Navs'
const MainPage = () => {
    const minLinks = links.map(e => {
        return <Link
            to={`/${e.name}`}
            key={e.name}
            className='flex flex-col w-[49%] md:w-[32%] p-5  bg-white my-2 '
        >
            <img src={e.img}
                className='h-[50px] w-[60px] mb-3'

            />
            <span
                className='font-[600] mb-2 text-[#555]'
            >{e.name}</span>
            <p
                className='text-[12px] text-[#777]'
            >{e.des}</p>
        </Link>
    })
    return (
        <div
            className='w-full'
        >
            <h1
                className='font-[600] text-[#333333e7] text-[35px] px-10 text-center'
            >Every tool you need to work with PDFs in one place
            </h1>
            <h2
                className='text-center text-[#333] px-10 text-[20px]'
            >
                Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
            </h2>
            <div
                className='flex flex-wrap gap-2 px-5 mt-5 justify-between'
            >
                {minLinks}
            </div>
        </div>
    )
}

export default MainPage