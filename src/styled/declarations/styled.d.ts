// declarations file
// https://styled-components.com/docs/api#typescript (see 'create a declaration file' section)

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    mainTextColor: string;
    accentColor: string;
  }
}
