import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useSnackbarContext} from '../contexts/SnackbarContext';


interface IDeleteDialog {
    t(key, opts?): Function;
    handleDelete(): void;
    type: string;
}
const DeleteDialog: React.FC<IDeleteDialog> = ({
    t,
    handleDelete,
    type
}) => {
    const snackbarContext = useSnackbarContext();

    const [open, setOpen] = React.useState(false);
    const [confirmMessage, setConfirmMessage] = React.useState<string>('');

    const handleConfirmMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setConfirmMessage(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (confirmMessage === 'Yes' || confirmMessage === 'Kyllä' || confirmMessage === "Ja") {
            handleDelete();

            handleClose();
        } else {
            snackbarContext.displayWarningSnackbar(
                'Please enter "Yes" to confirm',
            );
        }
    };

    const getDeleteButton = (type) => {
        if (type == "memory"){
            return (
                <Button size="small" color="secondary" onClick={handleClickOpen}>
                    {t('deleteDialog.buttonDelete')}
                </Button>
            )
        }
        if (type == "category"){
            return (
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    {t('deleteDialog.buttonDelete')}
                </Button>
            )
        }
    }

    return (
        <div>
            {getDeleteButton(type)}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{t('deleteDialog.deleteTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('deleteDialog.deleteConfirmQuestion')}
                        <br/>
                        {t('deleteDialog.deleteConfirmInstruction')}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirm"
                        label={t('deleteDialog.confirm')}
                        type="text"
                        fullWidth
                        onChange={handleConfirmMessageChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('deleteDialog.cancel')}
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {t('deleteDialog.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteDialog;
