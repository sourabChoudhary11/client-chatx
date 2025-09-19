import React, { memo, useEffect, useState } from 'react'
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setIsNotification } from '../../store/reducers/misc';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../store/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import Skeleton from '@mui/material/Skeleton';

const Notifications = () => {

  const dispatch = useDispatch();
  const {data, isLoading, error, isError} = useGetNotificationsQuery();

  const [acceptFriendRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptFriendRequest("",{ requestId:_id, accept });
    dispatch(setIsNotification(false));
  }

  const handleNotificationClose = () => {
    dispatch(setIsNotification(false));
  }

  useErrors([{error,isError}])

  return (
    <section className='absolute w-screen h-screen top-0 left-0 z-10 flex items-center justify-center text-white bg-[#000000bf]'
    >

      <MdClose className='absolute top-2 right-4 z-10 text-white text-4xl cursor-pointer opacity-90' onClick={handleNotificationClose} />

      <div className='w-[30rem] text-center rounded-md p-[3rem] flex flex-col space-y-3 bg-white text-black'>
        <h2 className='text-2xl font-extralight'>Notifications</h2>
        {
          isLoading ? <Skeleton width={"100%"} height={"3rem"} /> : <>
          {
          data?.requests?.length > 0 ? data.requests.map(i => (
            <NotificationItem
              key={i._id}
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
            />
          )) : <p>
            No Notifications
          </p>
        }
          </>
        }
      </div>
    </section>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <div className='bg-gray-300 rounded-md flex items-start my-1 p-2'>

      <img className='min-w-[3rem] h-[3rem] object-cover border-2 border-white rounded-full' src={sender.avatar?.length > 0 ? sender.avatar : 'https://www.w3schools.com/html/img_girl.jpg'} />
      <div className='flex flex-col items-start px-4'>

        <p className='grow truncate text-left text-wrap'>
          <span className='font-bold'>{sender.name}</span>{` `}
          send you a request
        </p>
        <div className='flex space-x-3'>
          <button className='rounded-md text-green-500 cursor-pointer hover:opacity-50' onClick={() => handler({ _id, accept: true })} >
            <TiTick className='inline-block text-2xl' /> Accept
          </button>

          <button className='rounded-md text-red-500 cursor-pointer hover:opacity-50' onClick={() => handler({ _id, accept: false })} >
            <ImCross className='inline-block' /> Reject
          </button>
        </div>

      </div>

    </div>
  )
})

export default Notifications