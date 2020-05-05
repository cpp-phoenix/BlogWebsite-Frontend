import React from 'react';
import {Typography} from '@material-ui/core';
import PostCard from './PostCard';
import ReactLoading from "react-loading";
import { RestConstants } from '../Constants/application.constants';
import '../Styles/SavedPosts.css'

class SavedPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            size: 10,
            page: 1,
            pageName: "SavedPostPage",
            savedPosts: [],
            userDetailsFetched: 0,
            postDetailsFetched: 0
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
                this.setState({userDetails: res.Data, userDetailsFetched: 1})
                if(this.state.userDetails.savedposts !== null) {
                    this.fetchMyPosts();
                }
            } 
        }).catch(error => {});
    }

    fetchMyPosts = () => {
        if(this.state.userDetails.savedposts === undefined || this.state.userDetails.savedposts.length === 0) {
            this.setState({postDetailsFetched: 1});
        }
        else {
            const postRequest = {
                PostIds: this.state.userDetails.savedposts,
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
                    this.setState({savedPosts: res.Data, postDetailsFetched: 1});
                }
            }).catch(error => {});
        }
    }

    componentDidMount() {
        this.fetchUserDetails();
    }

    updatePage(pageName, postDetails) {
        if(pageName === this.state.pageName) {
            let elements = this.state.savedPosts;
            for (let index = 0; index < elements.length; index++) {
                if(elements[index].postid === postDetails.postid) {
                    elements.splice(index, 1)
                }
            }
            this.setState({savedPosts: elements})
        }
    }

    render() {
        let savedPosts = this.state.savedPosts;
        if(this.state.userDetailsFetched !== 1 || this.state.postDetailsFetched !== 1) {
            return (
                <div style={{textAlign:`center`, width: `100%`,height: `100%`, paddingLeft: `45%`, marginTop: `45%`}}><ReactLoading type={"bars"} color={"yellowgreen"} /></div>
                )
        }
        if (savedPosts.length === 0) {
            return (
                <div className="emptySavedPosts">
                    <Typography className="EmptySavedHeading" variant="h5" component="h2">
                    You haven’t added any propagates to your Bookmarks yet !
                    </Typography>
                    <Typography className="EmptySavedSubHeading" color="textSecondary">
                    When you do, they’ll show up here.
                    </Typography>
                </div>
            )
        }
        return(
            <div className="HomeOuterClass">
                <div className = "innerShell">
                    <div className="propogates">
                    {savedPosts.map((value, index) => {
                    return  <PostCard key = {value.postid} value = {value} userDetails = {this.state.userDetails} calledBy = {this.state.pageName}  updatePage={(pageName, postDetails) => {this.updatePage(pageName, postDetails)}}/>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SavedPosts;