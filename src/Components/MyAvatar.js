import React from 'react';
import {Typography, Button, Link} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import '../Styles/MyAvatar.css';

class MyAvatar extends React.Component {

    constructor() {
        super();
        this.state={
            avatar: localStorage.getItem("avatar"),
            username: localStorage.getItem("username")
        }
    }

    choose = (avatar) => {
        this.setState({avatar: avatar})
    }

    saveAvatar = () => {
        const avatarRequest = {
            UserName: this.state.username,
            Avatar: parseInt(this.state.avatar)
        }
        fetch("/updateAvatar", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accpet': 'application/json'
            },
            body: JSON.stringify(avatarRequest)
          }).then(response => response.json()).then(res => {
              if(res.Status === 3013) {
                localStorage.setItem("avatar",this.state.avatar)
                this.props.updateAvatar(this.state.avatar)
              }
          }).catch(error => {});
    }

    render() {
        return (
            <div className="emptySavedPosts">
                <Typography className="EmptySavedHeading" variant="h5" component="h2">
                Look on your Right <ArrowForwardIcon fontSize="large"  style={{ color: green[500]}}/>
                </Typography>
                <Typography className="EmptySavedSubHeading" color="textSecondary">
                Customise your avatar if you don't like the one we selected for you.
                </Typography>
                <div className="AvatarSelector">
                    <Typography className="MyAvatarHeading" variant="h5" component="h2">
                    Choose an Avatar
                    </Typography>
                    <div className="AvatarPics">
                        <div className="first3Avatars">
                            <Link onClick={() => this.choose("1")} style={{
                                backgroundImage: `url(../Avatars/avatar1.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "1" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                            <Link onClick={() => this.choose("2")} style={{
                                backgroundImage: `url(../Avatars/avatar2.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "2" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                            <Link onClick={() => this.choose("3")} style={{
                                backgroundImage: `url(../Avatars/avatar3.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "3" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                        </div>
                        <div className="second3Avatars">
                            <Link onClick={() => this.choose("4")} style={{
                                backgroundImage: `url(../Avatars/avatar4.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "4" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                            <Link onClick={() => this.choose("5")} style={{
                                backgroundImage: `url(../Avatars/avatar5.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "5" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                            <Link onClick={() => this.choose("6")} style={{
                                backgroundImage: `url(../Avatars/avatar6.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "6" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                        </div>
                        <div className="last2Avatars">
                            <Link onClick={() => this.choose("7")} style={{
                                backgroundImage: `url(../Avatars/avatar7.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "7" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                            <Link onClick={() => this.choose("8")} style={{
                                backgroundImage: `url(../Avatars/avatar8.svg)`,
                                backgroundColor: `white`,
                                height: `13vh`,
                                marginTop: `0.5vh`,
                                marginRight: `0.7vw`,
                                marginLeft: `2vw`,
                                zIndex: `3`,
                                width:`13vh`,
                                borderRadius: `500vw`,
                                border: this.state.avatar === "8" ?`4px solid yellowgreen` : `0px solid yellowgreen`
                            }}></Link>
                        </div>
                        <Button className="SaveAvatar" onClick={() => this.saveAvatar()} >Save Avatar</Button>    
                    </div>
                </div>
            </div>
        )   
    }
}

export default MyAvatar;