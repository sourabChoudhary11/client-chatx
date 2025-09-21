import Drawer from '@mui/material/Drawer';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CONNECT_USERS, NEW_MESSAGE_ALERT, NEW_REQUEST, OFFLINE_USERS, ONLINE_USERS, REFETCH_CHAT } from '../../constants/event.js';
import { useErrors, useSocketEvents } from '../../hooks/hook.jsx';
import { saveOrGetFromLocalStorage } from '../../lib/features.js';
import { getSocket } from '../../Socket.jsx';
import { useMyChatsQuery } from '../../store/api/api.js';
import { incrementNotification, setNewMessageAlert } from "../../store/reducers/chat.js";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../store/reducers/misc.js';
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile.jsx';
import Header from './Header';


const AppLayout = () => (WrapperComponent) => {
    
    return (props) => {
        const [onlineUsers,setOnlineUsers] = useState([]);
        const navigate = useNavigate();
        const socket = getSocket();
        console.log(socket.id)
        const { chatId } = useParams();
        const dispatch = useDispatch();
        const anchorRef = useRef(null);
        const { isMobile } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);
        const { newMessageAlert } = useSelector(state => state.chat);
        const { isLoading, isError, error, data, refetch } = useMyChatsQuery("");

        useErrors([{ isError, error }]);

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
           anchorRef.current= e.currentTarget;
            dispatch(setSelectedDeleteChat({
                groupChat,
                chatId: _id
            }))
            dispatch(setIsDeleteMenu(true));
        }

        const handleMobileClose = () => {
            dispatch(setIsMobile(false));
        }

        const notificationListener = () => {
            dispatch(incrementNotification());
        }

        const newMessageAlertListener = (data) => {
            if(data.chatId !== chatId) dispatch(setNewMessageAlert(data));
        }

        const refetchListener = () => {
            refetch();
            navigate("/");
        }

        const connectUsersListener = (connectUser)=>{
            setOnlineUsers(prev=>[...prev,connectUser]);
            socket.emit(ONLINE_USERS, user._id);
        }

        const onlineUsersListener = (onlineUser)=>{
            setOnlineUsers(prev=>[...prev,onlineUser]);
        }
        
        const offlineUsersListener = (offlineUser)=>{
            setOnlineUsers(prev=>prev.filter(u=>u!==offlineUser));
        }

        const handlers = {
            [NEW_REQUEST]: notificationListener,
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [REFETCH_CHAT]: refetchListener,
            [CONNECT_USERS]: connectUsersListener,
            [ONLINE_USERS]: onlineUsersListener,
            [OFFLINE_USERS]: offlineUsersListener
        }

        useSocketEvents(socket, handlers);
        
        useEffect(()=>{
            if(user?._id) socket.emit(CONNECT_USERS, user._id);
        },[user])

        useEffect(()=>{
            saveOrGetFromLocalStorage({key:NEW_MESSAGE_ALERT, value: newMessageAlert})
        },[newMessageAlert]);

        return <>
            <Title title="ChatX" />
            <Header />
            <DeleteChatMenu anchorEl={anchorRef} />

            {
                isLoading ? <Skeleton /> :
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList w='70vw' chats={data?.chats} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessageAlert} onlineUsers={onlineUsers} />
                    </Drawer>
            }

            <div className='grid grid-cols-12'>
                <div className="hidden h-[calc(100vh-4rem)] overflow-auto xs:flex xs:flex-col xs:space-y-2 xs:col-span-4 md:col-span-3">
                    {
                        isLoading ? <Skeleton /> : <ChatList chats={data?.chats} handleDeleteChat={handleDeleteChat} chatId={chatId} newMessagesAlert={newMessageAlert}
                        onlineUsers={onlineUsers}
                        />
                    }
                </div>
                <div className='h-[calc(100vh-4rem)] bg-gray-300 col-span-12 xs:col-span-8 md:col-span-6 p-2'>
                    <WrapperComponent {...props} chatId={chatId} />
                </div>
                <Profile />
            </div>
        </>
    }
};

export default AppLayout