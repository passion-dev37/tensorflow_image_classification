import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "./hooks/useModal";
import { framerLogger } from "./stateLogger";
import Notification from "./components/Notification";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { add } from "./arr-utils";

function App() {
  // Modal state
  const { modalOpen, close, open } = useModal();
  // Modal type
  const [modalType, setModalType] = useState("dropIn");
  const handleType = (e) => setModalType(e.target.value);

  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Notification text
  const [text, setText] = useState("");
  const handleText = (e) => setText(e.target.value);

  // Notification style
  const [style, setStyle] = useState("FaceClassification");
  const handleStyle = (e) => setStyle(e.target.value);
  // Notification position
  const position= 'bottom'

  const handleUrl = () =>{
    fetch(`send-image/${text}`).then((response) =>{ //make predictions
      console.log(response);
      if(response.ok){
          return response.json()
      }
  }).then(data =>{ 
      console.log("data---",data.data); // save the predictions in ans 
      // setNotifications(add(notifications, text, style, ans))
      return data.data
    }).then(data =>{
      console.log("data----------",data);
      const ans = data;
      setNotifications(add(notifications, text, style, ans))
    })
     
  }

  return (
    <>
      <motion.main>
        <Header />
        <SubHeader text="Animated modals" />

        <motion.select className="input" onChange={handleType}>
          <option value="dropIn">🪂 Drop in</option>
          <option value="flip">🛹 Flip</option>
          <option value="newspaper">🗞 Newspaper</option>
          <option value="badSuspension">🔩 Bad Suspension</option>
          <option value="gifYouUp">🎸 GIF you up</option>
        </motion.select>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          onClick={open}
        >
          Launch modal
        </motion.button>

        <br />
        <br />

        <Input
          placeHolder="Add image URL 🚀"
          value={text}
          onChange={handleText}
        />

        <br />

        <motion.select className="input" onChange={handleStyle}>
          <option value="FaceClassification">✅ Face Classification</option>
          <option value="CatvsDog">⚠️ Cat vs Dog</option>
          <option value="DogBreed">🛑 Dog Breed</option>
          <option value="mask">☀️ Mask</option>
          {/* <option value="">🌙 Dark</option> */}
        </motion.select>

        <br />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="add-button"
          onClick={handleUrl}
        >
          Predict
        </motion.button>
      </motion.main>

      <ModalContainer>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={modalType} type={modalType} handleClose={close} />
        )}
      </ModalContainer>

      <NotificationContainer position={position}>
        {notifications &&
          notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ))}
      </NotificationContainer>
    </>
  );
}

const Header = () => (
  <motion.h1 className="pink">
    Tensorflow
    <span className="light-blue"> Project</span>
  </motion.h1>
);

const SubHeader = ({ text }) => <motion.h2 className="sub-header">{text}</motion.h2>;

const ModalContainer = ({ children, label }) => (
  <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
    onExitComplete={() => framerLogger(label)}
  >
    {children}
  </AnimatePresence>
);

const NotificationContainer = ({ children, position }) => {
  return (
    <div className="container">
      <ul className={position}>
        <AnimatePresence
          initial={false}
          onExitComplete={() => framerLogger("Notifications container")}
        >
          {children}
        </AnimatePresence>
      </ul>
    </div>
  );
};



export default App;
