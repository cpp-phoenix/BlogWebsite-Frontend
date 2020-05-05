import React from 'react';
import {Typography} from '@material-ui/core';
import { RestConstants } from '../Constants/application.constants';
import ReactLoading from "react-loading";
import PostCard from './PostCard';

class MyLikes extends React.Component {

    constructor(props) {
        console.log("Here!!")
        super(props);
        this.state = {
            userDetails: this.props.userDetails,
            size: 10,
            page: 1,
            likedPosts: [],
            fetchPostDetails: 0,
            pageName: "LikedPostPage"
        }    
    }

    fetchMyPosts = () => {
        if(this.state.userDetails.likedposts === undefined || this.state.userDetails.likedposts.length === 0) {
            this.setState({fetchPostDetails: 1});
        }
        else {
        const postRequest = {
            PostIds: this.state.userDetails.likedposts,
            Size: this.state.size,
            page: this.state.page
        }
        fetch(RestConstants.FETCH_POST_BY_POSTIDS, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accpet': 'application/json'
            },
            body: JSON.stringify(postRequest)
          }).then(response => response.json()).then(res => {
              if(res.Status === 3000) {
                this.setState({likedPosts: res.Data, fetchPostDetails: 1});
              }
          }).catch(error => {});
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
                this.setState({userDetails: res.Data});
                if(this.state.userDetails.likedposts !== null) {
                    this.fetchMyPosts();
                }
            } 
        }).catch(error => {});
    }

    componentDidMount() {
        this.fetchUserDetails()
    }

    updatePage(pageName, postDetails) {
        if(pageName === this.state.pageName) {
            let elements = this.state.likedPosts;
            for (let index = 0; index < elements.length; index++) {
                if(elements[index].postid === postDetails.postid) {
                    elements.splice(index, 1)
                }
            }
            this.setState({likedPosts: elements})
        }
    }

    render() {
        let likedPosts = this.state.likedPosts;
        if(this.state.fetchPostDetails !== 1) {
            return (
                <div style={{textAlign:`center`, width: `100%`,height: `100%`, paddingLeft: `45%`, marginTop: `10%`}}><ReactLoading type={"bars"} color={"yellowgreen"} /></div>
            )
        }
        if (likedPosts.length === 0) {
            return (
                <div className="emptySavedPosts">
                    <Typography className="EmptySavedHeading" variant="h5" component="h2">
                    You don’t have any likes yet !
                    </Typography>
                    <Typography className="EmptySavedSubHeading" color="textSecondary">
                    Tap the heart on any Propagate to show it some love. When you do, it’ll show up here.
                    </Typography>
                </div>
            )
        }
        return(
            <div className="HomeOuterClass">
                <div className = "innerShell">
                    <div className="propogates">
                    {likedPosts.map((value, index) => {
                    return  <PostCard key = {value.postid} value = {value} userDetails = {this.state.userDetails} calledBy = {this.state.pageName}  updatePage={(pageName, postDetails) => {this.updatePage(pageName, postDetails)}}/>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyLikes;