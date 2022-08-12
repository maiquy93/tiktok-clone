import { forwardRef, useState } from "react";
import images from "../../assets/images/image";
import styles from "./image.module.scss";
import classNames from "classnames";
import PropTypes from "prop-types";

//forward ref
const Images = forwardRef(({ src, alt, className, ...props }, ref) => {
  const [fallback, setFallback] = useState("");
  const handleError = () => {
    setFallback(images.noImage);
  };
  return (
    <img
      className={classNames(styles.wrapper, className)}
      src={fallback || src}
      alt={alt}
      {...props}
      ref={ref}
      onError={handleError}
    />
  );
});

Images.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Images;
