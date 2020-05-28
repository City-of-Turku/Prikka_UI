/**
 * This component shows a list of the registered users.
 */

import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {User, Users} from '../types';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

interface IUserTable {
    t(key, opts?): Function;
    users: Users;
    controls?: boolean;
    handleDeleteUser?(): void;
}

const UserTable: React.FC<IUserTable> = ({
    t,
    users,
    controls,
    handleDeleteUser,
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <StyledTableCell >{t('headerUserName')}</StyledTableCell>
                    <StyledTableCell>{t('headerEmail')}</StyledTableCell>
                    <StyledTableCell>{t('headerIsAdmin')}</StyledTableCell>
                </TableHead>
                <TableBody>
                    {users.rows.map(user => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.admin.toString()}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;