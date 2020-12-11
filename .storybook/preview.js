import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

/**
 * See https://github.com/storybookjs/storybook/blob/master/addons/docs/README.md#manual-configuration
 */
addParameters({
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  });

/**
 * Using this parameters syntax does not produce different results;
 * including it here for testing
 */
//   export const parameters = {
//     docs: {
//         container: DocsContainer,
//         page: DocsPage,
//       },
//   }