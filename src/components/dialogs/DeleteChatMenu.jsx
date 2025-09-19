import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import { ImExit } from "react-icons/im";
import { RiUserUnfollowLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../store/api/api";
import { setIsDeleteMenu } from "../../store/reducers/misc";

const DeleteChatMenu = ({ anchorEl }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedDeleteChat, isDeleteMenu } = useSelector(state => state.misc);
    const { groupChat, chatId } = selectedDeleteChat;

    const [unFriend, _, unFriendChatData] = useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
        anchorEl.current = null;
    }

    const leaveGroupHandler = () => {
        closeHandler();
        leaveGroup(`Leaving Group.... ${chatId}`, chatId);
    }

    const unFriendHandler = () => {
        closeHandler();
        unFriend(`UnFriend.... ${chatId}`, chatId);
    }

    useEffect(() => {
        if (unFriendChatData || leaveGroupData) return navigate("/");
    }, [unFriendChatData, leaveGroupData])

    return (
        <Menu anchorEl={anchorEl.current}
            transformOrigin={{
                vertical: "center",
                horizontal: "left"
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            open={isDeleteMenu} onClose={closeHandler}
        >
            <MenuItem
                className="p-2 flex row items-center w-[10rem]"
                onClick={groupChat ? leaveGroupHandler : unFriendHandler}
            >
                <span className="flex items-center space-x-2">
                    {
                        groupChat
                            ? <><ImExit /> <span>Leave Group</span></>
                            : <><RiUserUnfollowLine /> <span>UnFriend</span></>
                    }
                </span>
            </MenuItem>
        </Menu>
    )
}

export default DeleteChatMenu;