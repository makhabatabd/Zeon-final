import React, { useContext, useEffect } from 'react';
import { newContext } from '../../context/Brandnew';
import NewCard from './NewCard';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import "./NewCard.css"

const New = () => {
    const { newClothes, getNew } = useContext(newContext)
    useEffect(() => {
    getNew();
    }, []);
    return (
        <div className='container'>
                <h3 style={{textAlign:"left"}} className='hit-main-title'>Новинки</h3>
            <div className='new-card'>
                    {newClothes.map((item) => (
                        <NewCard item={item} key={item.id}/>
                    ))}
            </div>
            <div className='new-table-cards'>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {newClothes.map((item) => (
                                        <TableCell key={item.id}>
                                            <NewCard item={item} key={item.id}/>
                                        </TableCell>))}
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer>
            </div>
            </div>
    );
};

export default New;