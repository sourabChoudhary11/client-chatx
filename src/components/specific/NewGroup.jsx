import { memo, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { MdClose } from "react-icons/md"
import { useDispatch } from "react-redux"
import { useAsyncMutation, useErrors } from "../../hooks/hook"
import { useMyFriendsQuery, useNewGroupMutation } from "../../store/api/api"
import { setIsNewGroup } from "../../store/reducers/misc"
import UserItem from "../shared/UserItem"

const NewGroup = () => {
  const dispatch = useDispatch();
  const { clearErrors, register, handleSubmit, watch, getValues, reset, control, formState: { errors }, setError } = useForm({
    defaultValues: {
      group_name: "",
      members: []
    }
  });
  const { append, remove } = useFieldArray({
    name: "members",
    control
  });

  const { isError, error, isLoading, data } = useMyFriendsQuery("");
  const [newGroup] = useAsyncMutation(useNewGroupMutation);

  useErrors([{ isError, error }]);

  const selectUnselectMemberHandler = (id) => {
    const alreadyExist = getValues().members.findIndex(i => i.id === id)
    if (alreadyExist !== -1) return remove(alreadyExist)
    append({ id })
  }

  const submitHandler = async (data) => {
    await newGroup("Creating Group....", {
      name: data.group_name,
      members: data.members.map(m => m.id)
    });
    reset();
  }

  const handleNewGroupClose = () => {
    dispatch(setIsNewGroup(false));
  }


  useEffect(() => {
    if (getValues("members").length >= 2) {
      clearErrors("members");
    } else {
      setError("members", {
        type: "minLength",
        message: "Atleast Two Members Are Needed"
      })
    }
  }, [getValues("members")])

  return (
    <section className='absolute w-screen h-screen top-0 left-0 z-10 flex items-center justify-center text-white bg-[#000000bf]'
    >
      <MdClose className='absolute top-2 right-4 z-10 text-white text-4xl cursor-pointer opacity-90' onClick={handleNewGroupClose} />

      <form onSubmit={handleSubmit(submitHandler)} className='w-[30rem] text-center rounded-md p-[3rem] flex flex-col space-y-3 bg-white text-black'>
        <h2 className='text-2xl font-extralight'>Create Group</h2>
        <h2 className="text-left text-xl">Group Name</h2>
        <input {...register("group_name", { required: "Group Name Required", validate: (value => value.trim() !== "" || "Default/empty name allowed nahi hai!") })} className="border border-gray-400 rounded-xs p-2" type="text" autoFocus={false} />

        {
          errors.group_name && <p className='text-red-500 text-left'>{errors.group_name.message}</p>
        }

        <h3 className='text-xl text-left font-extralight'>Members</h3>
        {
          !isLoading && <div>
            {
              data?.friends.length > 0 && data?.friends.map((user, index) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectUnselectMemberHandler}
                  isAdded={getValues().members.findIndex(i => i.id === user._id) !== -1 ? true : false}
                />
              ))
            }
          </div>
        }

        {
          errors.members && <p className='text-red-500 text-left'>{errors.members.message}</p>
        }

        <div className='flex space-x-3'>
          <button type="button" className='px-5 py-2 rounded-md text-red-500 cursor-pointer hover:opacity-50' onClick={handleNewGroupClose} >
            Cancel
          </button>

          <button className='px-5 py-2 rounded-md bg-green-500 text-white cursor-pointer hover:opacity-50 '>
            Create
          </button>
        </div>
      </form>
    </section>
  )
}

export default memo(NewGroup)