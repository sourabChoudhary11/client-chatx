import { memo } from 'react'
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5"
import { transformImage } from '../../lib/features';

const UserItem = ({user, handler, handlerIsLoading,isAdded=false, styling=""}) => {

    const {_id, name, avatar} = user;

    return (
            <div className={`${styling} bg-gray-300 rounded-md flex items-center justify-between my-3 p-2`}>
                <img className='w-[3rem] h-[3rem] object-cover border-2 border-white rounded-full' src={transformImage(avatar)} />
                <p className='w-[10rem] grow truncate text-left text-[1rem] px-4'>
                    {name}
                </p>
                <button type='button' className={`text-4xl cursor-pointer hover:opacity-50`} onClick={()=>handler(_id)} disabled={handlerIsLoading}>
                    {
                       isAdded? <IoRemoveCircle />:<IoAddCircle />
                    }
                </button>
            </div>
    )
}

export default memo(UserItem)