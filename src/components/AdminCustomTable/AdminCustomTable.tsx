import { useNavigate } from 'react-router-dom';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './AdminCustomTable.css';
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from '@mui/material';
import { useState, useEffect } from 'react';
import { couponSystem } from '../../redux/store';
import { Company } from '../../model/Company';
import { Customer } from '../../model/Customer';
import { createCompanyState, createCustomerState } from '../../redux/adminReducer';
import axiosJWT from '../../util/axiosJWT';
import notify from '../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../util/axiosErr';
interface adminCustomTableProps{
    type:string;
}
export function AdminCustomTable(props:adminCustomTableProps):JSX.Element{
    useAuthRedirect();
    const navigate = useNavigate();
    const [rows, setRows] = useState<(Company | Customer)[] | undefined>();   
  const [selectedRows, setSelectedRows] = useState<number[]>([]);  
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  couponSystem.subscribe(()=>{
    if(props.type === 'Customer'){
        setRows(couponSystem.getState().admin.customers);}
   else{
       setRows(couponSystem.getState().admin.companies);}
  })
  useEffect(()=>{
    if(props.type === 'Customer'){
        setRows(couponSystem.getState().admin.customers);}
   else{
       setRows(couponSystem.getState().admin.companies);}
  },[props.type]);
   
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
          const newSelectedRows = rows
          ? rows.map((row: Company | Customer) =>
              props.type === 'Company' ? (row as Company).id : (row as Customer).customerID
            )
          : [];
          setSelectedRows(newSelectedRows.filter((num): num is number => num !== undefined));
        } else {
          setSelectedRows([]);
        }
      };
      const handleDeleteRows = () => {
        if (!rows) return; 
        const updatedRows = rows.filter((row: Company | Customer) => {
            const tempId =  props.type === 'Company'?(row as Company).id:(row as Customer).customerID;
            if(isSelected(tempId as number)) {
              axiosJWT.delete(`http://localhost:8080/api/v1/admin/${props.type === 'Company'?'company':'customer'}/delete/${tempId}`).then(res=>{
                  notify.success(`${props.type} deleted`);
              }).catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined)
              return false;
         }
         else{
          return true;
         }
        });
             
        if (props.type === 'Company') {
          setRows(updatedRows as Company[]);
          couponSystem.dispatch(createCompanyState(updatedRows as Company[]));
        } else if (props.type === 'Customer') {
          setRows(updatedRows as Customer[]);
          couponSystem.dispatch(createCustomerState(updatedRows as Customer[]));
        }      
        setSelectedRows([]);               
      };   
      const handleRows = ()=>{
        return rows && rows.map((row,index) => {
            const {password,coupons,...rowToJson} = row; 
            return(        
            <TableRow
              key={ props.type === 'Company'?(row as Company).id:(row as Customer).customerID}
              hover
              onClick={(event) => handleRowSelect( (props.type === 'Company'?(row as Company).id:(row as Customer).customerID) ?? 0 ,(event.target as HTMLTableCellElement).cellIndex)}
              role="checkbox"
              aria-checked={isSelected(( props.type === 'Company'?(row as Company).id:(row as Customer).customerID) ?? 0)}
              selected={isSelected(( props.type === 'Company'?(row as Company).id:(row as Customer).customerID) ?? 0)}
            >
              <TableCell padding="checkbox">
                <Checkbox                                        
                  checked={isSelected(( props.type === 'Company'?(row as Company).id:(row as Customer).customerID) ?? 0)}
                  inputProps={{ 'aria-labelledby': `row-${ props.type === 'Company'?(row as Company).id:(row as Customer).customerID}-checkbox` }}
                />
              </TableCell>
              <TableCell width='20px'>{index+1}</TableCell>
              <TableCell>{props.type === 'Company' ?(row as Company).name:JSON.parse(JSON.stringify(row)).first_name}</TableCell>
              {props.type === 'Customer' && <TableCell>{(row as Customer).last_name}</TableCell>}                              
              <TableCell>{row.email}</TableCell>
             <TableCell onClick={()=>navigate(`/${props.type==='Company'?'company':'customer'}/edit/${JSON.stringify(rowToJson)}`)} className='EditButton'>Edit</TableCell>
            </TableRow>
          )})
      }
    return (<div className='AdminPage'> 
    <h1 style={{top:'5px'}}>{`${props.type==='Company'?'Companies':'Customers'} Table`}</h1>
    <Button
       className='DeleteButton'
        onClick={handleDeleteRows}
        style={{opacity:selectedRows.length === 0 || couponSystem.getState().auth.userType ==='CUSTOMER'?0:1}}
      >
        Delete
      </Button>
      <TableContainer className='AdminTableContainer' component={Paper}>
        <Table className='AdminTable' aria-label="simple table">
          <TableHead style={{position:'sticky',top:0,background:'#fff',zIndex:2}}>
            <TableRow>
            <TableCell style={{background:'#fff',zIndex:1}} padding="checkbox">
                <Checkbox                 
                  checked={isSelectAllChecked}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all rows' }}
                />
              </TableCell>
              <TableCell width='20px'>ID</TableCell>
              <TableCell>{props.type === 'Customer'?'FirstName':'Name'}</TableCell>
              {props.type === 'Customer' && <TableCell>Last Name</TableCell>}
              <TableCell>Email</TableCell>                         
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {handleRows()}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
}