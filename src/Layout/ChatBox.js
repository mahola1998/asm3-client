import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import MySvgIcon from "../img/MySvgIcon";
import io from "socket.io-client";

const socket = io("https://asm3-sever-app.onrender.com");

const ChatBox = ({ user }) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [livechatId, setLivechatId] = useState(null);

  useEffect(() => {
    // Đăng ký một lần các sự kiện socket
    socket.on("livechat-id", (id) => {
      setLivechatId(id);
      setChatStarted(true);
    });

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("chat_ended", () => {
      setChatStarted(false);
      setMessages([]);
      setLivechatId(null);
    });

    return () => {
      socket.off("livechat-id");
      socket.off("receive_message");
      socket.off("chat_ended");
    };
  }, []);

  const handleMessageSend = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage === "/start" && !chatStarted) {
      // Bắt đầu phiên chat
      socket.emit("start", { userId: user.user._id });
    } else if (trimmedMessage === "/end" && chatStarted) {
      if (livechatId) {
        // Kết thúc phiên chat
        socket.emit("end", { livechatId });
        setChatStarted(false);
        setMessages([]);
        setLivechatId(null);
      }
    } else if (trimmedMessage && chatStarted) {
      // Gửi tin nhắn
      const data = {
        message: trimmedMessage,
        sender: "user",
        userId: user.user._id,
        livechatId,
      };
      socket.emit("send_message", data);
    }

    setMessage("");
  };

  return (
    <div className="m-2" style={{ width: "350px" }}>
      {openChatBox && (
        <div className="bg-white w-100 rounded-4 shadow-lg">
          <div>
            <div className="border-bottom p-3 d-flex justify-content-between align-items-center">
              <h6>Customer Support</h6>
              <button
                className="btn btn-secondary p-1 rounded-0"
                style={{ fontSize: "10px" }}
              >
                Let's Chat App
              </button>
            </div>

            <div
              className="p-3 fst-italic"
              style={{ height: "300px", overflowY: "auto" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex ${
                    msg.sender === "user" ? "justify-content-end" : ""
                  }`}
                >
                  {msg.sender !== "user" && (
                    <div style={{ width: "35px", height: "35px" }}>
                      <MySvgIcon />
                    </div>
                  )}
                  <p
                    className={`rounded p-2 ${
                      msg.sender === "user"
                        ? "bg-primary text-white"
                        : "text-secondary"
                    }`}
                    style={{
                      backgroundColor: msg.sender === "user" ? "" : "#f3f5f2",
                    }}
                  >
                    {msg.sender === "user" ? "You" : "ADMIN"}: {msg.message}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="border-bottom p-3 d-flex gap-2 align-items-center rounded-4"
              style={{ backgroundColor: "#f3f5f2" }}
            >
              <div style={{ width: "35px", height: "35px" }}>
                <MySvgIcon />
              </div>
              <input
                type="text"
                placeholder="Enter Message!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
                style={{ flex: 1 }}
              />
              <FontAwesomeIcon icon={faPaperclip} className="text-secondary" />
              <FontAwesomeIcon icon={faFaceSmile} className="text-secondary" />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-primary"
                onClick={handleMessageSend}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-dark rounded-circle p-1 px-2"
          onClick={() => setOpenChatBox(!openChatBox)}
        >
          <FontAwesomeIcon
            icon={faFacebookMessenger}
            className="fs-3 text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
