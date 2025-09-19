import React, { memo } from 'react'
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5"

const UserItem = ({user, handler, handlerIsLoading,isAdded=false, styling=""}) => {

    const {_id, name, avatar} = user;

    return (
            <div className={`${styling} bg-gray-300 rounded-md flex items-center justify-between my-3 p-2`}>
                <img className='w-[3rem] h-[3rem] object-cover border-2 border-white rounded-full' src={avatar} />
                <p className='w-[10rem] grow truncate text-left text-[1rem] px-4'>
                    {name?name:"UserName skdjf sksd kf sdk fkjsd kj sfdkkfs dk fds "}
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