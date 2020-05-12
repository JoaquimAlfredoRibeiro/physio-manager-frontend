import React from 'react'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import DashboardStyles from './Dashboard.styles'

export default function AppointmentCard(props) {

    const onClick = () => {
        props.onClick(props.id)
    }

    return (
        <Card style={{ maxWidth: 280, boxShadow: '0 10px 35px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)' }}>
            <CardActionArea onClick={onClick}>
                <CardMedia style={{ height: 140 }} image={props.img} />
                <CardContent >
                    <Typography gutterBottom variant='h5' component='h2'>
                        {props.startTime}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {props.fullName}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {props.location}
                    </Typography>
                </CardContent>
            </CardActionArea >
        </Card >);
}