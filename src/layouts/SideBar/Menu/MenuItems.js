import styles from "./menu.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
function MenuItems({ title, to, icon }) {
  return (
    <NavLink
      className={nav => cx("menu-item", { active: nav.isActive })}
      to={to}
    >
      {icon}
      <span className={cx("title")}>{title}</span>
    </NavLink>
  );
}
MenuItems.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
export default memo(MenuItems);
