import React from 'react';
import { Typography, Link } from '@material-ui/core';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red, green } from '@material-ui/core/colors';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import '../Styles/HomePage.css'

class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: this.props.userDetails,
            postID: this.props.value.postid,
            toggleFavourite: ((this.props.userDetails.likedposts) && (this.props.userDetails.likedposts.length !== 0) && (this.props.userDetails.likedposts.indexOf(this.props.value.postid) !== -1)) ? true: false,
            toggleBookmark: ((this.props.userDetails.savedposts) && (this.props.userDetails.savedposts.length !== 0) && (this.props.userDetails.savedposts.indexOf(this.props.value.postid) !== -1)) ? true : false,
            toggleChat: false,
            toggleSend: false,
            postDetails : this.props.value
        }
    }

    getDateTime(value) {
        var timeRange = (new Date().getTime() - (value.updatedtimestamp * 1000));
        timeRange = timeRange / 1000;
        if (timeRange < 60) {
             return timeRange.toString() + " s"
        } 
        else if (timeRange < 3600) {
            return Math.round(timeRange/60).toString() + "m"
        }
        else if (timeRange < (3600 * 24)) {
            return Math.round(timeRange/(3600)).toString() + "h"
        }
        else {
            return Math.round(timeRange / (3600 * 24)).toString() + "d"
        }
     }

    toggleFavourite = () => {
        if(this.state.toggleFavourite === false) {
            let postDetails = this.state.postDetails;
            if(postDetails.likedby === undefined) {
                postDetails.likedby = []
            }
            postDetails.likedby.push(this.state.userDetails.username)
            this.setState({postDetails: postDetails});
            this.setState({toggleFavourite : true})
            const postRequest = {
                UserName: localStorage.getItem('username'),
                PostId: parseInt(this.state.postID)
            }
            fetch("/saveLikesToDB", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accpet': 'application/json'
                },
                body: JSON.stringify(postRequest)
              }).then(response => response.json()).then(res => {
                if (res.Status !== 3013) {
                    this.setState({toggleFavourite : false})
                } 
            }).catch(error => {this.setState({toggleFavourite : false})});
        }
        else {
            let postDetails = this.state.postDetails;
            postDetails.likedby.splice(postDetails.likedby.indexOf(this.state.userDetails.username),1)
            this.setState({postDetails: postDetails});
            this.setState({toggleFavourite : false})
            const postRequest = {
                UserName: localStorage.getItem('username'),
                PostId: parseInt(this.state.postID)
            }
            fetch("/deleteLikesFromDB", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accpet': 'application/json'
                },
                body: JSON.stringify(postRequest)
              }).then(response => response.json()).then(res => {
                if (res.Status !== 3013) {
                    this.setState({toggleFavourite : true})
                } else if(this.props.calledBy !== undefined) {
                    this.props.updatePage(this.props.calledBy, this.state.postDetails)
                } 
            }).catch(error => {this.setState({toggleFavourite : true})});
        }
        if(this.props.calledBy === "SavedPostPage") {
            this.props.updateViewState();
        }
    } 

    toggleBookmark = () => {
        if(this.state.toggleBookmark === false) {
            this.setState({toggleBookmark : true})
            const postRequest = {
                UserName: localStorage.getItem('username'),
                PostId: parseInt(this.state.postID)
            }
            fetch("/saveBookmarksToDB", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accpet': 'application/json'
                },
                body: JSON.stringify(postRequest)
            }).then(response => response.json()).then(res => {
                if (res.Status !== 3013) {
                    this.setState({toggleBookmark : false})
                }
            }).catch(error => {this.setState({toggleBookmark : false})});
        }
        else {
            this.setState({toggleBookmark : false})
            const postRequest = {
                UserName: localStorage.getItem('username'),
                PostId: parseInt(this.state.postID)
            }
            fetch("/deleteBookmarksFromDB", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accpet': 'application/json'
                },
                body: JSON.stringify(postRequest)
            }).then(response => response.json()).then(res => {
                if (res.Status === 3013) {
                    if(this.props.calledBy !== undefined) {
                        this.props.updatePage(this.props.calledBy, this.state.postDetails)
                    } 
                } 
                else {
                    this.setState({toggleBookmark : true})
                }
            }).catch(error => {this.setState({toggleBookmark : true})});
        }
    } 
    
    toggleChat = () => {
        this.setState({toggleChat : this.state.toggleChat ? false : true})
    }

    toggleSend = () => {
        this.setState({toggleSend : this.state.toggleSend ? false : true})
    }   

    render () {
        return (
            <div className = "SinglePropagate">
                <div className="propagateFiddle">
                    <div style={{
                        backgroundImage: `url(../Avatars/avatar`+this.props.value.avatar+`.svg)`,
                        height: `5vh`,
                        marginTop: `0.2vh`,
                        marginLeft: `1vh`,
                        marginRight: `0.7vw`,
                        width:`5vh`,
                        borderRadius: `500vw`
                    }}></div>
                    <div className="profileOtherData">
                        <div className="propagateHeading"><Typography className="PostCardName" variant="h6" component="h5">
                            {this.state.postDetails.name} 
                            </Typography> 
                            <Typography className="PostCardUserName" color="textSecondary">
                            @{this.state.postDetails.username}
                            </Typography>  <Typography className="PostCardUserName" color="textSecondary">{this.getDateTime(this.state.postDetails)}</Typography>
                        </div>
                        <div className="propagateTitle"><Typography variant="h6" component="h5">{this.state.postDetails.title}</Typography></div>
                        <div className="propagateDescription" color="textSecondary">{this.state.postDetails.description}</div>
                        <div className="propagateOptions">
                            <div className="FavouriteItemButton" onClick = {() => this.toggleFavourite()}><Link>{this.state.toggleFavourite ? <FavoriteIcon style={{ color: red[500]}}/> :<FavoriteBorderIcon/>}</Link>{this.state.postDetails.likedby !== undefined ?this.state.postDetails.likedby.length:0}</div>
                            <div className="ChatItemButton"onClick = {() => this.toggleChat()}><Link><ChatOutlinedIcon/></Link>0</div>{this.toggleChat && <div className=""></div>}
                            <div className="SendItemButton"onClick = {() => this.toggleSend()}><Link><SendOutlinedIcon/></Link></div>
                            <div className="SavedItemButton"onClick = {() => this.toggleBookmark()}><Link>{this.state.toggleBookmark ? <BookmarkIcon style={{ color: green[500]}}/> :<BookmarkBorderOutlinedIcon/>}</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostCard;