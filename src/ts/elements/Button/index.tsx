import * as React from 'react';
import css from '~/scss/elements/Button/index.scss';

type Props = {
  isAnchor?: boolean;
  anchorAttributes?: {
    href: string;
    target?: string;
  };
};

const Button: React.FC<Props> = ({ isAnchor, anchorAttributes, children }) => {
  if (isAnchor) {
    const target = anchorAttributes?.target ? anchorAttributes?.target : '_self';
    return (
      <a href={anchorAttributes!.href} target={target} className={css['button']}>
        {children}
      </a>
    );
  } else {
    return <button className={css['button']}>{children}</button>;
  }
};

export default Button;
