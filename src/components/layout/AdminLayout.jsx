import axios from "axios";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDashboard, MdGroups, MdManageAccounts, MdMessage } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { adminNotExists } from '../../store/reducers/auth';
import { server } from "../../constants/config";
import toast from "react-hot-toast";



const AdminLayout = ({ children }) => {
    const {isAdmin} = useSelector(state=>state.auth);
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
    }
    
    if (!isAdmin) return <Navigate to={"/admin"} />

    return (
        <div className='h-screen w-screen grid grid-cols-12'>
            <div className="hidden sm:block sm:col-span-4 lg:col-span-3">
                <h1 className='text-3xl p-[2rem]'>ChatX</h1>
                <Sidebar />
            </div>
            <div className='col-span-12 sm:col-span-8 lg:col-span-9 overflow-auto'>
                {children}
                <button onClick={handleSidebar} type='button' className='block sm:hidden fixed top-[2rem] right-[2rem] z-20'>
                    {
                        openSidebar ? <IoMdClose className='text-4xl p-2 hover:cursor-pointer hover:opacity-70' /> : <RxHamburgerMenu className='text-4xl p-2 hover:cursor-pointer hover:opacity-70' />
                    }
                </button>
            </div>

            {
                openSidebar && <div className={`w-screen h-screen absolute z-10 top-0 right-0 flex justify-center items-center flex-col bg-white sm:hidden`}>
                    <h1 className='text-3xl p-[2rem]'>ChatX</h1>
                    <Sidebar />
                </div>
            }
        </div>
    )
}

const Sidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname;

    const logoutHandler = async ()=>{
        const res = await axios.get(`${server}/api/v1/admin/logout`, {
            withCredentials: true
        })
        dispatch(adminNotExists(false));
        toast.success(res.data.message, {
            duration: 5000
        });
    }

    return <div className='flex flex-col items-start justify-start space-y-[1rem] pt-0 p-[2rem]'>
        {adminTabs.map(({ icon: Icon, path, name }) => (
            <Link className={`w-full ${location === path ? 'bg-black text-white hover:text-gray-300' : 'bg-white hover:bg-gray-300'} flex items-center gap-2  p-3 rounded-md`} to={path} key={path}>
                <Icon className='text-xl' /> {name}
            </Link>
        ))}
        <Link className={`w-full hover:bg-gray-300 flex items-center gap-2  p-3 rounded-md`} onClick={logoutHandler}>
            <IoLogOutOutline className='text-xl' /> Logout
        </Link>
    </div>
}

const adminTabs = [
    {
        name: "Dashboard",
        icon: MdDashboard,
        path: "/admin/dashboard"
    }, {
        name: "Users",
        icon: MdManageAccounts,
        path: "/admin/users"
    }, {
        name: "Chats",
        icon: MdGroups,
        path: "/admin/chats"
    }, {
        name: "Messages",
        icon: MdMessage,
        path: "/admin/messages"
    }
]



export default AdminLayout