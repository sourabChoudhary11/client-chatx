import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import AvatarCard from '../../components/shared/AvatarCard';
import { useGetChatsStatsQuery } from '../../store/api/api';
import Skeleton from '@mui/material/Skeleton';
import { useErrors } from '../../hooks/hook';
import Avatar from '@mui/material/Avatar';

const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 150,
    },
    {
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => (
            <AvatarCard avatar={params.row.avatar} />
        )
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 250,
    },
    {
        field: "totalMembers",
        headerName: "Total Members",
        headerClassName: "table-header",
        width: 120,
    },
    {
        field: "groupChat",
        headerName: "Group",
        headerClassName: "table-header",
        width: 100,
    },
    {
        field: "members",
        headerName: "members",
        headerClassName: "table-header",
        width: 400,
        renderCell: (params) => (
            <AvatarCard avatar={params.row.members.map(m => m.avatar)} />
        )
    },
    {
        field: "totalMessages",
        headerName: "Total Messages",
        headerClassName: "table-header",
        width: 120,
    },
    {
        field: "creator",
        headerName: "Created By",
        headerClassName: "table-header",
        width: 250,
        renderCell: (params) => (
            <div className='flex items-center space-x-2'>
                <Avatar src={[params.row.creator.avatar]} />
                <span>{params.row.creator.name}</span>
            </div>
        )
    }
];

const ChatManagement = () => {

    const [rows, setRows] = useState([]);

    const { data, isLoading, isError, error } = useGetChatsStatsQuery("");
    useErrors([{ error, isError }]);

    useEffect(() => {
        if (data?.chats) setRows(data.chats.map(c => ({ ...c, id: c._id })));
    }, [data])

    return <AdminLayout>
        {
            isLoading ? <Skeleton height="100vh" /> : <Table heading="All Chats" rows={rows} columns={columns} />
        }
    </AdminLayout>
}

export default ChatManagement