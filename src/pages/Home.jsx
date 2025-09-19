import { AiOutlineWechat } from "react-icons/ai";
import AppLayout from '../components/layout/AppLayout';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AiOutlineWechat className='text-purple-500 text-[5rem]' />
      <h6 className='text-extralight text-xl text-center'>Select Person To Start Chatting</h6>
    </div>
  )
}

export default AppLayout()(Home)