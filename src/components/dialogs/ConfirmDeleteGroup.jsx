const ConfirmDeleteGroup = ({openDialog,closeDialog, confirmDeletehandler}) => {
  return (
     <section className={`${openDialog?'block':'hidden'} absolute w-screen h-screen top-0 left-0 z-10 flex items-center justify-center text-white bg-[#000000bf]`}>
      <div className='bg-white text-black flex flex-col items-end justify-center p-[1rem] rounded-md space-y-3'>
        <h2 className='text-2xl font-medium self-start'>Confirm Delete</h2>
        <p>Are your sure you want to delete group?</p>
        <div className='flex justify-end  w-full'>
          <button onClick={closeDialog} type='button' className='hover:cursor-pointer p-3 text-blue-500'>
            No
          </button>
          <button onClick={confirmDeletehandler} type='button' className='hover:cursor-pointer p-3 text-red-500'>
            Yes
          </button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmDeleteGroup