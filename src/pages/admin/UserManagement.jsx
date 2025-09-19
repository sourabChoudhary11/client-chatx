import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import Avatar from '@mui/material/Avatar';
import { dashboardData } from '../../constants/dummyData';
import { useErrors } from '../../hooks/hook';
import { useGetUsersStatsQuery } from '../../store/api/api';
import Skeleton from '@mui/material/Skeleton';

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
            <Avatar alt={params.row.name} src={params.row.avatar} />
        )
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "email",
        headerName: "Email",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "friends",
        headerName: "Friends",
        headerClassName: "table-header",
        width: 150,
    },
    {
        field: "groups",
        headerName: "Groups",
        headerClassName: "table-header",
        width: 200,
    }
];

const UserManagement = () => {
    const [rows, setRows] = useState([]);

    const { data, isLoading, isError, error } = useGetUsersStatsQuery("");
    useErrors([{ error, isError }]);

    useEffect(() => {
        if (data?.users) setRows(data.users.map(u=>({...u,id:u._id})));
    }, [data])

    return <AdminLayout>
        {
            isLoading ? <Skeleton height="100vh" /> : <Table heading="All Users" rows={rows} columns={columns} />
        }
    </AdminLayout>
}

export default UserManagement