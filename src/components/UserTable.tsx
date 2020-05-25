/**
 * This component shows a list of the registered users.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {User, Users} from '../types';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

interface IUserTable {
    users: Users;
    controls?: boolean;
    handleDeleteUser?(): void;
}

const UserTable: React.FC<IUserTable> = ({
    users,
    controls,
    handleDeleteUser,
}) => {
    //const classes = useStyles();
    return (
        <TableContainer>
            <Table>
                <TableHead color="grey">
                    <TableCell >User name</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Is admin</TableCell>
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