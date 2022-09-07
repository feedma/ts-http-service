import { defineUserConfig } from 'vuepress';
import { defaultTheme } from 'vuepress';
import { version, homepage } from './meta';

export default defineUserConfig({
  base: process.env.DOCS_PATH ? `/${process.env.DOCS_PATH}/` : '/',
  lang: 'en-US',
  title: 'HttpService',
  description: 'Just playing around',
  theme: defaultTheme({
    // sidebar array
    navbar: [
      {
        text: 'GitHub',
        link: homepage,
      },
      {
        text: `v${version}`,
        children: [
          {
            text: 'Changelog',
            link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
          },
        ],
      },
    ],
    // all pages will use the same sidebar
    sidebar: [
      // SidebarItem
      {
        text: 'Guide',
        children: [
          // string - page file path
          '/guide/README.md',
          '/guide/getting-started.md',
          '/guide/rest-services.md',
        ],
      },
    ],
  }),
});
