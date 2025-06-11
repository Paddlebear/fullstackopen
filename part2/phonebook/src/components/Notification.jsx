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

    let style = goodNotificationStyle

    if (notificationStyle === 'good') {
        style = goodNotificationStyle
    }
    else {
        style = badNotificationStyle
    }

    return (
        <div style={style} className='error'>
            {message}
        </div>
    )
}

export default Notification