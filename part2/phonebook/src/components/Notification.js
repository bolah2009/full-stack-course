import PropTypes from 'prop-types';

const Notification = ({ notification: { message, messageType } }) => {
  if (message === '') {
    return null;
  }

  return <div className={`notification ${messageType}`}>{message}</div>;
};

export default Notification;

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
  }).isRequired,
};
