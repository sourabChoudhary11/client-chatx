import { IoWarning } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Title from '../components/shared/Title'

const PageNotFound = () => {
  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center space-y-4'>
      <Title title="ChatX - 404 Not Found" />
      <IoWarning className="text-[4rem]" />
      <h3 className="text-[2rem] sm:text-[4rem]">404 Not Found</h3>
      <Link to="/" className='underline text-blue-500 hover:opacity-70'>
      Go to Homepage
      </Link>
    </div>
  )
}

export default PageNotFound