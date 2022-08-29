import styles from "./button.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Button({
  to,
  primary,
  upload,
  signup,
  rounder,
  textStyle,
  separate,
  leftIcon,
  rightIcon,
  size,
  href,
  children,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  const classes = cx("wrapper", {
    primary,
    upload,
    signup,
    rounder,
    textStyle,
    separate,
    [size]: size,
  });
  return (
    <Comp className={classes} {...props} {...passProps}>
      {!!leftIcon && <span className={cx("leftIcon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {!!rightIcon && <span className={cx("rightIcon")}>{rightIcon}</span>}
    </Comp>
  );
}
Button.propTypes = {
  to: PropTypes.string,
  primary: PropTypes.bool,
  upload: PropTypes.bool,
  rounder: PropTypes.bool,
  textStyle: PropTypes.bool,
  separate: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  size: PropTypes.string,
  href: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
export default Button;
