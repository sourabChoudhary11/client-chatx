import ChatItem from '../shared/ChatItem';

const ChatList = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[
        {
            chatId:"",
            count:0
        }
    ],
    handleDeleteChat
}) => {

  console.log("onlineUser",onlineUsers);
  return (
    <div 
    style={{width: w}}>
      {
        chats.map((data,index)=>{
          const {_id, name, groupChat, avatar, members} = data;
          const isOnline = members?.some((member)=>onlineUsers.includes(member))
          const newMessageAlert = newMessagesAlert.find(({chatId})=>chatId===_id)

          return <ChatItem key={_id} index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} groupChat={groupChat} sameSender={chatId===_id} handleDeleteChat={handleDeleteChat} />
        })
      }
    </div>
  )
}

export default ChatList