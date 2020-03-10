import * as React from 'react';
import css from '~/scss/components/Modal/index.scss';

type Props = {
  closeModal: () => void;
};

const Modal: React.FC<Props> = React.memo(({ closeModal }) => {
  return (
    <div className={css['modal']} onClick={closeModal}>
      <div className={css['modal__inner']}>モーダル</div>
    </div>
  );
});

export default Modal;
