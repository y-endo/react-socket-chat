declare module '*.scss' {
  const content: {
    '0': string[];
    toString: Function;
    i: Function;
    locals: {
      [className: string]: string;
    };
  };
  export = content;
}
