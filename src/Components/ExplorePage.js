import React from 'react';
import {Typography} from '@material-ui/core';
import PostCard from './PostCard';

class Explore extends React.Component {
    constructor(props) {
        super(props);
        let value = {"updatedtimestamp": 234532423432467, "username": "pokemon" , "title": "Yeah" , "description": "qeqwe"};
        this.state = {
            savedPosts: [value,value,value]
        }    
    }

    render() {
        let savedPosts = this.state.savedPosts;
        if (savedPosts.length === 0) {
            return (
                <div className="emptySavedPosts">
                    <Typography className="EmptySavedHeading" variant="h5" component="h2">
                    Something Went Wrong !
                    </Typography>
                    <Typography className="EmptySavedSubHeading" color="textSecondary">
                    Nothing to show.
                    </Typography>
                </div>
            )
        }
        return(
            <div className="HomeOuterClass">
                <div className = "innerShell">
                    <div className="propogates">
                    {savedPosts.map((value, index) => {
                    return  <PostCard value = {value}/>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Explore;