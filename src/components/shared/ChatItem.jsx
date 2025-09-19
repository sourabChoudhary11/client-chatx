import React, { memo } from 'react'
import { FaCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AvatarCard from './AvatarCard'
import { motion } from "framer-motion"

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {

    const contextHandler = (e) => {
        e.preventDefault();
        handleDeleteChat(e, _id, groupChat)
    }

    return <Link
        onContextMenu={contextHandler}
        className='m-0'
        to={`/chat/${_id}`}
    >
        <motion.div
            initial={{
                y: "-100%"
            }}
            animate={{
                y: 0,
                animationDelay: index * 0.2,
            }}
            className={`m-1 rounded-md p-[1rem] flex items-center justify-between gap-[1rem] ${sameSender ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'} relative`}
        >
            <div className='relative flex items-center space-x-2'>
                <AvatarCard avatar={avatar} />
                {
                    isOnline && <FaCircle className='absolute bottom-0 left-0 text-green-500 border-2 border-white rounded-full text-sm' />
                }
            </div>
            <div className='flex flex-col'>
                <p>{name}</p>
                {
                    newMessageAlert && <p className='text-sm text-gray-500'>
                        {newMessageAlert.count} New Message
                    </p>
                }
            </div>
        </motion.div>
    </Link>
}

export default memo(ChatItem)