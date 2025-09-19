import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout'
import { MdAdminPanelSettings, MdGroup, MdMessage, MdNotifications, MdPerson } from "react-icons/md";
import { DoughnutChart, LineChart } from '../../components/specific/Charts';
import { useGetDashboardStatsQuery } from '../../store/api/api';
import { useErrors } from '../../hooks/hook';
import Skeleton from '@mui/material/Skeleton';

const Dashboard = () => {

  const [rows, setRows] = useState([]);

  const { data, isLoading, isError, error } = useGetDashboardStatsQuery("");
  useErrors([{ error, isError }]);

  useEffect(()=>{
    if(data?.stats) setRows({
      ...data.stats,
      singleChatCount: data.stats.totalChatCount-data.stats.groupChatCount
    });
  },[data])

  return <AdminLayout>
    {
      isLoading ? <Skeleton height="100vh" /> : <div className='w-full flex flex-col sm:p-[1rem]'>
      <Apps />
      <div className='flex flex-col'>
        <div className='w-full mt-5 flex flex-col rounded-md p-4 justify-center shadow shadow-gray-400'>
          <h2 className='text-3xl my-3 text-center'>Last Messages</h2>
          <LineChart data={rows.last7Days} />
        </div>
        <div className='w-full h-[20rem] mt-5 flex flex-col rounded-md p-4 justify-center items-center shadow shadow-gray-400 relative'>
          <DoughnutChart data={[rows.singleChatCount, rows.groupChatCount]} labels={["Single Chats", "Group Chats"]} />
          <div className='absolute flex items-center space-x-1 sm:space-x-3 text-md sm:text-2xl'>
            <MdGroup />
            <span className='italic'>vs</span>
            <MdPerson />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-evenly space-x-3 py-3 overflow-x-auto'>
        <Widget title="Users" value={rows.usersCount} icon={MdPerson} />
        <Widget title="Chats" value={rows.totalChatCount} icon={MdGroup} />
        <Widget title="Messages" value={rows.messagesCount} icon={MdMessage} />
      </div>
    </div>
    }
  </AdminLayout>
}

const Apps = () => {

  const [search, setSearch] = useState("");

  return <div className='mt-[5rem] flex justify-around items-center shadow  shadow-gray-700 lg:space-x-3'>
    <div className='flex justify-center items-center'>
      <MdAdminPanelSettings className='hidden xs:block text-3xl sm:text-4xl' />
      <input type="password" value={search} onChange={(e) => setSearch(e.target.value)} className='rounded-sm p-4' placeholder='search...' />
      <button className='px-3 p-2 bg-black text-white rounded-md'>
        Search
      </button>
    </div>
    <button>
      <MdNotifications className='text-3xl sm:text-4xl' />
    </button>
  </div>
}

const Widget = ({ title, value, icon: Icon }) => {
  return (
    <div className='flex flex-col items-center justify-center p-[2rem] space-y-2 shadow shadow-gray-400 rounded-lg'>
      <p className='flex flex-col items-center justify-center rounded-full border-4 border-[#590959] w-[4rem] h-[4rem]'>{value}</p>
      <Icon className="text-2xl" />
      <h3>{title}</h3>
    </div>
  )
}

export default Dashboard