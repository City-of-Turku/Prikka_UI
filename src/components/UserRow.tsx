/**
 * This component shows a table row with one registered user.
 */

import React from 'react';
import {User} from '../types';
import {TableCell, TableRow} from "@material-ui/core";
import {apis} from "../services/apis";
import {AxiosError, AxiosResponse} from "axios";
import {useSnackbarContext} from '../contexts/SnackbarContext';
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

interface IUserRow {
    t(key, opts?): Function;
    user: User;
    controls?: boolean;
}

const UserRow: React.FC<IUserRow> = ({
    t,
    user,
    controls,
}) => {

    const snackbarContext = useSnackbarContext();

    let userId = user.id;
    let userDisplayName = user.displayName;
    let userEmail = user.email;
    let userIsAdmin = user.admin;

    const handleUserUpdateSubmit = () => {
        const model = {
            displayName: userDisplayName,
            email: userEmail,
            admin: !userIsAdmin,
        };
        apis.admin
            .adminUpdateUserById(userId,model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('User updated');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const showRightButton = (isAdmin) => {
        if (isAdmin === true) {
            return (
                <Button size="small" color="primary" onClick={handleUserUpdateSubmit}>
                    {t('userTable.buttonRemoveAdminRole')}
                </Button>
            )
        }
        return (
            <Button size="small" color="primary" onClick={handleUserUpdateSubmit}>
                {t('userTable.buttonAddAdminRole')}
            </Button>
        )
    };

    return (
        <TableRow>
            <TableCell>{user.displayName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
                <Checkbox checked={user.admin} disabled={true}/>
            </TableCell>
            <TableCell>
                {showRightButton(user.admin)}
            </TableCell>
        </TableRow>
    );
};

export default UserRow;