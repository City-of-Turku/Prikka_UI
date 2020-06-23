import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportIcon from '@material-ui/icons/Report';
import { IconButton } from '@material-ui/core';
import { apis } from '../services/apis';
import { AxiosResponse, AxiosError } from 'axios';
import { useSnackbarContext } from '../contexts/SnackbarContext';
import { Memory } from '../types';

interface IReportDialog {
    memory: Memory;
}
const ReportDialog: React.FC<IReportDialog> = ({ memory }) => {
    //States
    const [open, setOpen] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    //Contexts
    const snackbarContext = useSnackbarContext();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(event.target.value);
    };

    const handleSubmitReport = () => {
        const data = {
            title: 'Report',
            description: description,
            memoryId: memory.id,
        };
        handleClose();
        apis.memories
            .createMemoryReport(data)
            .then((res: AxiosResponse) => {
                if (res.data == 'Memory already reported by user.'){
                    snackbarContext.displayErrorSnackbar('You can only report a memory once.');
                }else{
                    snackbarContext.displaySuccessSnackbar('Memory reported');
                }
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    return (
        <div>
            <IconButton
                aria-label="report memory"
                component="span"
                onClick={handleClickOpen}
            >
                <ReportIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Report Memory</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To report this memory, please enter a description of the
                        issue here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitReport} color="primary">
                        Report
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReportDialog;
