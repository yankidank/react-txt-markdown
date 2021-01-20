import React from 'react';
import { Provider as BumbagProvider, css } from 'bumbag';
import { PageContent, PageWithSidebar } from 'bumbag';
import FileReader from './FileReader';
import { DateTime } from './utils/DateTime';
import './App.css';

export const ThemeContext = React.createContext()

const theme = {
  global: {
    fontSize: 16,
    styles: {
      base: css`
        html,
        body {
          background-color: white;
          color: black;
        }
      `
    }
  },
  fonts: {
    importUrls: ['https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap'],
    default: "'Lato', system-ui, sans-serif"
  },
  breakpoints: {
    mobile: 520,
    tablet: 960
  },
  Button: {
    defaultProps: {
      palette: 'primary'
    }
  },
  Heading: {
    styles: {
      base: {
        color: 'primary'
      }
    }
  }
}

export default function App() {

  return (
    <div className="App">
      <BumbagProvider theme={theme}>
        <PageWithSidebar
          sidebar={<PageContent><DateTime /></PageContent>}
          sidebarPlacement="left"
        >
          <FileReader />
          {/* <BumbagMarkdown markdown={'hello world'} /> */}
        </PageWithSidebar>
      </BumbagProvider>
    </div>
  )
}
