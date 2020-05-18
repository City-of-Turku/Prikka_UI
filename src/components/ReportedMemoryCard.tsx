/**
 * Component used to display sample data while My Memory page is not working
 */

import React, {memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Category, Memory} from '../types';
import { NextPage } from 'next';
import DeleteMemoryDialog from './DeleteMemoryDialog';
import Moment from 'react-moment';
import {List, ListItem} from "@material-ui/core";
import {Table, TableRow, TableCell} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 140,
    },
});

const displayReportedMemories = ({Reports}) => (
    <>
        {Reports.map(report => (
            <TableRow>
                <TableCell>
                    <Moment format="YYYY/MM/DD">{report.createdAt}</Moment>
                </TableCell>
                <TableCell>
                    {report.description}
                </TableCell>
                <TableCell>
                    <CardActions>
                        <Button size="small" color="primary">
                            Delete
                        </Button>
                    </CardActions>
                </TableCell>
            </TableRow>
        ))}
    </>
);

interface IMemoryCard {
    memory: Memory;
    category: Category;
    controls?: boolean;
    handleDeleteMemory?(): void;
}


function getImageUrl(photo) {
    console.log(photo);
    if (photo) {
        return process.env.BACK_URL + '/uploads/' + photo.filename;
    }
    return "/images/placeholder_small.jpg";
}

const MemoryCard: React.FC<IMemoryCard> = ({
    memory,
    category,
    controls,
    handleDeleteMemory,
}) => {
    const classes = useStyles();
    const imageUrl = getImageUrl(JSON.parse(memory.photo));

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {/* Memory picture */}
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={imageUrl}
                />
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
                        <Moment format="YYYY/MM/DD">{memory.createdAt}</Moment>
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
                            {displayReportedMemories(memory)}
                        </Table>
                    </Typography>

                </CardContent>
            </CardActionArea>
            {controls ? (
                <CardActions>
                    <Button size="small" color="primary">
                        Update memory
                    </Button>
                    <DeleteMemoryDialog
                        handleDeleteMemory={handleDeleteMemory}
                        memoryId={memory.id}
                    />
                </CardActions>
            ) : null}
        </Card>
    );
};

export default MemoryCard;
