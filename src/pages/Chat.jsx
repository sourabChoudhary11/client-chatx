import { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileMenu from '../components/dialogs/FileMenu.jsx';
import AppLayout from '../components/layout/AppLayout';
import ReverseScrollMessages from '../components/specific/ReverseScrollMessages.jsx';
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/event';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { getSocket } from '../Socket';
import { useChatDetailsQuery } from '../store/api/api.js';
import { removeNewMessageAlert } from '../store/reducers/chat.js';
import { setIsFileMenu } from '../store/reducers/misc.js';




const Chat = ({ chatId }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [userTyping, setUserTyping] = useState(false);
  const typingRef = useRef();
  const scrollRef = useRef();
  const typingLoaderRef = useRef();
  const socket = getSocket();
  const dispatch = useDispatch();

  const chatDetails = useChatDetailsQuery({ chatId });

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error }
  ];
  useErrors(errors);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  const members = chatDetails?.data?.chat?.members;

  const messageChange = (e) => {
    setMessage(e.target.value);
    socket.emit(START_TYPING, { chatId, members });

    if (typingRef.current) clearTimeout(typingRef.current)
    typingRef.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId, members });
    }, 2000)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }

  useEffect(() => {
    if (chatDetails.data && !chatDetails.data.chat) {
      navigate("/");
    }
  }, [chatDetails.data])

  useEffect(() => {
    dispatch(removeNewMessageAlert({ chatId }))

    return () => {
      setMessages([]);
      setMessage("");
      setPage(1);
      dispatch(removeNewMessageAlert({ chatId }))
    }
  }, [chatId])

  const newMessageListener = (data) => {
    if (data.message.chat === chatId) setMessages(prev => [...prev, data?.message]);
  }

  const startTypingListener = (data) => {
    if (data.chatId === chatId) setUserTyping(true);

  }

  const stopTypingListener = (data) => {
    if (data.chatId === chatId) setUserTyping(false);
  }

  if (userTyping) typingLoaderRef.current.scrollIntoView();


  const alertListener = (data) => {
    if(data.chatId===chatId){
      const alertMessage = {
        sender: {
          _id: "kdsfjksdkfads234jj32k",
          name: "Admin"
        },
        content: data.message,
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, alertMessage]);
    }
  }

  const listeners = {
    [NEW_MESSAGE]: newMessageListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT]: alertListener
  }

  useSocketEvents(socket, listeners);
  
  return (
    <div className='h-full flex flex-col justify-between -scroll-m-8'>
      <ReverseScrollMessages userTyping={userTyping} chatId={chatId} user={user} messages={messages} setMessages={setMessages} page={page} setPage={setPage} ref={scrollRef} typingLoaderRef={typingLoaderRef} />

      <form onSubmit={submitHandler}>
        <div className="flex justify-between items-center bg-white">
          <div className="text-xl h-full cursor-pointer px-4 py-3 hover:opacity-70" onClick={handleFileOpen}>
            <MdAttachFile />
          </div>

          <input
            className='grow px-4'
            type='text'
            placeholder='Type Your Message...'
            value={message}
            onChange={messageChange}
          />

          <input
            id="send"
            type="submit"
            className="hidden"
          />
          {/* Label acts as the trigger */}
          <label
            htmlFor="send"
            className="text-xl h-full cursor-pointer px-4 py-3 hover:text-opacity"
          >
            <IoSend />
          </label>
        </div>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </div>
  )
}



export default AppLayout()(Chat)