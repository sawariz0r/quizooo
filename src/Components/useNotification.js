import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from '../Context';

export default () => {
  const [state, dispatch] = useContext(Context);
  const newNotification = ({ title,  text, type }) => {
    /*dispatch({
      type: "NEW_NOTIFICATION",
      payload: {
        id: uuidv4(),
        title: title,
        text: text,
        type: type ? type : "primary"
      }
    })*/
  }
  return [newNotification];
}
