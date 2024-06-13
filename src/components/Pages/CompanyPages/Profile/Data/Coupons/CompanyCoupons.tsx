import CustomTable from '../../../../../CustomTable/CustomTable';
import './Coupons.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 , headerClassName:'tester'},
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'title', headerName: 'Title', width: 100 },
    { field: 'description', headerName: 'Description', width: 100 },   
    { field: 'start_date', headerName: 'Start Date', width: 100 ,type:'date'},
    { field: 'end_date', headerName: 'End Date', width: 100,type:'date' },
    { field: 'amount', headerName: 'Amount', width: 100 ,type: 'number', },
    { field: 'price', headerName: 'Price', width: 100 ,type: 'number', },
    { field: 'image', headerName: 'Image', width: 100 },    
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

export function CompanyCoupons():JSX.Element{
    return (
       <div className='CompanyCoupons'>
        <div className='Container'><CustomTable/></div>
       </div>
      );
}