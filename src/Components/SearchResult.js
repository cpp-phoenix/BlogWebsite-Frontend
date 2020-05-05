import React from 'react';
import {Button, Typography} from '@material-ui/core';
import '../Styles/SearchResult.css'

class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        if(this.props.value !== undefined) {
            this.state = {
                following: this.props.value.followers === undefined || this.props.value.followers.indexOf(localStorage.getItem('username')) === -1 ? false : true
            }   
        }
        else {
            this.state = {
                following: false
            }
        }
    }

    follow() {
        let postRequest = {
            UserName: localStorage.getItem('username'),
            FollowingUserName: this.props.value.username
        }

        fetch("/updateFollowing", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accpet': 'application/json'
            },
            body: JSON.stringify(postRequest)
          }).then(response => response.json()).then(res => {
              if(res.Status === 3013) {
                this.setState({following: true})
                if (localStorage.getItem('following') !== "undefined") {
                    localStorage.setItem('following', (parseInt(localStorage.getItem('following')) + 1))
                }
              }
              else {
                  alert("Something Went Wrong Please Try Again")
              }
          }).catch(error => {});
          console.log("end")
    }


    unFollow() {
        let postRequest = {
            UserName: localStorage.getItem('username'),
            FollowingUserName: this.props.value.username
        }

        fetch("/unFollow", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accpet': 'application/json'
            },
            body: JSON.stringify(postRequest)
          }).then(response => response.json()).then(res => {
              if(res.Status === 3013) {
                this.setState({following: false})
                localStorage.setItem('following', localStorage.getItem('following')-1)
              }
              else {
                  alert("Something Went Wrong Please Try Again")
              }
          }).catch(error => {});
    }

    render() {
        if(this.props.showNoResults === true) {
            return (
                <div className="noResultCard">
                    <div className = "noResultsText">No Results !</div>
                </div>
            )
        }
        return (
            <div className="searchCard">
                <div style={{
                        backgroundImage: `url(../Avatars/avatar`+this.props.value.avatar+`.svg)`,
                        height: `5vh`,
                        marginTop: `0.2vh`,
                        marginLeft: `1vh`,
                        marginRight: `0.7vw`,
                        width:`5vh`,
                        borderRadius: `500vw`
                    }}></div>
                <div className="userDetails"><Typography className="SearchCardName" variant="h6" component="h5">
                            {this.props.value.name}
                            </Typography>
                            <Typography className="SearchCardUserName" color="textSecondary">
                            @{this.props.value.username}
                            </Typography></div>
                { this.props.value.username === localStorage.getItem('username') ? <div className="followContainerYou"><Button disabled className="followButtonYou" onClick={this.checkPost}>You</Button></div> : this.state.following === true ? <div className="followContainer"><Button className="followButton" onClick={() => this.unFollow()}>UnFollow</Button></div> : <div className="followContainer"><Button className="followButton" onClick={() => this.follow()}>Follow</Button></div>}          
            </div>
        )
    }
}

export default SearchResult;