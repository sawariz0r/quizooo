import React, { useContext, useEffect } from 'react';
import Styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { Context } from '../Context';
import useNotification from './useNotification';

const Container = Styled(motion.div)`
  z-index: 1000;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2vw;
`;

const Notification = Styled(motion.div)`
  width: 250px;
  background: white;
  margin-bottom: 10px;
  border-radius: 5px;
  color: black;
  padding: 5px 10px 10px 10px;
  box-sizing: border-box;
  ${props => props.type && `
    background: ${props.theme.color[props.type]};;
  `};
`;

const Title = Styled(motion.span)`
  color: #f3f3f3;
  font-weight: 600;
  font-size: 1.4rem;
  max-width: 180px;
`;

const Text = Styled(motion.span)`
  color: #f3f3f3;
  max-width: 180px;
  font-size: 1rem;
  line-height: 0.8rem;
`;


const Notifications = (props) => {
  const [{ notifications, socket }, dispatch] = useContext(Context)
  const [newNotification] = useNotification();

  useEffect(() => {
    socket.on("new_notification", (x) => {
      newNotification(x);
    })
    return () => {
      socket.off("new_notification");
    }
  }, [])

  const handleDelete = (id) => {
    console.log(id);
    dispatch({
      type: "CLOSE_NOTIFICATION",
      payload: id
    });
  }

  return (
    <Container>
      <AnimatePresence>
        {
          notifications.map((x, i) => {
            return <Notification key={x.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              type={x.type}
              onClick={() => handleDelete(x.id)}>
              <Title>{x.title}</Title> <br />
              <Text>{x.text}</Text>
            </Notification>
          })
        }
      </AnimatePresence>
    </Container>
  )
}

export default Notifications
