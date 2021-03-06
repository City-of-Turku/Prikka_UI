/**
 * Component used to display Memory card in the My memories interface
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Category, Memory} from '../types';
import DeleteDialog from './DeleteDialog';
import Moment from 'react-moment';
import ShareMemoryPopup from "./ShareMemoryPopup";
import Link from "next/link";
import {Button} from "@material-ui/core";
import {i18n} from "../i18n";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    customDescription: {
        whiteSpace: 'pre-line'
    }
});

interface IMemoryCard {
    t(key, opts?): Function;
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
    return null;
}

const MemoryCard: React.FC<IMemoryCard> = ({
    t,
    memory,
    category,
    controls,
    handleDeleteMemory
}) => {
    const classes = useStyles();
    const imageUrl = getImageUrl(JSON.parse(memory.photo));
    const shareUrl = `${process.env.FRONT_URL}/?memory=${memory.id}`;
    const shareTitle = 'Check out this memory at Prikka';
    const editUrl = `/edit_memory/?memory=${memory.id}`;

    let localeName = 'name' +i18n.language.toUpperCase();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {/* Memory picture */}
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title="Memory Picture"
                />
                <CardContent>
                    {/* Title */}
                    <Typography gutterBottom variant="h5" component="h2">
                        {memory.title}
                    </Typography>

                    {/* Category */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {category[localeName]}
                    </Typography>

                    {/* Date */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        <Moment format="YYYY/MM/DD">{memory.createdAt}</Moment> / {memory.User.displayName}
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                        className={classes.customDescription}
                    >
                        {memory.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {controls ? (
                <CardActions>
                    <ShareMemoryPopup t={t} shareMemoryUrl={shareUrl} shareMemoryTitle={shareTitle} />
                    <Link href={editUrl} passHref>
                        <Button component="a" >
                            {t('buttonEdit')}
                        </Button>
                    </Link>
                    <DeleteDialog
                        t={t}
                        handleDelete={handleDeleteMemory}
                        type={"memory"}
                    />
                </CardActions>
            ) : null}
        </Card>
    );
};

export default MemoryCard;
