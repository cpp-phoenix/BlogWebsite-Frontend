import React from 'react';
import '../Styles/CreatePost.css'
import CloseIcon from '@material-ui/icons/Close';
import { TextField, Button, Link } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { RestConstants } from '../Constants/application.constants';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            titleHelper: "Title Here!",
            titleShow: true,
            description: "" ,
            descriptionHelper: "What's happening?"
        }
    }

    handleChange = (event) => {
        if(event.target.name === "postTitle") {   
            this.setState({title: event.target.value})
        }
        else {
            this.setState({description: event.target.value})
        }
    }

    savePost = () => {
        let data = {
            Title: this.state.title,
            Name: localStorage.getItem('name'),
            Description: this.state.description,
            Avatar: parseInt(localStorage.getItem('avatar')),
            UserName: localStorage.getItem('username')
        }
        fetch(RestConstants.SAVE_POST, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json', 
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            if (data.Status === 3015) {
                this.props.updateViewState();
                //toaster.success("Post Saved Successfully");
            }   
            else if(data.Status === 3014) {
                alert("Invalid Data Added");
            }
            else {
                alert("Some Error Occurred Please try again!");
            }
        }).catch(error => {});
    }

    checkPost = (event) => {
        if(this.state.title === "" || this.state.description === "") {
            alert("Title and description is mandatory");
        }
        else {
            this.savePost();
        }
    }

    render() {
        return (
            <div className="createPostMain">
                <div className = "postTitle">
                    {this.props.showClose && <Link onClick={() => {this.props.updateViewState()}}><CloseIcon fontSize="large" style={{ color: green[500]}} className="cancelButton"/></Link>}
                    <TextField placeholder={this.state.titleHelper} className = "postTitleBox" name="postTitle" id="outlined-size-normal" color="primary" variant="outlined" onChange={this.handleChange}/>
                </div>
                <div className = "postData">
                    <div style={{ height: `6vh`,
                        marginTop: `1vh`,
                        marginLeft: `1vh`,
                        marginRight: `0.7vw`,
                        width: `6vh`,
                        borderRadius: `500vw`,
                        position: `absolute`,
                        backgroundColor: `white`,
                        backgroundImage: `url(../Avatars/avatar`+localStorage.getItem('avatar')+`.svg)`}}></div>
                    <TextField placeholder={this.state.descriptionHelper} className = "postDataBox" name="postData" id="outlined-size-normal" variant="outlined" multiline rows={this.props.rows} onChange={this.handleChange}/>
                </div>  
                <div className="postBottom">
                    <Button className="postButton" onClick={this.checkPost}>Post</Button>
                </div>
            </div>
        )
    }
}

export default CreatePost;