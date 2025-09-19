import { DataGrid } from "@mui/x-data-grid"

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <div className='h-screen p-[3rem]'>
      <div className='shadow shadow-gray-300 w-full h-full'>
        <h3 className="text-2xl text-center my-3">{heading}</h3>
        <DataGrid
          columns={columns}
          rows={rows}
          rowHeight={rowHeight}
          style={{
            height: '80%'
          }}
          pageSizeOptions={[20,40,50,100]}
          sx={{
            border: "none",
            ".table-header": {
              bgcolor: 'black',
              color: 'white'
            }
          }}
        />
      </div>
    </div>
  )
}

export default Table