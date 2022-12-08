import '../styles/iframe.css'


const IframeContainer = ({src='https://learning.immunize.io/login/index.php'}) => {
    return (
        <div className="iframe-wrapper">
            <iframe src={src}></iframe>
        </div>
    )
}

export default IframeContainer
