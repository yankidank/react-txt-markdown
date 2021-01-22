import React, { useState } from 'react';
// import parse from 'html-react-parser';
import { Provider as BumbagProvider, css } from 'bumbag';
import { Columns, Box, TopNav, Button, Textarea, Clickable } from 'bumbag';
import BumbagMarkdown from './Bumbag/BumbagMarkdown';
import { faFolder, faFolderOpen, faSave, faFileDownload, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import FileReader from './FileReader';
import { PrintTime } from './utils/DateTime';
import './App.css';

export const ThemeContext = React.createContext()

const theme = {
  palette: {
    text: '#212121',
    primary: '#2582d1',
    primaryInverted: '#fff',
    secondary: '#ffffff00'
  },
  global: {
    fontSize: 15,
    styles: {
      base: css`
        html,
        body {
          background-color: #e8e8e8;
          color: black;
        }
      `
    }
  },
  Icon: {
    iconSets: [
      {
        icons: [faFolder, faFolderOpen, faSave, faFileDownload, faCheck, faTimes],
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
    setValue(newValue.value);
  }

  /* 
  function handleSave() {
    const newValue = {...fileAttributes, value: value};
    fileSave(newValue);
    setFileAttributes(newValue);
    setValue(newValue.value);
  }

  function fileSave(newValue) {
    // Save to original file
    const {name, value } = newValue;
    const editorValue = document.getElementById('editor').value;
    console.log(editorValue);
    console.log(name);
    console.log(value);
  } 
  */

  function handleDownload() {
    const newValue = {...fileAttributes, value: value};
    fileDownload(newValue);
    setFileAttributes(newValue);
    setValue(newValue.value);
  }

  function fileDownload(newValue) {
    // Save to new file
    const name = newValue.name || 'export';
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('editor').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = name;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  // const filePlain = fileAttributes.value ? parse(fileAttributes.value.replace(/(?:\r\n|\r|\n)/g, '<br>')) : '';
  
/*   
  function handleKeyPress(event){
    event.stopPropagation();
    console.log(event);
  } 
*/
  
  return (
    <div className="App">
      <BumbagProvider theme={theme}>
        <Box backgroundColor="#f5f5f5" padding="0.5rem" margin="0">
          <TopNav>
            <TopNav.Section>
              <TopNav.Item href="#" variant="pill">
                <FileReader onChange={handleChange} attributes={fileAttributes} />
              </TopNav.Item>
              {/* 
              <TopNav.Item href="#" variant="pill">
                { fileAttributes.name ? // Still in development
                  <Clickable
                    use={Button}
                    palette="primary" 
                    iconBefore={'solid-save'} 
                    // onClick={() => alert('Clicked')}
                    onClick={handleSave}
                  >
                    Save
                  </Clickable>
                 : 
                  <>
                   <Button variant="ghost" iconBefore={'solid-check'} >Saved</Button>
                  </> 
                }
              </TopNav.Item> 
              */}
              {value ? 
                <TopNav.Item href="#" variant="pill">
                  <Clickable
                    use={Button}
                    palette="secondary" 
                    iconBefore={'solid-file-download'} 
                    // onClick={() => alert('Clicked')}
                    onClick={handleDownload}
                  >
                    Download
                  </Clickable>
                </TopNav.Item>
               : 
                <></>
              }
            </TopNav.Section>
            <TopNav.Section>
              <TopNav.Item paddingRight="15px" fontWeight="semibold">
                <PrintTime />
              </TopNav.Item>
            </TopNav.Section>
          </TopNav>
        </Box>
        <Box>
          <Columns>
            <Columns.Column spread={6}>
              <Box padding="0.75rem">
                <Textarea
                  id="editor"
                  size="large"
                  value={value}
                  // onKeyPress={handleKeyPress}
                  onChange={e => setValue(e.target.value)}
                />
              </Box>
            </Columns.Column>
            <Columns.Column spread={6}>
              <Box padding="0.75rem">
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
