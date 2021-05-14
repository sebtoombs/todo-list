import styles from "./Button.style.module.css";
import React, { forwardRef, useMemo } from "react";
import cx from "classnames";

// In the interest of building this rapidly, I've chosen to use a UI component library
// (Chakra-UI) which is an excellent, accessible, component library.
// But just as a demo, here's how I might implement a UI component with some styling
// Styling is done using CSS modules.
// In a real app, we'd probably use some CSS pre/post processing to allow us to have
// nested selectors, global variables for theming etc etc

const Button = forwardRef(function ButtonComponent(
  {
    children,
    colorScheme = null,
    isDisabled = false,
    leftIcon = null,
    ...props
  },
  ref
) {
  const classNames = [
    styles.button,
    props?.className,
    colorScheme && typeof styles[`color-${colorScheme}`] !== "undefined"
      ? styles[`color-${colorScheme}`]
      : null,
  ].filter(Boolean);

  return (
    <button
      type="button"
      disabled={isDisabled}
      {...props}
      className={cx(...classNames)}
      ref={ref}
    >
      {!!leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
      {useMemo(
        () =>
          !!leftIcon ? (
            <span className={styles.textWrapper}>{children}</span>
          ) : (
            children
          ),
        [leftIcon, children]
      )}
    </button>
  );
});

export default Button;
