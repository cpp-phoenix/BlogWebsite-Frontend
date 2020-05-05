import React from 'react';
import { RestConstants } from '../Constants/application.constants';
import {Typography} from '@material-ui/core';
import ReactLoading from "react-loading";
import PostCard from './PostCard';

class MyPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: this.props.userDetails,
            size: 10,
            page: 1,
            savedPosts: [],
            fetchedSuccess: 0
        }    
    }

    fetchMyPosts = () => {
        if(this.props.userDetails.createdposts === undefined || this.props.userDetails.createdposts === 0) {
            this.setState({fetchedSuccess: 1});
        }
        else {
        const postRequest = {
            PostIds: this.state.userDetails.createdposts,
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
                this.setState({savedPosts: res.Data, fetchedSuccess: 1});
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

    render() {
        let {savedPosts} = this.state;
        if(this.state.fetchedSuccess !== 1) {
            return (
                <div style={{textAlign:`center`, width: `100%`,height: `100%`, paddingLeft: `45%`, marginTop: `10%`}}><ReactLoading type={"bars"} color={"yellowgreen"} /></div>
            )
        }
        if (savedPosts.length === 0) {
            return (
                <div className="emptySavedPosts">
                    <Typography className="EmptySavedHeading" variant="h5" component="h2">
                    You haven’t propagated anything Yet !
                    </Typography>
                    <Typography className="EmptySavedSubHeading" color="textSecondary">
                    Click on propagate to post your first post.
                    </Typography>
                </div>
            )
        }
        return(
            <div className="HomeOuterClass">
                <div className = "innerShell">
                    <div className="propogates">
                    {savedPosts.map((value, index) => {
                    return  <PostCard value = {value} userDetails = {this.state.userDetails}/>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}   

export default MyPosts;