/**
 * This component shows one Report for a memory
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {MemoryReport} from '../types';
import Moment from 'react-moment';
import {TableCell, TableRow} from "@material-ui/core";
import {apis} from "../services/apis";
import {AxiosError, AxiosResponse} from "axios";
import {useSnackbarContext} from "../contexts/SnackbarContext";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 140,
    },
});


interface IReportCard {
    t(key, opts?): Function;
    memoryReport: MemoryReport;
}

const ReportCard: React.FC<IReportCard> = ({
    t,
    memoryReport
}) => {

    const classes = useStyles();
    const snackbarContext = useSnackbarContext();

    const handleSubmitNoActionForReport = (props) => {
        const data = {
            invalid: !(memoryReport.invalid),
        };
        apis.admin
            .adminUpdateMemoryReportsById((memoryReport.id), data)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Memory report updated');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const showActionButton = () => {
        if (memoryReport.invalid === true) {
            return (
                <Typography variant="body2" color="textSecondary" component="p">
                    <Moment format="YYYY/MM/DD">{memoryReport.updateAt}</Moment>
                </Typography>
            )
        }
        return (
            <Button size="small" color="primary" onClick={handleSubmitNoActionForReport}>
                {t('reportCard.buttonNoAction')}
            </Button>
        )
    }

    return (
        <TableRow>
            <TableCell>
                <Moment format="YYYY/MM/DD">{memoryReport.createdAt}</Moment>
            </TableCell>
            <TableCell>
                {memoryReport.description}
            </TableCell>
            <TableCell>
                <Checkbox checked={memoryReport.invalid} disabled={true}/>
            </TableCell>
            <TableCell>
                {showActionButton()}
            </TableCell>
        </TableRow>
    );
};

export default ReportCard;
