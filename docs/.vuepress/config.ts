import { defineUserConfig } from 'vuepress';
import { defaultTheme } from 'vuepress';
import { version, homepage } from './meta';

export default defineUserConfig({
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
        link: '/guide',
        children: [
          // string - page file path
          '/guide/README.md',
        ],
      },
    ],
  }),
});
