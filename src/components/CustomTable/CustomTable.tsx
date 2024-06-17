import './CustomTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { Coupon } from '../../model/Coupon';
import { couponSystem } from '../../redux/store';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import axiosJWT from '../../util/axiosJWT';
import notify from '../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../util/axiosErr';
import { createMyCouponState } from '../../redux/myCouponsReducer';
import { useNavigate } from 'react-router-dom';
  
  export default function CustomTable():JSX.Element {   
    useAuthRedirect();
    const navigate = useNavigate();
    const [rows, setRows] = useState<Coupon[]>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);  
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  
  couponSystem.subscribe(()=>{
    setRows(couponSystem.getState().myCoupons.myCoupons);
  });
  useEffect(()=>{
    setRows(couponSystem.getState().myCoupons.myCoupons);
  },[])
  
  const truncateDescription = (description:string) => {
        const words = description.split(' ');
        return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
      };
      const handleRowSelect = (id: number,cellIndex:number) => {
       if(cellIndex === 9){
        return;
       }
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected: number[] = [];
    
        if (selectedIndex === -1) {
          newSelected = [...selectedRows, id];
        } else if (selectedIndex === 0) {
          newSelected = selectedRows.slice(1);
        } else if (selectedIndex === selectedRows.length - 1) {
          newSelected = selectedRows.slice(0, -1);
        } else if (selectedIndex > 0) {
          newSelected = [
            ...selectedRows.slice(0, selectedIndex),
            ...selectedRows.slice(selectedIndex + 1),
          ];
        }
    
        setSelectedRows(newSelected);
      };
      const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;
      const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelectAllChecked(event.target.checked);
        if (event.target.checked) {
          const newSelectedRows = rows && rows.map((row) => row.couponID);
          setSelectedRows(newSelectedRows ? newSelectedRows:[]);
        } else {
          setSelectedRows([]);
        }
      };
      const handleDeleteRows = () => {
        const updatedRows = rows && rows.filter(row => {
          const id:number = row.couponID;
            if(isSelected(id)) {
                axiosJWT.delete(`http://localhost:8080/api/v1/company/coupon/${id}`).then(res=>{
                    notify.success("Coupon deleted");
                }).catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined)
                return false;
           }
           else{
            return true;
           }
        });
        setRows(updatedRows);
        couponSystem.dispatch(createMyCouponState(updatedRows?updatedRows:[]));
        setSelectedRows([]);
      };   
    return (<div> <Button
       className='DeleteButton'
        onClick={handleDeleteRows}
        style={{opacity:selectedRows.length === 0 || couponSystem.getState().auth.userType ==='CUSTOMER'?0:1}}
      >
        Delete
      </Button>
      <TableContainer className='TableContainer' component={Paper}>
        <Table className='Table' aria-label="simple table">
          <TableHead style={{position:'sticky',top:0,background:'#fff',zIndex:2}}>
            <TableRow>
           {couponSystem.getState().auth.userType ==='COMPANY' && <TableCell style={{background:'#fff',zIndex:1}} padding="checkbox">
                <Checkbox                 
                  checked={isSelectAllChecked}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all rows' }}
                />
              </TableCell>}
              <TableCell width='20px'>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Price</TableCell>              
             {couponSystem.getState().auth.userType ==='COMPANY' && <TableCell>Edit</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows && rows.map((row,index) => (
              <TableRow
                key={row.couponID}
                hover
                onClick={(event) => handleRowSelect(row.couponID,(event.target as HTMLTableCellElement).cellIndex)}
                role="checkbox"
                aria-checked={isSelected(row.couponID)}
                selected={isSelected(row.couponID)}
              >
               {couponSystem.getState().auth.userType ==='COMPANY' && <TableCell padding="checkbox">
                  <Checkbox                                        
                    checked={isSelected(row.couponID)}
                    inputProps={{ 'aria-labelledby': `row-${row.couponID}-checkbox` }}
                  />
                </TableCell>}
                <TableCell width='20px'>{index+1}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{truncateDescription(row.description)}</TableCell>
                <TableCell>{new Date(row.start_date).toDateString()}</TableCell>
                <TableCell>{new Date(row.end_date).toDateString()}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.price}</TableCell>               
                {couponSystem.getState().auth.userType ==='COMPANY' && <TableCell onClick={()=>navigate(`/company/editCoupon/${JSON.stringify(row)}`)} className='EditButton'>Edit</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }