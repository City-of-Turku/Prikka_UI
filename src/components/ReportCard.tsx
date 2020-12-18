/**
 * This component shows one Report for a memory
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {MemoryReport} from '../types';
import Moment from 'react-moment';
import {TableCell, TableRow} from "@material-ui/core";
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
    handleSubmitUpdateActionForReport?(invalid: boolean): void;
}

const ReportCard: React.FC<IReportCard> = ({
    t,
    memoryReport,
    handleSubmitUpdateActionForReport
}) => {

    const classes = useStyles();
    const snackbarContext = useSnackbarContext();

    const handleSubmitUpdateActionForReportLocal = () => {
        // Set the invalid paramter to be opposite to the one in the table.
        // For the moment it is only possible to set it to true but
        // the function supports both ways.
        handleSubmitUpdateActionForReport(!(memoryReport.invalid));
    }

    const showActionButton = () => {
        if (memoryReport.invalid === true) {
            return (
                <Typography variant="body2" color="textSecondary" component="p">
                    <Moment format="YYYY/MM/DD">{memoryReport.updateAt}</Moment>
                </Typography>
            )
        }
        return (
            <Button size="small" color="primary" onClick={handleSubmitUpdateActionForReportLocal}>
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
