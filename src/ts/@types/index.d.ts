declare module '*.scss' {
  const content: {
    [className: string]: string;
  };
  export = content;
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;

  export = Schema;
}

interface Window {
  app: {
    sessionId: string;
    userName: string;
  };
}
