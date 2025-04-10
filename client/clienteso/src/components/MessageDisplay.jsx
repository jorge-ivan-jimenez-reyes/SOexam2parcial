import PropTypes from 'prop-types';

export const MessageDisplay = ({ message, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{message}</p>;
};

MessageDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};
