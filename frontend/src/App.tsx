// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` reqnuire styles imports
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, LoadingOverlay, Box } from '@mantine/core';
import RiskyBusiness from './RiskyBusiness/index';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export default function App() {

  return <MantineProvider
            theme={theme}
            classNamesPrefix="financial-dashboard"
            >
              <RiskyBusiness />
            </MantineProvider>;
}