import React, { useState } from 'react';
// import parse from 'html-react-parser';
import { Provider as BumbagProvider, css } from 'bumbag';
import { Columns, Box, Textarea } from 'bumbag';
import BumbagMarkdown from './Bumbag/BumbagMarkdown';
import { faFolder, faFolderOpen, faSave, faFileExport, faTimes } from '@fortawesome/free-solid-svg-icons';
import FileReader from './FileReader';
// import { DateTime } from './utils/DateTime';
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
  Icon: {
    iconSets: [
      {
        icons: [faFolder, faFolderOpen, faSave, faFileExport, faTimes],
        prefix: 'solid-',
        type: 'font-awesome'
      }
    ]
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
  },
  fonts: {
    importUrls: [
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap',
      'https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap'
    ],
    default: "'Roboto', system-ui, sans-serif",
    heading: "'Rubik', sans-serif",
    mono: "Menlo, Courier, monospace",
  },
  fontMetrics: {
    default: {
      capHeight: 1433,
      ascent: 1974,
      descent: -426,
      lineGap: 0,
      unitsPerEm: 2000
    },
    heading: {
      capHeight: 743,
      ascent: 984,
      descent: -273,
      lineGap: 0,
      unitsPerEm: 1000
    }
  },
  fontWeights: {
    normal: 300,
    semibold: 400,
    bold: 500,
    bolder: 600
  },
  fontSizes: {
    50: 0.5,
    950: 5,
    extraSmall: 0.25
  },
  lineHeights: {
    700: 3,
    extraSmall: 0.8
  },
  letterSpacings: {
    800: '0.2em',
    extraSmall: '-0.075em'
  },
}

export default function App() {
  
	const [fileAttributes, setFileAttributes] = useState({});
  const [value, setValue] = React.useState('');

  function handleChange(newValue) {
    setFileAttributes(newValue);
    setValue(newValue.value)
  }

  // const filePlain = fileAttributes.value ? parse(fileAttributes.value.replace(/(?:\r\n|\r|\n)/g, '<br>')) : '';

  return (
    <div className="App">
      <BumbagProvider theme={theme}>
        <Box backgroundColor="whitesmoke" padding="0.5rem" margin="0">
          <Columns>
            {/* 
            <Columns.Column>
              <DateTime />
            </Columns.Column> 
            */}
            <Columns.Column alignX="center">
              <FileReader onChange={handleChange} attributes={fileAttributes} />
            </Columns.Column>
          </Columns>
        </Box>
        <Box>
          <Columns>
            <Columns.Column spread={6}>
              <Box padding="0.5rem">
                <Textarea 
                  size="large"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </Box>
            </Columns.Column>
            <Columns.Column spread={6}>
              <Box padding="0.5rem">
                <BumbagMarkdown 
                  onChange={handleChange}
                  markdown={value} 
                />
              </Box>
            </Columns.Column>
          </Columns>
        </Box>
      </BumbagProvider>
    </div>
  )
}
