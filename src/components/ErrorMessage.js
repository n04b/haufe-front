import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ErrorMessage.scss";

const ErrorMessage = ({ errorMessage }) => (
  <div>
    {errorMessage && (
      <>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {errorMessage}
      </>
    )}
  </div>
);

export default ErrorMessage;
