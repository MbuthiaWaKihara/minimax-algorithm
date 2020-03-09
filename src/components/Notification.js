import React from 'react'

export const Notification = ({ closeToast, message}) => {
    return (
        <>
            <div
            style={{
            }}
            >
                {message}
            </div>
            <button
            style={{
                border: 'none',
                backgroundColor: '#b0b0b0',
                color: '#ffffff',
                borderRadius: '20px',
                width: '100%',
                textAlign: 'center',

            }}
            >
                OK
            </button>
        </>
    )
}

export default React.memo(Notification);
