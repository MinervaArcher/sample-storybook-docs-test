import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@emotion/css';

const Variants = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    SUCCESS: 'SUCCESS',
  };
  
const variantStyles = {
[Variants.ERROR]: css`
    background: pink;
    border-color: red;
    color: red;
`,
[Variants.WARNING]: css`
    background: yellow;
    border-color: orange;
    color: orange;
`,
[Variants.SUCCESS]: css`
    background: aqua;
    border-color: green;
    color: green;
`,
};

const notificationBaseStyles = css`
  font-size: 2rem;
  align-items: center;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  box-sizing: border-box;
`;


const notificationChildrenClass = css`
  display: flex;
`;


/**
 * Banner component.
 *
 * @param {object} props
 * @param {object} ref
 * @returns {React.ReactElement}
 */
const Banner = React.forwardRef((props, ref) => {
    const { children, className, onClose, variant, timeout, ...rest } = props;
  
    useEffect(() => {
      // Only set a timeout if one is specified
      if (timeout === undefined) {
        return () => {};
      }
      // Call close after the alloted time
      const timeoutId = setTimeout(() => {
        onClose();
      }, timeout);
      // If the component is unmounted, clear the timeout
      return () => clearTimeout(timeoutId);
    }, [onClose, timeout]);
  
    return (
      <div
        {...rest}
        role="status"
        className={cx(notificationBaseStyles, variantStyles[variant], className)}
        ref={ref}
      >
        <div className={notificationChildrenClass}>{children}</div>
        {onClose && (
          <button
            type="button"
            aria-label="close"
            className={notificationCloseIconStyles}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  });

Banner.Variants = Variants;

Banner.propTypes = {
  /** Variants must be one of the following values: Success, Error, Warning */
  variant: PropTypes.oneOf(Object.values(Variants)),
  /** Message content */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Function with close behavior */
  onClose: PropTypes.func,
  /** If specified, onClose will be called after the amount of time specified in milliseconds. */
  timeout: PropTypes.number,
};

Banner.defaultProps = {
    variant: Variants.WARNING,
    className: '',
    onClose: undefined,
    timeout: undefined,
};

Banner.displayName = 'Banner';

export default Banner;
