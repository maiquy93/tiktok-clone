import styles from "./Option.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function LanguageOption({ title, onBack }) {
  return (
    <div className={cx("header")}>
      <FontAwesomeIcon
        className={cx("back-btn")}
        icon={faChevronLeft}
        onClick={onBack}
      />
      <h4 className={cx("header-title")}>{title}</h4>
    </div>
  );
}

export default LanguageOption;
