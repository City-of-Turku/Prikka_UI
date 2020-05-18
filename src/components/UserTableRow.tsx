/**
 * Component used to display sample data while My Memory page is not working
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {User} from '../types';
import {TableCell, TableRow} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

interface IUserTableRow {
    user: User;
    controls?: boolean;
    handleDeleteUser?(): void;
}

const UserTableRow: React.FC<IUserTableRow> = ({
    user,
    controls,
    handleDeleteUser,
}) => {
    const classes = useStyles();

    return (
        <TableRow key={user.id}>
            <TableCell>{user.displayName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.admin.toString()}</TableCell>
        </TableRow>
    );
};

export default UserTableRow;