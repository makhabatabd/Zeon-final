import React, { useContext, useEffect } from 'react';
import { summerContext } from '../../context/SummerCollection';
import SimiliarCard from './SimiliarCard';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import "./Similiar.css"

const Similiar = () => {
    const { summer, getSummer } = useContext(summerContext)
     useEffect(() => {
    getSummer();
    }, []);
    return (
        <>
        <div className='similiar'>
            {summer?.slice(0, 5).map((item) => (
            <SimiliarCard item={item} key={item.id}/>
            ))}
        </div>
         <div className='similiar-table-cards'>
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {summer?.slice(0, 5).map((item) => (
                                        <TableCell key={item.id}>
                                            <SimiliarCard item={item} key={item.id}/>
                                        </TableCell>))}
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer> 
            </div>
            </>
    );
};

export default Similiar;