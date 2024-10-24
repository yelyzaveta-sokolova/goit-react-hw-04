import { useEffect } from "react";
import toast from "react-hot-toast";
import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return (
    <div className={css.errorMessage}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;