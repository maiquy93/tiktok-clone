// import styles from "./menu.module.scss";
// import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";

function Menu({ children }) {
  return <nav>{children}</nav>;
}
Menu.propTypes = {
  children: PropTypes.node.isRequired,
};
export default memo(Menu);
