import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  btn: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
  demo: {
    alignItems: 'center',
    alignContent: 'stretch',
    display: 'flex',
    justifyContent: 'space-around',
  },
  demos: {
    textAlign: 'center',
    padding: '0px',
  },
  texts: {
    textAlign: 'center',
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [users, setUsers] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth', {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        //console.log(res.data.token);
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('user Not Found', err);
      });
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      {
        // users.length > 0 &&
        [users].map((user) => (
          <>
            <div key={user._id}>
              <div className={classes.demo}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={user.profilefile && `http://localhost:5000/uploads/${user.profilefile}`}
                      // src='https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg'
                      aria-label='Profile'
                      className={classes.avatar}

                      //style={{ textAlign: 'center' }}
                    ></Avatar>
                  }
                />
              </div>

              <div className={classes.demos}>
                {user.firstName} {user.lastName}
              </div>
              <CardContent>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  Mobile No :- {user.phone}
                </Typography>
                <Typography
                  className={classes.pos}
                  color='textSecondary'
                  gutterBottom
                >
                  Gender :- {user.gender}
                </Typography>
                <Typography
                  className={classes.pos}
                  color='textSecondary'
                  gutterBottom
                >
                  Email :- {user.email}
                </Typography>
              </CardContent>
            </div>
          </>
        ))
      }
    </Card>
  );
}

// <CardActions disableSpacing>
// <IconButton aria-label='add to favorites'>
//   <FavoriteIcon />
// </IconButton>
// <IconButton aria-label='share'>
//   <ShareIcon />
// </IconButton>
// <IconButton
//   className={clsx(classes.expand, {
//     [classes.expandOpen]: expanded,
//   })}
//   onClick={handleExpandClick}
//   aria-expanded={expanded}
//   aria-label='show more'
// >
//   <ExpandMoreIcon />
// </IconButton>
// </CardActions>
