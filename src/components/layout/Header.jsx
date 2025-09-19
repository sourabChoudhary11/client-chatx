import { lazy, Suspense, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { GrGroup } from "react-icons/gr";
import axios from "axios";
import { IoAddCircle, IoLogOutOutline, IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { LogoLoader } from './Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../store/reducers/auth';
import { server } from '../../constants/config';
import toast from 'react-hot-toast';
import miscSlice from '../../store/reducers/misc';
import { resetNotification } from '../../store/reducers/chat';

const NewGroup = lazy(() => import('../specific/NewGroup'));
const Search = lazy(() => import('../specific/Search'));
const Notifications = lazy(() => import('../specific/Notifications'));

const Icon = ({ IconName, onClick }) => {
    return <IconName className='text-white text-xl cursor-pointer hover:opacity-70' onClick={onClick} />
}

const Header = () => {
    const dispatch = useDispatch();
    const {notificationsCount} = useSelector(state=>state.chat);
    const { isNewGroup, isNotification, isSearch } = useSelector(state => state.misc);
    const { setIsMobile, setIsSearch, setIsNewGroup, setIsNotification } = miscSlice.actions;

    const navigate = useNavigate();

    const handleMobileOpen = () => {
        dispatch(setIsMobile(true));
    }

    const searchHandler = () => {
        dispatch(setIsSearch(true));
    }

    const createGroupHandler = () => {
        dispatch(setIsNewGroup(true));
    }

    const manageGroupHandler = () => {
        navigate("/groups");
    }

    const notificationHandler = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotification());
    }

    const logoutHandler = async () => {
        const res = await axios.get(`${server}/api/v1/user/logout`, {
            withCredentials: true
        })
        dispatch(userNotExists());

        toast.success(res.data.message, {
            duration: 5000
        });
    }

    return (
        <>
            <header className='flex justify-between items-center h-[4rem] bg-purple-700'>
                <Link to={"/"} className='text-white hidden xs:block font-medium xs:text-xl md:text-2xl p-[1rem]' >ChatX</Link>
                <RxHamburgerMenu className='ml-3 text-white text-xl block xs:hidden cursor-pointer hover:opacity-70' onClick={handleMobileOpen} />
                <div className="flex items-center space-x-3 px-8">
                    <Icon IconName={FaSearch} onClick={searchHandler} />
                    <Icon IconName={IoAddCircle} onClick={createGroupHandler} />
                    <Icon IconName={GrGroup} onClick={manageGroupHandler} />
                    <span className='relative cursor-pointer' onClick={notificationHandler}>
                        
                        {
                            notificationsCount>0 &&<span className='w-[0.7rem] h-[0.7rem] absolute text-xs p-2 -top-1 left-2 bg-red-500 text-white rounded-full font-bold flex items-center justify-center z-10'>
                                { notificationsCount }
                            </span>
                        }
                        
                    <Icon IconName={IoNotifications} />
                    </span>
                    <Icon IconName={IoLogOutOutline} onClick={logoutHandler} />

                </div>
            </header>
            {
                isNewGroup && <Suspense fallback={<LogoLoader />}>
                    <NewGroup />
                </Suspense>
            }
            {
                isSearch && <Suspense fallback={<LogoLoader />}>
                    <Search />
                </Suspense>

            }
            {
                isNotification && <Suspense fallback={<LogoLoader />}>
                    <Notifications />
                </Suspense>

            }
        </>
    )
}

export default Header