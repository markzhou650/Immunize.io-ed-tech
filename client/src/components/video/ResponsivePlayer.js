import React from 'react'
import ReactPlayer from 'react-player'
import '../styles/video.css'

const ResponsivePlayer = () => {
    return (
        <div className="player-wrapper">
            <ReactPlayer
                className="react-player"
                url="https://youtu.be/gcsxAddFaoA"
                width="350px"
                height="500px"
                // controls={true}
                playing={true}
                muted={true}
            />
        </div>
    )
} 

export default ResponsivePlayer