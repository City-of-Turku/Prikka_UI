/**
 * This component shows a list of the registered users.
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Users} from '../types';
import {Table, TableBody, TableCell, TableContainer, TableHead} from "@material-ui/core";
import UserRow from "./UserRow";

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
    handleRefresch?(): void;
}

const UserTable: React.FC<IUserTable> = ({
    t,
    users,
    controls,
    handleRefresch,
}) => {

    const displayUsers = (users) => (
        <>
            {users.rows.map(user => (
                <UserRow t={t} user={user} handleRefresch={handleRefresch}></UserRow>
            ))}
        </>
    );

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <StyledTableCell >{t('userTable.headerUserName')}</StyledTableCell>
                    <StyledTableCell>{t('userTable.headerEmail')}</StyledTableCell>
                    <StyledTableCell>{t('userTable.headerIsAdmin')}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableHead>
                <TableBody>
                    {displayUsers(users)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;