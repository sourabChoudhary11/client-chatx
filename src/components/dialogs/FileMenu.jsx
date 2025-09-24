import Menu from "@mui/material/Menu"
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../store/reducers/misc";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { FaFile, FaFileAudio, FaImage, FaVideo } from "react-icons/fa";
import ListItemText from "@mui/material/ListItemText";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../store/api/api";

const FileMenu = ({ anchorEl, chatId }) => {

    const isFileMenu = useSelector(state => state.misc.isFileMenu);
    const dispatch = useDispatch();
    const [sendAttachments] = useSendAttachmentsMutation();

    const imageRef = useRef();
    const audioRef = useRef();
    const videoRef = useRef();
    const fileRef = useRef();

    const selectImage = () => imageRef.current.click();
    const selectAudio = () => audioRef.current.click();
    const selectVideo = () => videoRef.current.click();
    const selectFile = () => fileRef.current.click();

    const closeFileMenu = () => {
        dispatch(setIsFileMenu(false));
    }

    const fileChangeHandle = async (e, key) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        if (files.length > 5) return toast.error(`You can only send max 5 ${key} at once`);
        dispatch(setUploadingLoader(true));
        let toastId = toast.loading(`Sending ${key}....`);
        closeFileMenu();

        try {
            const formData = new FormData();
            formData.append("chatId", chatId);
            files.forEach(file => formData.append("file", file));
            const res = await sendAttachments(formData);

            if (res.data?.message) {
                toast.success(`${key} sent successfully`, { id: toastId })
            }else { 
                toast.error(`Failed to send ${key}`, { id: toastId }) 
            }
        } catch (error) {
            toast.error(error,  {toasterId: toastId})
        } finally {
            dispatch(setUploadingLoader(false));
        }
    }

    return <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFileMenu}>
        <div className="w-[10rem]">
            <MenuList>
                <MenuItem onClick={selectImage}>
                    <Tooltip title="Image">
                        <FaImage />
                    </Tooltip>
                    <ListItemText>Image</ListItemText>
                    <input
                        ref={imageRef}
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/jpg, image/gif"
                        onChange={(e) => fileChangeHandle(e, "Images")}
                        multiple
                    />
                </MenuItem>

                <MenuItem onClick={selectAudio}>
                    <Tooltip title="Audio">
                        <FaFileAudio />
                    </Tooltip>
                    <ListItemText>Audio</ListItemText>
                    <input
                        ref={audioRef}
                        type="file"
                        className="hidden"
                        accept="audio/mpeg, audio/wav"
                        onChange={(e) => fileChangeHandle(e, "Audios")}
                        multiple
                    />
                </MenuItem>

                <MenuItem onClick={selectVideo}>
                    <Tooltip title="Video">
                        <FaVideo />
                    </Tooltip>
                    <ListItemText>Video</ListItemText>
                    <input
                        ref={videoRef}
                        type="file"
                        className="hidden"
                        accept="video/mp4, video/webm, video/ogg"
                        onChange={(e) => fileChangeHandle(e, "Videos")}
                        multiple
                    />
                </MenuItem>

                <MenuItem onClick={selectFile}>
                    <Tooltip title="File">
                        <FaFile />
                    </Tooltip>
                    <ListItemText>File</ListItemText>
                    <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        accept="*"
                        onChange={(e) => fileChangeHandle(e, "Files")}
                        multiple
                    />
                </MenuItem>
            </MenuList>
        </div>
    </Menu>
}

export default FileMenu;