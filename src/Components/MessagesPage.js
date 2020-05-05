import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import '../Styles/MessagesPage.css'

class MessagesPage extends React.Component {
    constructor() {
        super();
        this.state={
            selected: "none"
        }
    }
    render() {
        return (
            <div>
                <div className="messagesDrawer">
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
                    </div>
                    <div className="internalMessagesDrawer">
                    <Card className="classMain">
                        <CardContent>
                            <Typography className="T1" variant="h5" component="h2">
                            Send a message, get a message !
                            </Typography>
                            <Typography className="T2" color="textSecondary">
                            Direct Messages are private conversations between you and other people on Propagate. Share posts and more!
                            </Typography>
                        </CardContent>
                        <CardActions >
                            <Button className="cardButton" size="small">Start a conversation</Button>
                        </CardActions>
                    </Card>
                    </div>
                </div>
                <div className="selector">
                    {this.state.selected === "none" && <div>
                    <div className="CAP" >
                        <Card className="CAPCard">
                            <CardContent>
                                <Typography className="T1Sub" variant="h5" component="h3">
                                Select a user to send a message !
                                </Typography>
                                <Typography className="T2Sub" color="textSecondary">
                                choose search bar and enter username to start a conversation with people
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default MessagesPage;