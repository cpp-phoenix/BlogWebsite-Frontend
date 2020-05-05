import React from 'react';
import { Typography } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyPosts from './MyPosts';
import MyLikes from './MyLikes';
import { RestConstants } from '../Constants/application.constants';
import MyAvatar from './MyAvatar';
import '../Styles/Profile.css'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        let selectedPage = localStorage.getItem('profilepageview')
        if (selectedPage === null) {
            selectedPage = "Post"
        }
        this.state = {
            userDetails: "",
            followers: localStorage.getItem('followers') !== null ? localStorage.getItem('followers') : 0,
            following: localStorage.getItem('following') !== null ? localStorage.getItem('following') : 0,
            postNavbarClass: selectedPage === "Post" ? "userDetilsNavButtonSelected" : "userDetilsNavButton",
            postNavbarTextClass: selectedPage === "Post" ? "postsTextSelected" : "postsText",
            likesNavbarClass: selectedPage === "Likes" ? "userDetilsNavButtonSelected" : "userDetilsNavButton",
            likeNavbarTextClass: selectedPage === "Likes" ? "likesTextSelected" : "likesText",
            avatarNavbarClass: selectedPage === "Avatar" ? "userDetilsNavButtonSelected" : "userDetilsNavButton",
            avatarNavbarTextClass: selectedPage === "Avatar" ? "avatarTextSelected" : "avatarText",
            currentlySelected: selectedPage,
            Avatar: localStorage.getItem('avatar')
        }
    }

    fetchUserDetails = () => {
        const postRequest = {
            UserName: localStorage.getItem('username')
        }
        fetch(RestConstants.FETCH_USER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accpet': 'application/json'
            },
            body: JSON.stringify(postRequest)
          }).then(response => response.json()).then(res => {
            if (res.Status ===3000) {
                localStorage.setItem('avatar', res.Data.avatar)
                if(res.Data.followers === undefined) {
                    res.Data.followers = []
                }
                if(res.Data.following === undefined) {
                    res.Data.following = []
                }
                localStorage.setItem('followers', res.Data.followers.length)
                localStorage.setItem('following', res.Data.following.length)
                this.setState({userDetails: res.Data, Avatar: localStorage.getItem('avatar')})
            } 
        }).catch(error => {});
    }

    componentDidMount() {
        this.fetchUserDetails()
    }

    selectPost = () => {
        this.setState({
            postNavbarClass: "userDetilsNavButtonSelected",
            postNavbarTextClass: "postsTextSelected",
            likesNavbarClass: "userDetilsNavButton",
            likeNavbarTextClass: "likesText",
            avatarNavbarClass: "userDetilsNavButton",
            avatarNavbarTextClass: "avatarText",
            currentlySelected: "Post"
        })
        localStorage.setItem('profilepageview', 'Post')
    }

    selectLikes = () => {
        this.setState({
            postNavbarClass: "userDetilsNavButton",
            postNavbarTextClass: "postsText",
            likesNavbarClass: "userDetilsNavButtonSelected",
            likeNavbarTextClass: "likesTextSelected",
            avatarNavbarClass: "userDetilsNavButton",
            avatarNavbarTextClass: "avatarText",
            currentlySelected: "Likes"
        })
        localStorage.setItem('profilepageview', 'Likes')
    }

    selectAvatar = () => {
        this.setState({
            postNavbarClass: "userDetilsNavButton",
            postNavbarTextClass: "postsText",
            likesNavbarClass: "userDetilsNavButton",
            likeNavbarTextClass: "likesText",
            avatarNavbarClass: "userDetilsNavButtonSelected",
            avatarNavbarTextClass: "avatarTextSelected",
            currentlySelected: "Avatar"
        })
        localStorage.setItem('profilepageview', 'Avatar')
    }

    updateAvatar = (avatar) => {
        this.setState({Avatar: avatar})
    }

    render() {
        var months = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var joinedDate = new Date(this.state.userDetails.createdtimestamp * 1000);
        return (
            <div className="profileBody">
                <div className="profileCard">
                    <div style={{
                        backgroundImage: `url(../Avatars/avatar`+localStorage.getItem('avatar')+`.svg)`,
                        backgroundColor: `white`,
                        height: `15vh`,
                        marginTop: `0.5vh`,
                        marginRight: `0.7vw`,
                        marginLeft: `2vw`,
                        zIndex: `3`,
                        width:`15vh`,
                        borderRadius: `500vw`,
                        border: `2px solid yellowgreen`
                    }}></div>
                    <div style={{display: `flex`,marginLeft: `1.8vw`, textAlign: `center`}}>
                    <Typography className="PostCardName" variant="h6" component="h5">
                            {this.state.userDetails.name}
                    </Typography> 
                    <Typography className="PostCardUserName" style={{marginTop: '0.3vh'}} color="textSecondary">
                        @{this.state.userDetails.username}
                    </Typography>
                    </div>
                    <Typography className="PostCardUserName" color="textSecondary" style={{marginTop: '0.5vh'}}>
                        <DateRangeIcon/> Joined {months[joinedDate.getMonth()]} {joinedDate.getFullYear()}
                    </Typography>
                    <div className="followerFollowing" style={{marginTop: '0.5vh'}}>
                        <div className="following"> <b>{this.state.following }</b> <Typography className="followingInt" color="textSecondary">Following</Typography></div>
                        <div className="followers"> <b>{this.state.followers }</b> <Typography className="followerInt" color="textSecondary">Followers</Typography></div>
                    </div>
                </div>
                <div className="headerDiv"></div>
                <div className="UserDetails"></div>
                <div className="UserDetailsCard">
                <List className="userDetilsNav">
                    <ListItem onClick={this.selectPost} button className={this.state.postNavbarClass}>
                        <ListItemText className={this.state.postNavbarTextClass} primary="Posts" />
                    </ListItem>
                    <ListItem onClick={() => this.selectLikes()} button className={this.state.likesNavbarClass}>
                        <ListItemText className={this.state.likeNavbarTextClass} style={{marginLeft: `3vw`}} inset primary="Likes" />
                    </ListItem>
                    <ListItem onClick={() => this.selectAvatar()} button className={this.state.avatarNavbarClass}>
                        <ListItemText className={this.state.avatarNavbarTextClass} style={{marginLeft: `2vw`, fontColor: `red !important`}} inset primary="My Avatar" />
                    </ListItem>
                </List>
                </div>
                <div className="bottomSelectedOption">
                    {this.state.userDetails !== "" && this.state.currentlySelected === "Post" &&  <MyPosts userDetails = {this.state.userDetails}/>}
                    {this.state.userDetails !== "" && this.state.currentlySelected === "Likes" &&  <MyLikes userDetails = {this.state.userDetails}/>}
                    {this.state.userDetails !== "" && this.state.currentlySelected === "Avatar" &&  <MyAvatar updateAvatar={(avatarId) => {this.updateAvatar(avatarId)}} userDetails = {this.state.userDetails}/>}
                </div>
            </div>
        )
    }
}

export default Profile;