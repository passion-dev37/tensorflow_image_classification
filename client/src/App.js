/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "./hooks/useModal";
import validator from 'validator' // to check if URL is valid

import { framerLogger } from "./stateLogger";
import Notification from "./components/Notification";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { add } from "./arr-utils";
import ImageShow from "./components/ImageShow/ImageShow";
import { handleUrl } from "./Fetch/fetchByUrl";
// TODO Make file input Button
// TODO Convert Image to base64
function App() {
  const [image, setImage] = useState(null)    // for image file
  const [imgUrl, setImgUrl] = useState('')    // for image URL
  // Modal state
  const { modalOpen, close, open } = useModal();
  // Modal type
  const [modalType, setModalType] = useState("dropIn");

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

  const onImageFileChange= (e) =>{
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      console.log('image file changed', e.target.files[0]);
    }
  }


  const validateUrl = () =>{
    if(text){
      if (validator.isURL(text)){
        setImage(null)
        setImgUrl(text)
        handleUrl(text, setNotifications, add, style, notifications);
      }
      else{
        setModalType('invalid')
        open()
      }
    }else{
      setModalType('emptyInput')
      open();
    }
  }
  return (
    <>
        <Header />
    <div id="left">
      <motion.main>
        <SubHeader text="Animated modals" />
// !     Accept image file
        <input type="file" accept="image/*" className="input" onChange={onImageFileChange} /> 
// !            Launches Modal
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
          <option value="FaceClassification">✅ Mask Classification</option>
          <option value="CatvsDog">🐱 or🐶</option>
          <option value="DogBreed">🛑 Dog Breed</option>
          <option value="mask">☀️ Face</option>
          {/* <option value="">🌙 Dark</option> */}
        </motion.select>

        <br />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="add-button"
          onClick={validateUrl}
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
    </div>
      <div id='right'>
            <ImageShow img={image ? image: imgUrl}  />
      </div>
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

const   ModalContainer = ({ children, label }) => (
  <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
    onExitComplete={() => framerLogger(label)}
  >
    {children}
  </AnimatePresence>
);

// TODO make a new file for this compontent
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
