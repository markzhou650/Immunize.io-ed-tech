import "./styles/container.css";
import ChatBox from "./ChatBox";
// import VideoBox from "./VideoBox";

export default function Container() {
  return (
    <div className="container">
      <ChatBox />
      <div>Here's some more content</div>
    </div>
  );
}
