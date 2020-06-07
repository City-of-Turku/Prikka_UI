/**
 * Component used to display reported memories
 */

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Category, Memory, MemoryReport} from '../types';
import Moment from 'react-moment';
import {Table, TableCell, TableRow, TextField} from "@material-ui/core";
import {apis} from "../services/apis";
import {AxiosError, AxiosResponse} from "axios";
import {useSnackbarContext} from "../contexts/SnackbarContext";
import ReportCard from "./ReportCard";

const useStyles = makeStyles({
    root: {
        maxWidth: 1200,
    },
    media: {
        height: 140,
    },
    archiveReason: {
        width: 300,
    }
});


interface IMemoryCard {
    t(key, opts?): Function;
    memory: Memory;
    category: Category;
    controls?: boolean;
    handleDeleteMemory?(): void;
    handleSubmitMoveMemoryToArchive?(archiveReason: string): void;
}

function getImageUrl(photo) {
    console.log(photo);
    if (photo) {
        return process.env.BACK_URL + '/uploads/' + photo.filename;
    }
    return "/images/placeholder_small.jpg";
}

const MemoryCard: React.FC<IMemoryCard> = ({
    t,
    memory,
    category,
    controls,
    handleDeleteMemory,
    handleSubmitMoveMemoryToArchive
}) => {

    const classes = useStyles();
    const snackbarContext = useSnackbarContext();
    const imageUrl = getImageUrl(JSON.parse(memory.photo));

    const [archiveReason, setArchiveReason] = useState<string>('');

    const handleSubmitUpdateActionForReport = (report: MemoryReport, invalid: boolean) => {
        const data = {
            invalid: invalid,
        };
        apis.admin
            .adminUpdateMemoryReportsById((report.id), data)
            .then((res: AxiosResponse) => {
                // TODO This refresch of the memoryreport status does not work
                // Check handleDeleteMemory in reported_memories.tsx
                fetchOneMemory(memory.id);
                snackbarContext.displaySuccessSnackbar('Memory report updated');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const fetchOneMemory = (memoryId: number) => {
        apis.memories
            .getMemoryById(memoryId)
            .then((res: AxiosResponse) => {
                memory = res.data;
            })
            .catch((err: AxiosError) => {
                // Error
            });
    };

    const handleSubmitMoveMemoryToArchiveLocal = () => {
        handleSubmitMoveMemoryToArchive(archiveReason);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArchiveReason(event.target.value);
    };

    const displayHeaders = () => {
        return (
            <>
                <TableRow>
                    <TableCell>{t('reportCard.headerCreated')}</TableCell>
                    <TableCell>{t('reportCard.headerComplaint')}</TableCell>
                    <TableCell>{t('reportCard.headerNoAction')}</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </>
        )
    };

    const displayReportsForMemory = ({Reports}) => (
        <>
            {Reports.map(report => (
                <ReportCard
                    t={t}
                    memoryReport={report}
                    handleSubmitUpdateActionForReport={(invalid) =>
                        handleSubmitUpdateActionForReport(report, invalid)}
                >
                </ReportCard>
            ))}
        </>
    );

    return (
        <Card className={classes.root}>
            <CardActionArea>

                {/* Memory picture */}
                <CardMedia className={classes.media} image={imageUrl} title={imageUrl}/>

                <CardContent>
                    {/* Title */}
                    <Typography gutterBottom variant="h5" component="h2">
                        {memory.title}
                    </Typography>

                    {/* Category */}
                    {/*<Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {category.name}
                    </Typography>*/}

                    {/* Date */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        <Moment format="YYYY/MM/DD">{memory.createdAt}</Moment> / {memory.User.userName}
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                    >
                        {memory.description}
                    </Typography>

                    {/* Reported */}
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                    >
                        <Table>
                            {displayHeaders()}
                            {displayReportsForMemory(memory)}
                        </Table>
                    </Typography>

                </CardContent>
            </CardActionArea>
            {controls ? (
                <CardActions>
                    <Button size="small" color="primary" onClick={handleDeleteMemory}>
                        {t('reportedMemoryCard.buttonDeleteMemory')}
                    </Button>
                    <Button size="small" color="primary" onClick={handleSubmitMoveMemoryToArchiveLocal}>
                        {t('reportedMemoryCard.buttonMoveMemoryToArchive')}
                    </Button>
                    <form className={classes.archiveReason} noValidate autoComplete="off">
                        <TextField id="standard-basic"
                                   label={t('reportedMemoryCard.archiveReason')}
                                   onChange={handleOnChange} />
                    </form>
                </CardActions>
            ) : null}
        </Card>
    );
};

export default MemoryCard;
