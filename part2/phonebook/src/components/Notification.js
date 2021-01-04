const Notification = ({ notification: { message, messageType } }) => {
  if (message === '') {
    return null;
  }

  return <div className={`notification ${messageType}`}>{message}</div>;
};

export default Notification;
