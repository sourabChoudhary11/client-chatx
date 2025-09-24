import Avatar from '@mui/material/Avatar';
import Drawer from "@mui/material/Drawer";
import Skeleton from '@mui/material/Skeleton';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDone, MdEdit } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../components/shared/AvatarCard';
import Title from '../components/shared/Title.jsx';
import UserItem from '../components/shared/UserItem';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useAddMembersInGroupMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../store/api/api';
import { setIsAddMember } from '../store/reducers/misc.js';

const ConfirmDeleteGroup = lazy(() => import('../components/dialogs/ConfirmDeleteGroup'));
const AddMember = lazy(() => import('../components/dialogs/AddMember'));


const Groups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const { isAddMember } = useSelector(state => state.misc);

  const [openGroupListMobile, setOpenGroupListMobile] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [creator, setCreator] = useState(null);
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);

  const myGroups = useMyGroupsQuery("");
  const chatDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

  const [renameGroup, isRenameGroupLoading] = useAsyncMutation(useRenameGroupMutation);
  const [addMember, isAddMemberLoading] = useAsyncMutation(useAddMembersInGroupMutation);
  const [removeMember, isRemoveMemberLoading] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    { isError: chatDetails.isError, error: chatDetails.error },
  ]
  useErrors(errors);

  useEffect(() => {
    const groupData = chatDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name)
      setUpdatedGroupName(groupData.chat.name)
      setCreator(groupData.chat.creator);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setMembers([]);
      setIsEdit(false);
    }
  }, [chatDetails.data])

  const navigateBack = () => {
    navigate("/");
  }

  const handleMobile = () => {
    setOpenGroupListMobile(prev => !prev);
  }

  const updateGroupName = async () => {
    setIsEdit(false);
    renameGroup("Updating Group Name....", { chatId, name: groupName });
  }

  const deleteGroupHandler = () => {
    setOpenConfirmDelete(false);
    deleteGroup("Deleting Group....", chatId);
    navigate("/groups");
  }

  const removeMemberHandler = (id) => {
    removeMember("Removing Member....", { userId: id, chatId });
  }

  useEffect(() => {
    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
      setOpenConfirmDelete(false);
      setOpenGroupListMobile(false);
    }
  }, [chatId])

  return (
    <div className='grid grid-cols-3 h-screen'>
      <Title title="ChatX - Groups" description="You can see details of groups created by you and modify it" />
      <div className='hidden xs:block xs:col-span-1 text-white overflow-auto'>
        {
          !myGroups?.isLoading && <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
        }
      </div>
      <div className='relative col-span-3 xs:col-span-2 flex flex-col justify-center items-center p-[2rem] space-y-4'>

        <span className='block xs:hidden fixed top-[2rem] right-[2rem] z-10'>
          <RxHamburgerMenu onClick={handleMobile} className='text-4xl p-2 hover:cursor-pointer hover:opacity-70' />
        </span>
        <FaArrowLeftLong onClick={navigateBack} className='absolute z-10 top-[2rem] left-[2rem] bg-black text-white rounded-full p-2 text-4xl hover:cursor-pointer hover:opacity-70' />

        {
          <Drawer open={openGroupListMobile} onClose={handleMobile}>
            <GroupList w={'70vw'} myGroups={myGroups?.data?.groups} chatId={chatId} />
          </Drawer>
        }

        {
          groupName ? (<>
            <div className='flex justify-center items-center space-x-2'>
              {
                isEdit ? <input value={groupName} onChange={(e) => setGroupName(e.target.value)} type='text' className='border border-gray-300' placeholder='edit group name...' /> : <h3 className='text-2xl'>{updatedGroupName}</h3>
              }
              {
                !isEdit ? <button type="button" onClick={() => setIsEdit(true)} disabled={isRenameGroupLoading}>
                  <MdEdit className='text-2xl hover:cursor-pointer hover:opacity-70' />
                </button> : <button type="button" onClick={updateGroupName} disabled={isRenameGroupLoading}>
                  <MdDone className='text-2xl hover:cursor-pointer hover:opacity-70' />
                </button>
              }
            </div>

            <div className="w-full p-3">

              <h3 className='text-left w-full my-3'>Admin</h3>
              {
                creator &&
                <div className='flex flex-col items-start w-full'>
                  <div className="flex justify-start space-x-2 items-center w-[100%]">
                    <Avatar src={creator.avatar} />
                    <h2>{creator.name}</h2>
                  </div>
                </div>
              }
            </div>

            <div>
              <h3 className='text-left w-full my-3'>Members</h3>
              {
                chatDetails.isLoading
                  ? members.map(m => <Skeleton className='h-[2rem]' />)
                  : isRemoveMemberLoading
                    ? members.map(m => <Skeleton className='h-[2rem]' />)
                    : members.map(user => <UserItem key={user._id} user={user} isAdded styling={'shadow shadow-gray-400'} handler={removeMemberHandler} />)
              }
            </div>

            <div className='flex flex-col xs:flex-row space-x-3'>
              <button type='button' className='hover:cursor-pointer p-3 bg-purple-700 text-white rounded-sm' onClick={() => dispatch(setIsAddMember(true))}>
                Add Member
              </button>
              <button onClick={() => setOpenConfirmDelete(true)} className='hover:cursor-pointer p-3 text-red-500'>
                Delete Group
              </button>
            </div>
          </>
          )
          : <h2 className="">Select Group to See Details or Modify it</h2>
        }
      </div>

      {
        isAddMember && <Suspense fallback={<h1>Loading...</h1>}>
          <AddMember addMember={addMember} isLoadingAddMember={isAddMemberLoading} chatId={chatId} />
        </Suspense>
      }

      {
        openConfirmDelete && <Suspense fallback={<h1>Loading...</h1>}>
          <ConfirmDeleteGroup openDialog={openConfirmDelete} closeDialog={() => setOpenConfirmDelete(false)} confirmDeletehandler={deleteGroupHandler} />
        </Suspense>
      }
    </div>
  )
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return <div
    style={{
      backgroundImage: "linear-gradient(to bottom, black, purple)",
      width: w,
      height: '100%'
    }}>
    {
      myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupItem key={group._id} group={group} chatId={chatId} />
        ))
      ) : <p className='text-2xl text-white p-3'>
        No Group
      </p>
    }
  </div>
}

const GroupItem = memo(({ group, chatId }) => {

  const { _id, name, avatar } = group;

  return <Link onClick={(e) => {
    if (chatId === _id) e.preventDefault();
  }} to={`/groups?group=${_id}`} className='text-white flex justify-between items-center p-2 hover:bg-gray-300'>
    <AvatarCard avatar={avatar} />
    <p>{name}</p>
  </Link>

})

export default Groups