import React from 'react'
import Profile from '../../components/profile/Profile'

export default function Profile(props) {

    console.log('Test ====>', props.history)

    return (
        <div className="page-container">
            <Profile />
        </div>
    )
}
