import React, { Component } from 'react'
import { Redirect } from 'react-router';
import NavBar from './NavBar';
import Explore from './ExplorePage';
// import Explore from './ExplorePage';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Messages from './MessagesPage';
import ReactLoading from "react-loading";
import Notifications from './NotificationsPage';
import Profile from './ProfilePage';
import SearchResult from './SearchResult';
import SavedPosts from './SavedPosts';
import Home from './HomePage';
import { Typography } from '@material-ui/core';
import '../Styles/BlogMain.css'

class BlogMain extends Component {
    constructor(props) {
        super(props);   
        const authorised = (typeof(this.props.location.state) !== 'undefined') ? this.props.location.state.auth : false;   
        const activeTabs = (typeof(this.props.location.state) !== 'undefined') ? this.props.location.state.activeTab : "Home"; 
        this.state = {
            auth: authorised,
            activeTab: activeTabs,
            loading: false,
            searchingFor: "",
            elements: [],
            page: 1,
            size: 10
        }
    }

    searchUsername = (event) =>{
        this.setState({searchingFor: event.target.value})
        if(event.target.value !== "") {
            this.setState({loading: true})
            const postRequest = {
                UserName: event.target.value,
                Page: this.state.page,
                Size: this.state.size
            }
            fetch("/searchUsername", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accpet': 'application/json'
                },
                body: JSON.stringify(postRequest)
                }).then(response => response.json()).then(res => {
                if (res.Status === 3000) {
                    if(res.Data === null) {
                        res.Data = []
                    }
                    this.setState({elements: res.Data, loading: false})
                } 
            }).catch(error => {});
        }
        else {
            this.setState({elements: []})
        }
    }

    render() {
        let elements = this.state.elements
        if (!this.state.auth) {
            return <Redirect replace to="/" />;
        }
        return (
        <div className = "mainBlog">
            <div className = "navbar"><NavBar authorised={this.state.auth} activeTab={this.state.activeTab} /></div>    
            <div className = "middlePallete"> 
                <div className = "headingbar"><Typography className="headingText">{this.state.activeTab}</Typography></div>
                <div className = "rightBottomPallete">
                    {this.state.activeTab === "Home" && <Home />}
                    {this.state.activeTab === "Explore" && <Explore />}
                    {this.state.activeTab === "Messages" && <Messages />}
                    {this.state.activeTab === "Notifications" && <Notifications />}
                    {this.state.activeTab === "Profile" && <Profile />}
                    {this.state.activeTab === "Saved" && <SavedPosts />}
                </div>
            </div>
            <div className="leftbar">
                <div className="innerSearchBox" onChange={this.searchUsername}>
                    <TextField className="searchBoxTextField"
                        placeholder="Search Username"
                        variant="outlined"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                    />
                    { this.state.loading === true && <div style={{textAlign:`center`, width: `100%`,height: `100%`, paddingLeft: `45%`, marginTop: `10%`}}><ReactLoading type={"bars"} color={"yellowgreen"} /></div>}
                    { this.state.loading === false && this.state.searchingFor !== "" && this.state.elements.length === 0 && <SearchResult showNoResults={true} />} 
                    { this.state.loading === false && this.state.searchingFor !== "" && this.state.elements.length !== 0 &&
                    <div className="searchResults">
                        {elements.map((value, index) => {
                        return  <SearchResult value = {value} showNoResults={false}/>
                        })}
                    </div>
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default BlogMain;