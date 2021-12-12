import PropTypes from "prop-types";
import styles from "./Filter.module.scss";

const Filter = ({ value, onFindContact }) => {
  return (
    <label className={styles.Label}>
      Find contacts by name
      <input
        type="text"
        value={value}
        className={styles.Input}
        onChange={onFindContact}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
};

export default Filter;
