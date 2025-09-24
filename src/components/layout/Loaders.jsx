import { AiOutlineWechat } from 'react-icons/ai';

const AppLayoutLoader = () => {
    return (
        <div className='h-screen box-border animate-pulse'>
            <div className='h-[4rem] bg-gray-300 rounded-md'></div>
            <div className='grid grid-cols-12 gap-3 h-[calc(100vh-4rem)] p-4'>
                <div className='hidden xs:flex xs:flex-col xs:space-y-2 xs:col-span-4 md:col-span-4'>
                    {
                        Array.from([1, 2, 3, 4, 5]).map((e, i) => (
                            <div key={i} className='bg-gray-300 rounded-md h-[4rem] flex items-center justify-start'><span className='w-[3rem] h-[3rem] ml-[1rem] rounded-4xl bg-white'></span></div>
                        ))
                    }
                </div>
                <div className='flex flex-col justify-end col-span-12 xs:col-span-8 md:col-span-4'>
                    <div className='bg-gray-300 rounded-md h-[4rem]'></div>
                </div>
                <div className='bg-gray-300 rounded-md hidden md:block md:col-span-4'></div>
            </div>
        </div>
    )
}

const LogoLoader = ()=>{

    return <div className='absolute top-0 left-0 z-30 w-screen h-screen flex flex-col space-y-3 justify-center items-center bg-white'>
        <AiOutlineWechat className='animate-pulse text-purple-500 text-[6rem] md:text-[10rem]' />
    </div>
}

export {
    AppLayoutLoader,
    LogoLoader
}