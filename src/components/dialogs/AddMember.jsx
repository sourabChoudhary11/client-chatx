import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useErrors } from '../../hooks/hook';
import { useMyFriendsQuery } from '../../store/api/api';
import { setIsAddMember } from '../../store/reducers/misc';
import UserItem from '../shared/UserItem';

const AddMember = ({ addMember, isLoadingAddMember, chatId }) => {

    const dispatch = useDispatch();
    const [selectedMembers, setSelectedMembers] = useState([]);

    const { data, isError, error, isLoading } = useMyFriendsQuery(chatId);

    const errors = [{ isError, error }];

    useErrors(errors);

    const selectUnselectMemberHandler = (id) => {
        setSelectedMembers(prev => prev.findIndex(i => i === id) !== -1 ? prev.filter(user => user !== id) : [...prev, id])
    }

    const closeHandler = () => {
        setSelectedMembers([]);
        dispatch(setIsAddMember(false));
    }

    const addMemberSubmitHandler = () => {
        closeHandler();
        addMember("Adding Members....", { chatId, members: selectedMembers });
    }

    return (
        <section className={`absolute w-screen h-screen top-0 left-0 z-10 flex items-center justify-center text-white bg-[#000000bf]`}>
            <MdClose className='absolute top-2 right-4 z-10 text-white text-4xl cursor-pointer opacity-90' onClick={closeHandler} />

            <div className='bg-white text-black flex flex-col justify-center p-[2rem] rounded-md space-y-2'>
                <h2 className='text-2xl font-extralight'>Add Member</h2>
                {
                    isLoading ? <Skeleton className='h-[2rem]' /> : <div>
                        {
                            data?.friends?.length > 0 ? data?.friends?.map((user) => (
                                <UserItem key={user._id} user={user} handler={selectUnselectMemberHandler} isAdded={selectedMembers.findIndex(i => i === user._id) !== -1 ? true : false} />
                            )) : <p className='text-xl my-3 text-center'>No Friends</p>
                        }
                    </div>
                }

                <div className='flex justify-evenly'>
                    <button onClick={closeHandler} className='text-md text-red-500 p-2 hover:cursor-pointer hover:opacity-70 uppercase' type="button">
                        Cancel
                    </button>
                    <button onClick={addMemberSubmitHandler} className='text-md rounded-md bg-green-700 text-white p-2 hover:cursor-pointer hover:opacity-70 uppercase' type="button" disabled={isLoadingAddMember}>
                        Submit Changes
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AddMember