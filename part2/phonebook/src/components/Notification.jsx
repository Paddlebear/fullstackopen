import { useState } from 'react'

const Notification = ({ message, notificationStyle }) => {

    const goodNotificationStyle = {
        color: 'darkgreen',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const badNotificationStyle = {
        color: 'darkred',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    if (message === null) {
        return null
    }

    const style = notificationStyle === 'good'
        ? goodNotificationStyle
        : badNotificationStyle

    return (
        <div style={style} className='error'>
            {message}
        </div>
    )
}

export default Notification