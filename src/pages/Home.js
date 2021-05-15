import React, {useEffect,useState} from 'react'
import {connect} from 'react-redux';
import clsx from 'clsx';
import {makeStyles,withStyles} from '@material-ui/core/styles';
import {ParkInfo} from '../redux/actions/park'
import {
    Typography,Grid,TextField,Button, Paper,
    GridList, GridListTile, GridListTileBar,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton,Box
} from '@material-ui/core';


import StarBorderIcon from "@material-ui/icons/StarBorder";
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { red } from '@material-ui/core/colors';
import GoogleMapContainer from '../components/GoogleMapContainer';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1024,
        margin: "auto",
        padding: 20
    },
    title: {
        justifyContent:"center",
        display:"flex",
        margin:20
    },

    center: {
        justifyContent: "center",
        margin:"auto"
    },
    parkList:{
        padding:20,
    },
    searchText: {
        width:"100%"
    },
    searchButton:{
        height:"100% !important",
        [theme.breakpoints.down('sm')]: {
            width:"100%"
        },
    },
    image:{
        height:150,
        width:150,
        display:"flex",
        margin:"auto",
        marginBottom:10,

        [theme.breakpoints.down('sm')]: {
            width:110,
            height:110
        },
    },
    detailButton:{
        float:"right"
    },
    backButton:{
        float:"left"
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        padding: 20
    },
    title1: {
        color: "white",
        marginRight:10
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
    cardRoot: {
        minWidth: 345,
        marginBottom: 50,
        backgroundColor: '#fff',
        marginTop: 50
    },
    subCardBody: {
        display: 'flex',
        paddingLeft: 30
    },
    subTitle: {
        marginTop:20,
        marginBottom:20,
    },
    like: {
        color:"primary",
        float:"right",
        marginBottom: 20,
        marginRight:20
    },
    table: {
        width:"80%",
        margin:"auto"
    }
}));


const Home = (props) => {

    const classes = useStyles();
    const {parkInfo} = props;
    const [stateCode, setStateCode] = useState("");
    const [parkCode, setParkCode] = useState("");
    const [detail, setDetail] = useState(true);
    const [detailInfo,setDetailInfo] = useState({});
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(()=>{
        props.ParkInfo(parkCode,stateCode);
    },[]);

    useEffect(()=>{
        // console.log(parkInfo.data);
    },[parkInfo]);

    const handleSearchClick = () =>{
        props.ParkInfo(parkCode,stateCode);
    }

    const handlePark = (e) => {
        setParkCode(e.target.value);
    }

    const handleState = (e) => {
        setStateCode(e.target.value);
    }

    const handleDetail = (e) => {
        console.log(e);
        setDetailInfo(e);
        setDetail(false);
    }

    const handleBack = () =>{
        setDetail(true);
    }

    const showDetails = (response) => {
        return (
            <div className = {classes.root}>
                <Button size="large" onClick = {handleBack} className = {classes.backButton} variant="outlined" color="primary">
                    Back
                </Button>
                <Typography variant = "h2" align = "center" color ="primary" className={classes.subTitle}>
                    {response.name}
                </Typography>

                {/*Image List*/}
                <GridList className={classes.gridList} cols={3.3}>
                    {response.images.map((tile) => (
                        <GridListTile key={tile.url}>
                            <img
                                src={tile.url}
                                alt={tile.title}
                                width={200}
                                height={200}
                            />
                            <GridListTileBar
                                title={tile.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title1,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`star ${tile.title}`}>
                                        <StarBorderIcon className={classes.title1} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>


                {/*Account Info*/}
                <Card elevation = {10} className={classes.cardRoot}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {response.designation.substr(0,1)}
                            </Avatar>
                        }
                        title={
                            <Typography variant="h5" color="primary" component="p">
                                {response.designation}
                            </Typography>
                        }
                        color = "primary"
                    />
                    <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {response.description}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {response.directionsInfo}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body1" color="primary" component="p">
                            {response.directionsUrl}
                        </Typography>
                        <Box spacing = {2} className = {classes.like}>
                            <IconButton>
                                <ThumbDownOutlinedIcon/>
                            </IconButton>
                            <IconButton>
                                <ThumbUpOutlinedIcon/>
                            </IconButton>
                        </Box>
                    </CardContent>
                    
                </Card>

                <Grid container>
                    <Grid item xs = {6}>
                        <Typography variant="h5" color ="primary" align="center" className={classes.subTitle}>
                            Operating Hours
                        </Typography>

                        <TableContainer component={Paper} className={classes.table}>
                            <Table size = "small" aria-label="customized  table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Day</StyledTableCell>
                                        <StyledTableCell align="center">Content</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(response.operatingHours[0].standardHours).map((index, value) => {
                                            return (
                                                <TableRow key={index}>
                                                    <StyledTableCell align="center">{index}</StyledTableCell>
                                                    <StyledTableCell align="center">{response.operatingHours[0].standardHours[index]}</StyledTableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs = {6} >
                        <Typography color = "primary" variant = "h5" align="center" className={classes.subTitle}>
                            Entrance Fees
                        </Typography>

                        <TableContainer component={Paper} className = {classes.table}>
                            <Table size = "small" aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Title</StyledTableCell>
                                        <StyledTableCell align="center">Fee</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        response.entranceFees.map((res,index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <StyledTableCell align="center">{res.title}</StyledTableCell>
                                                    <StyledTableCell align="center">{res.cost}</StyledTableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                
                <GoogleMapContainer />
            </div>
        )
    }


    return (
        <div className = {classes.root}>

            {detail == true&&<Grid container spacing = {3} className = {classes.center}>
                <Grid item xs = {12}>
                    <Typography className = {classes.title} variant = "h3" color="primary">Park Search</Typography>
                </Grid>
                <Grid item sm = {3} xs = {12}>
                    <TextField onChange = {handleState} value ={stateCode} className = {classes.searchText} id="outlined-basic" label="state code" variant="outlined" />
                </Grid>
                <Grid item sm = {3} xs = {12}>
                    <TextField onChange = {handlePark} value = {parkCode} className = {classes.searchText} id="outlined-basic" label="park code" variant="outlined" />
                </Grid>
                <Grid item sm = {2} xs = {12} >
                    <Button onClick = {handleSearchClick} className = {classes.searchButton} variant="contained" color="primary" size = "large">
                        Search
                    </Button>
                </Grid>
                {typeof(parkInfo.data) !='undefined'&& parkInfo.data.map((row,i) => (
                    <Grid key = {i} item xs = {12}>
                        <Paper elevation={3} className = {classes.parkList}>
                            <Grid container spacing ={2 }>
                                <Grid item sm={3} className = {classes.center}>
                                    {typeof(row.images) !='undefined' &&
                                            <img
                                                className={classes.image}
                                                src={row.images[0].url}
                                                alt="loading"
                                            />
                                    }
                                    <Typography color = "primary" variant = "h6" align="center">
                                        ParkName: {row.name}
                                    </Typography>
                                </Grid>
                                <Grid item sm={9}>
                                    <Typography variant = "h6">
                                        State Code: {row.states}
                                    </Typography>
                                    <Typography variant = "h6">
                                        Description: {row.description}
                                    </Typography>
                                    <Button onClick = {()=>handleDetail(row)} className = {classes.detailButton} align = "right" variant="outlined" color="primary">
                                        Detail
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>}
            {
                detail == false &&
                showDetails(detailInfo)
            }
        </div>
    )
}

Home.propTypes = {

};

const mapStateToProps = state => ({
    parkInfo: state.park.parkInfo
});

const mapDispatchToProps = {
    ParkInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
