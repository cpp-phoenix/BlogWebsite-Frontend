import React from 'react';
import PostCard from './PostCard';
import { RestConstants } from '../Constants/application.constants';
import ReactLoading from "react-loading";
import {Typography} from '@material-ui/core';
// import SavePost from './CreatePost';
import '../Styles/HomePage.css'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            page: 1,
            size: 10,
            userDetails:[],
            userDetailsFetched: 0,
            postDetailsFetched: 0,
        }
    }

    fetchPostDetails = () => {
        const postRequest = {
            Size: this.state.size,
            Page: this.state.page
        }
        fetch(RestConstants.FETCH_POST, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accpet': 'application/json'
            },
            body: JSON.stringify(postRequest)
          }).then(response => response.json()).then(res => {
            if (res.Status === 3000) {
                this.setState({elements: res.Data, postDetailsFetched: 1})
                this.populateLikedToggle(this.state.newElements)
            } 
          }).catch(error => {});
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
            if (res.Status === 3000) {
                this.setState({userDetails: res.Data, userDetailsFetched: 1})
                localStorage.setItem("name", res.Data.name);
            } 
        }).catch(error => {});
    }

    componentDidMount() {
        this.fetchPostDetails()
        this.fetchUserDetails()
    }

    render() {
        let elements = this.state.elements;
        if (this.state.userDetailsFetched !==1 || this.state.postDetailsFetched !==1) {
            return (
                <div style={{textAlign:`center`, width: `100%`,height: `100%`, paddingLeft: `45%`, marginTop: `45%`}}><ReactLoading type={"bars"} color={"yellowgreen"} /></div>
            )
        }
        if(elements.length === 0) {
            return (
                <div className="emptySavedPosts">
                    <Typography className="EmptySavedHeading" variant="h5" component="h2">
                    No posts to show !
                    </Typography>
                    <Typography className="EmptySavedSubHeading" color="textSecondary">
                    When you post, they’ll show up here.
                    </Typography>
                </div>
            )
        }
        return (
            <div className="HomeOuterClass">
                {/* <div><SavePost rows={2}></SavePost></div> */}
                <div className = "innerShell">
                    <div className="propogates">
                    {elements.map((value, index) => {
                    return  <PostCard key= {value.postid} userDetails={this.state.userDetails} value = {value}/>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;