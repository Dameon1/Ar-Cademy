import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    profile: {
      username: string;
      handle: string;
    };
    userAction: string;
    bodyBackground: string;
    text: string;
  }
}

const common = {
  profile: {
    username: '#485aff',
    handle: 'gold'
  },
  userAction: '#008c9e',
}

const light = {
  ...common,
  bodyBackground: '#f7f7f7',
  text: '#18152E'
};

const dark = {
  ...common,
  bodyBackground: '#000000',
  text: '#f7f7f7'
}

export { light, dark };