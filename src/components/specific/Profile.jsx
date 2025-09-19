import { MdFace, MdOutlineAlternateEmail } from "react-icons/md";
import { TbCalendarUser } from "react-icons/tb";
import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

const Profile = () => {

    const { user } = useSelector(state => state.auth);

    return (
        <div className='hidden text-white md:flex md:flex-col md:items-center md:col-span-3 bg-black px-4'>
            <Avatar sx={{ width: "9rem", height: "9rem", fontSize: '3rem', margin:"1rem 0", border: "4px solid white", objectFit:"cover" }} src={`${user?.avatar?.url}`} alt={`${user?.name}`} />
            <ProfileCard text={`${user?.bio}`} heading="bio" />
            <ProfileCard Icon={<MdOutlineAlternateEmail />} text={`${user?.email}`} heading="email" />
            <ProfileCard Icon={<MdFace />} text={`${user?.name}`} heading="name" />
            <ProfileCard Icon={<TbCalendarUser />} text={moment(user?.createdAt).fromNow()} heading="joined" />
        </div>
    )
}

const ProfileCard = ({ Icon, heading, text }) => {
    return (
        <div className='flex flex-col items-center justify-center my-3 space-y-2'>
            <h3 className='text-[14px] font-bold'>{text}</h3>
            <div className='flex items-center justify-center space-x-1'>
                {
                    Icon && Icon
                }
                
                <p className="text-[12px] text-gray-500">{heading}</p>
            </div>
        </div>
    )
}

export default Profile