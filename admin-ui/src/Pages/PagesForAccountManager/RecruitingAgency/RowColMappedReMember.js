export const columns= (handleRemoveMemberData)=> [
    {
        field: 'id',
        headerName: 'Sr No.',
        minWidth: 120,
        flex: 0.1,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'full_name',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 200,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'mobileno',
        headerName: 'Mobile No',
        flex: 2,
        minWidth: 150,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) =>(
            <span>+{params.row.mobileno}</span>
        )
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 2,
        minWidth: 300,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'isAdmin',
        headerName: 'Account Role',
        flex: 2,
        minWidth: 250,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) =>(
            <div className="w-full h-full flex items-center">
                 <span className={`h-10 rounded-md w-28 border flex justify-center items-center p-2 ${params.row.isAdmin?"border-blue-500 bg-blue-200 text-blue-500":"border-orange-500 text-orange-500 bg-orange-200"}`} >{params.row.isAdmin?"Admin":"Member"}</span>
            </div>
        )
    },
    {
        field: 'account_status',
        headerName: 'Account Status',
        flex: 2,
        minWidth: 250,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) =>(
          <div className='flex items-center w-full h-full'>
            <span className={`${params.row.account_status==="Active"?"bg-green-400":"bg-red-400"} text-white h-10 w-28 p-2 flex justify-center items-center rounded-md`}>{params.row.account_status}</span>
          </div>
        )
    },
    {
        headerName: "Action",
        flex: 2,
        minWidth: 250,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) =>(
            <div onClick={()=>handleRemoveMemberData(params.row._id)} className="h-full w-full flex items-center">
                 <button className="bg-red-400 h-10 hover:bg-red-500 flex justify-center items-center p-2 rounded-md text-white">Remove</button>
            </div>
        )
    }

]