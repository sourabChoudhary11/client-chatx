import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import UserItem from '../shared/UserItem';
import { MdClose } from 'react-icons/md';
import { setIsSearch } from '../../store/reducers/misc.js';
import { useDispatch } from 'react-redux';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../store/api/api.js';
import { useAsyncMutation } from '../../hooks/hook.jsx';



const Search = () => {

  const dispatch = useDispatch();
  const [findPeople, setFindPeople] = useState("")
  const [users, setUsers] = useState([]);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request....",{
      receiverId: id
    })
  }

  const handleSearchClose = () => {
    dispatch(setIsSearch(false));
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (findPeople) {
        searchUser(findPeople)
          .then(({ data }) => setUsers(data.users))
          .catch((err) => console.log(err))
      }
      if (!findPeople) setUsers([])
    }, 500)

    return () => {
      clearTimeout(timeoutId);
    }
  }, [findPeople])

  return (
    <section className='absolute w-screen h-screen top-0 left-0 z-10 flex items-center justify-center text-white bg-[#000000bf]'
    >
      <MdClose className='absolute top-2 right-4 z-10 text-white text-4xl cursor-pointer opacity-90' onClick={handleSearchClose} />

      <div className='w-[25rem] h-[50%] text-center rounded-md p-[3rem] flex flex-col space-y-3 bg-white text-black'>
        <h2 className='text-2xl font-extralight'>Find People</h2>
        <div className='w-full flex items-center justify-start space-x-2 border border-gray-400 rounded-md p-2'>
          <CiSearch className='text-2xl' />
          <input type="text" value={findPeople} onChange={(e) => setFindPeople(e.target.value)} required />
        </div>
        <ul className='overflow-x-auto'>
          {
            users.length > 0 && users.map((u, i) => (
              <li key={i}>
                <UserItem user={u} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )

}

export default Search