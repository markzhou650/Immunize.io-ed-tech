import '../styles/iframe.css'


const IframeContainer = ({src='http://learning.immunize.io/'}) => {
    return (
        <div className="iframe-wrapper">
            <iframe src={src}></iframe>
        </div>
    )
}

export default IframeContainer
