import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userAdd } from '../store/auth/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  btn: {},
  media: {
    height: 0,
    paddingTop: '56.25%', 
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

export default function Profile(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const [expanded, setExpanded] = React.useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth', {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        dispatch(userAdd(res.data));
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
      
        <div>
          <div className={classes.demo}>
            <CardHeader
              avatar={
                <Avatar
                  src={user?.profilefile && `http://localhost:5000/uploads/${user?.profilefile}`}
                  aria-label='Profile'
                  className={classes.avatar}
                ></Avatar>
              }
            />
          </div>

          <div className={classes.demos}>
            {user?.firstName} {user?.lastName}
          </div>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              Mobile No :- {user?.phone}
            </Typography>
            <Typography
              className={classes.pos}
              color='textSecondary'
              gutterBottom
            >
              Gender :- {user?.gender}
            </Typography>
            <Typography
              className={classes.pos}
              color='textSecondary'
              gutterBottom
            >
              Email :- {user?.email}
            </Typography>
          </CardContent>
        </div>
      
    </Card>
  );
}

