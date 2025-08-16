import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        'intro/what-is',
        'intro/quick-start'
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/faq',
        'reference/logging-debug',
        'reference/troubleshooting'
      ]
    },
    'contributing',
    'changelog'
  ]
};

export default sidebars;
