import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { green , red} from '@material-ui/core/colors';
// import ExploreIcon from '@material-ui/icons/Explore';
// import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Redirect } from 'react-router';
import SavePost from './CreatePost';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../Styles/NavBar.css'
import { Button } from '@material-ui/core';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.activeTab,
            redirect: false,
            submitPost: false
        }
    }

    handleClick = param => event => {
        if (this.state.activeTab !== param) {
            this.setState({redirect: true, activeTab: param})
        }   
    }

    showHidePost(){
        this.setState({submitPost : this.state.submitPost ? false : true})
    }


    render() {
        if(this.state.redirect ) {
            if(this.state.activeTab === "LogOut") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("name");
                localStorage.removeItem("avatar");
                return <Redirect to={{
                    pathname: '/',
                    state: { 
                        loggedOut: true
                    }
                }} replace/>;
            }
            return <Redirect to={{
              pathname: '/mainPage/' + this.state.activeTab,
              state: { 
                auth: this.props.authorised,
                activeTab: this.state.activeTab
               }
          }} replace/>;
        }

        return(
        <div className="navbarMain">
            <div className="navHeading"><h1>Propagate</h1></div> <br/> 
            <div className="navbarList">
                <List>
                    <ListItem className="listItems" button onClick={this.handleClick("Home")}>
                        <ListItemIcon>{this.state.activeTab === "Home" ? <HomeIcon  style={{ color: green[500]}}/> : <HomeOutlinedIcon/> } </ListItemIcon>
                        <ListItemText  primary="Home" />
                    </ListItem>
                    {/* <ListItem className="listItems" button onClick={this.handleClick("Explore")}>
                        <ListItemIcon>{this.state.activeTab === "Explore" ? <ExploreIcon  style={{ color: green[500]}}/> : <ExploreOutlinedIcon/> }</ListItemIcon>
                        <ListItemText primary="Explore" />
                    </ListItem> */}
                    <ListItem className="listItems" button onClick={this.handleClick("Messages")}>
                        <ListItemIcon>{this.state.activeTab === "Messages" ? <ForumIcon  style={{ color: green[500]}}/> : <ForumOutlinedIcon/> }</ListItemIcon>
                        <ListItemText  primary="Messages" />
                    </ListItem>
                    <ListItem className="listItems" button onClick={this.handleClick("Notifications")}>
                        <ListItemIcon>{this.state.activeTab === "Notifications" ? <NotificationsActiveIcon  style={{ color: green[500]}}/> : <NotificationsOutlinedIcon/> }</ListItemIcon>
                        <ListItemText  primary="Notifications" />
                    </ListItem>
                    <ListItem className="listItems" button onClick={this.handleClick("Profile")}>
                        <ListItemIcon>{this.state.activeTab === "Profile" ? <AccountBoxIcon  style={{ color: green[500]}}/> : <PermIdentityOutlinedIcon/> }</ListItemIcon>
                        <ListItemText  primary="Profile" />
                    </ListItem>
                    <ListItem className="listItems" button onClick={this.handleClick("Saved")}>
                        <ListItemIcon>{this.state.activeTab === "Saved" ? <BookmarkIcon  style={{ color: red[60]}}/> : <BookmarkBorderIcon/> }</ListItemIcon>
                        <ListItemText  primary="Saved" />
                    </ListItem>
                    <ListItem className="listItems" button onClick={this.handleClick("LogOut")}>
                        <ListItemIcon><ExitToAppIcon  style={{ color: green[500]}}/></ListItemIcon>
                        <ListItemText  primary="LogOut" />
                    </ListItem>
                </List>
            <div className="navPostButton"> <Button className="navInternalButton" onClick={() => this.showHidePost()}>Propagate</Button> </div> 
            {this.state.submitPost && <div className="createPost"><SavePost rows={8} showClose={true} updateViewState={() => {this.showHidePost()}}/></div> }
        </div>
        </div>
        )
    }
}

export default NavBar;