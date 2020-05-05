import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../Styles/NotificationPage.css'

class NotificationPage extends React.Component {
    render() {
        return (
            <div>
                <div className="messagesDrawer">
                    <div className="internalMessagesDrawer">
                    <Card className="classMainNotifications">
                        <CardContent>
                            <Typography className="T1" variant="h5" component="h2">
                            No notifications Yet !
                            </Typography>
                            <Typography className="T2" color="textSecondary">
                            All the notifications of people you follow will be visible here!
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotificationPage;