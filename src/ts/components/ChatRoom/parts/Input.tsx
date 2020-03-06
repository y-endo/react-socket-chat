import * as React from 'react';

type Props = {
  emitMessage: (message: string) => void;
};

const Input: React.FC<Props> = React.memo(({ emitMessage }) => {
  const input = React.useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.current) {
      const value = input.current.value;

      if (value !== '') {
        emitMessage(value);
        input.current.value = '';
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={input} placeholder="メッセージ" />
    </form>
  );
});

export default Input;
