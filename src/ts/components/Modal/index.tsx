import * as React from 'react';
import css from '~/scss/components/Modal/index.scss';

type Props = {
  content: JSX.Element;
  closeModal: () => void;
};

const Modal: React.FC<Props> = React.memo(({ content, closeModal }) => {
  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={css['modal']} onClick={closeModal}>
      <div className={css['modal__inner']} onClick={handleInnerClick}>
        {content}
      </div>
    </div>
  );
});

export default Modal;
