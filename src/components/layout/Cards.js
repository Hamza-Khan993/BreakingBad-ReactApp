import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import axios from 'axios'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            // height : "50%",
            paddingTop: '130.25%', // 16:9,
            alignSelf: "center",

        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },

        cardDiv: {
            display: "flex",
            gap: "5px",
            position: "relative",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            marginLeft: "40px",
            alignSelf: "center"
        }
    }),
);

const seasonStyle = {
    backgroundColor: "grey",
    color: " white",
    listStyleType: "none",
    border: "1px solid black",
    borderRadius: "50%",
    padding: "5px 10px"
}

export default function Cards(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [quotes, setQuotes] = React.useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getQuotes = async () => {
        const URLParams = new URLSearchParams();

        URLParams.set("author", props.name)

        const quotesres = await axios.get(`https://www.breakingbadapi.com/api/quote?${URLParams.toString()}`)


        setQuotes(quotesres.data);
    }

    useEffect(() => {
        getQuotes();
        //eslint-disable-next-line
    }, [])

    return (
        <Card key={props.id} className={classes.root} >
            <CardHeader
                title={props.name}
                subheader={`DOB: ${props.birthday}`}
            />
            <div>
                <CardMedia className={classes.media} image={props.img} />

            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Actor:</strong> {props.portrayed}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                    <strong>Nickname:</strong>  {props.nickname}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Occupations:</strong>  {props.occupation}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                    <strong>Status:</strong> {props.status}
                </Typography>
                <Typography className="text-center" variant="body2" color="textPrimary" component="div">
                    <strong>Seasons Appeared:</strong>
                    <ul className={classes.cardDiv}>
                        {props.appearance.map((season, index) => (
                            <li key={index} style={seasonStyle}>{season}</li>
                        ))}
                    </ul>
                </Typography>

            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="see Quotes">
                    <FormatQuoteIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {quotes.length > 0 ? quotes.map((quote) => {
                        return (
                            <Typography paragraph key={quote.id}>
                                {quote.quote}
                            </Typography>
                        )
                    }) : (
                        <Typography paragraph>
                            No Quotes
                        </Typography>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}