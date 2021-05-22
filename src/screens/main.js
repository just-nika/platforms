import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useParams, Redirect, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableContainer } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { auth, firebase, firestore } from '../firebase/firebase.config'
import swal from 'sweetalert';

export default function MainPage() {
  return (
    <div>
      <Router>
        <Switch>
          <Route to="/">
            <Login />  
          </Route>
          <Route to="/home">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  )
  function Main() {
    return (
        <div>
            a
        </div>
    )
  }
  function Login() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = (index) => {
      setValue(index);
    };
    const history = useHistory();
    const userPassAuth = () => {
      const email = document.getElementById("mail").value;
      const password = document.getElementById("pass").value;
      auth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        swal({
          title: "სისტემაში წარმატებულად შეხვედით!",
          icon: "success",
          dangerMode: true,
        })
        .catch((error) => {
          swal({
            title: "სისტემაში შესვლისას წარმოიშვა შეცდომა, გთხოვთ სცადოთ თავიდან.",
            icon: "error",
            dangerMode: true,
          })
        });
        history.push("/home");
      })
    }
    const userRegister = () => {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const id = document.getElementById("id").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        firestore.collection("users").add({
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          id: id
        })
        swal({
          title: "რეგისტრაცია წარმატებით დასრულდა!",
          icon: "success",
          dangerMode: true,
        })
      })
      .catch((error) => {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to leave this page?",
          icon: "warning",
          dangerMode: true,
        })
      });
      history.push("/home");
    }
    // firestore.collection('users').get().then(snap => {
    //   const size = snap.size
    //   console.log(size)
    // });
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{minHeight: "100%"}}
          >
            <Tab label="შესვლა" {...a11yProps(0)} />
            <Tab label="რეგისტრაცია" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{minHeight: "100%"}}
        >
          <TabPanel value={value} index={0} dir={theme.direction} style={{height: "100%"}}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  შესვლა
                </Typography>
                <form className={classes.form} noValidate onSubmit={(event) => event.preventDefault()}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="mail"
                    label="ელ. ფოსტა"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="პაროლი"
                    type="password"
                    id="pass"
                    autoComplete="current-password"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={userPassAuth}
                  >
                    შესვლა
                  </Button>
                </form>
              </div>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  რეგისტრაცია
                </Typography>
                <br />
                <form className={classes.form} noValidate onSubmit={(event) => event.preventDefault()}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="სახელი"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="გვარი"
                        name="lastName"
                        autoComplete="lastname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="id"
                        label="პირადი ნომერი"
                        name="id"
                        autoComplete="id"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="ელ. ფოსტა"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="პაროლი"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={userRegister}
                  >
                    რეგისტრაცია
                  </Button>
                </form>
              </div>
            </Container>
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  }
}