import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import Avatar from '@mui/material/Avatar';
import { fileFormat } from '../../lib/features';
import { RenderAttachment } from '../../components/shared/RenderAttachment';
import { useGetMessagesStatsQuery } from '../../store/api/api';
import Skeleton from '@mui/material/Skeleton';
import { useErrors } from '../../hooks/hook';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {

      const attachments = params.row.attachments;

      return attachments.length > 0 ? attachments.map(a => {
        const url = a.url;
        const file = fileFormat(url);

        return <div className='w-[100%] h-[100%] flex justify-center items-center'>
          <a
            href={url}
            download
            target="_blank"
          >
            {RenderAttachment(file, url)}
          </a>
        </div>
      }) : "No Attachments"

    }
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const content = params.row.content;
      return content ? content : "No Message"
    }
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <div className='flex items-center space-x-2'>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </div>
    )
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  }
];


const MessageManagement = () => {


  const [rows, setRows] = useState([]);

  const { data, isLoading, isError, error } = useGetMessagesStatsQuery("");
  useErrors([{ error, isError }]);

  useEffect(() => {
    if (data?.messages) setRows(data.messages.map(m => ({ ...m, id: m._id })));
  }, [data])

  return <AdminLayout>
    {
      isLoading ? <Skeleton height="100vh" /> :<Table heading="All Messages" rows={rows} columns={columns} rowHeight={200} />
    }
  </AdminLayout>
}

export default MessageManagement