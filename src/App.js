import React, { useState, useEffect } from 'react';
import ls from 'local-storage';
// import parse from 'html-react-parser';
import { Provider as BumbagProvider, css } from 'bumbag';
import { Columns, Box, TopNav, Button, Textarea, Clickable } from 'bumbag';
import BumbagMarkdown from './Bumbag/BumbagMarkdown';
import { faFolder, faFolderOpen, faSave, faFileDownload, faCheck, faTimes, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import FileReader from './FileReader';
// import { PrintTime } from './utils/DateTime';
import './App.css';

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
        icons: [faFolder, faFolderOpen, faSave, faFileDownload, faCheck, faTimes, faHourglassHalf],
        prefix: 'solid-',
        type: 'font-awesome'
      }
    ]
  },
  Button: {
    variants: {
      'ghost': {
        defaultProps: {
          palette: 'default',
          opacity: '0.5'
        }
      }
    }
  },
  breakpoints: {
    mobile: 520,
    tablet: 960
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
    mono: 'Menlo, Courier, monospace',
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
  
	const [fileAttributes, setFileAttributes] = useState({name:'', value: ''});
  const [value, setValue] = React.useState(''); // Textarea value
  const [editorValue, setEditorValue] = React.useState(''); // logic value

  const handleChange = (newValue) => {
    setFileAttributes(newValue);
    setValue(newValue.value);
    setEditorValue(newValue.value)
  }

  const handleSave = () => {
    const checkValue = document.getElementById('editor') ? document.getElementById('editor').value : '';
    const newValue = {...fileAttributes, value: checkValue};
    setFileAttributes(newValue);
    setValue(newValue.value);
    localSet(newValue);
  }

  const localSet = (newValue) => {
    // const {name, value } = newValue;
    let checkValue = {...newValue, value: ''};
    if ( newValue === undefined || newValue.value === undefined){
      checkValue = {...fileAttributes, value: ''};
    } else if ( newValue !== undefined && newValue.value !== undefined ){
      checkValue = {...newValue, value: newValue.value};
    } else {
      checkValue = {...fileAttributes, value: document.getElementById('editor') ? document.getElementById('editor').value : ''};
    }
    ls.set('reactTextEditor', {...fileAttributes, value: checkValue.value});
  }

  const localGet = () => {
    return ls.get('reactTextEditor') || {name:'', value:''};
  }

  const localRemove = () => {
    ls.remove('reactTextEditor');
    setFileAttributes({name:'', value: ''});
    setValue('');
    setEditorValue('');
  }

  const handleDownload = () => {
    const newValue = {...fileAttributes, value: value};
    fileDownload(newValue);
    setFileAttributes(newValue);
    setValue(newValue.value);
  }

  const fileDownload = (newValue) => {
    // Save to new file
    const shortName = newValue.name ? newValue.name.slice(0, -4) : null;
    const fileName = prompt('Name the text file', shortName || 'export') || shortName || 'export';
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('editor').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
/*   
  const handleKeyPress = (event) => {
    event.stopPropagation();
    console.log(event);
  } 
*/

  // const filePlain = fileAttributes.value ? parse(fileAttributes.value.replace(/(?:\r\n|\r|\n)/g, '<br>')) : '';

  useEffect(() => {
    if (localGet() !== null){
      setEditorValue(localGet().value);
      setValue(localGet().value);
      setFileAttributes(localGet());
    }
  }, [])

  return (
    <div className='App'>
      <BumbagProvider theme={theme}>
        <Box backgroundColor='#f5f5f5' padding='0.2rem' margin='0' minHeight="68px">
          <TopNav>
            <TopNav.Section>
              <TopNav.Item href='#' variant='pill'>
                <FileReader onChange={handleChange} attributes={fileAttributes} />
              </TopNav.Item>
              <TopNav.Item href='#' variant='pill'>
                { editorValue === '' ?
                  <Button variant='ghost' iconBefore={'solid-hourglass-half'}>Waiting</Button>
                 : localGet().value === editorValue ? 
                  <Button variant='ghost' iconBefore={'solid-check'} >Saved</Button>
                 : fileAttributes.value === editorValue ?
                  <Button variant='ghost' iconBefore={'solid-check'} >Imported</Button>
                 : /* fileAttributes.value !== '' && fileAttributes.value !== localGet().value ? */
                  <Clickable
                    use={Button}
                    iconBefore={'solid-save'} 
                    onClick={handleSave}
                  >
                    Save
                  </Clickable>
                }
              </TopNav.Item>
              <TopNav.Item href='#' variant='pill'>
                {editorValue === '' ? 
                  <Button
                    // disabled
                    variant='ghost'
                    iconBefore={'solid-file-download'}
                  >
                    Download
                  </Button>
                 : 
                  <Clickable
                    use={Button}
                    iconBefore={'solid-file-download'} 
                    onClick={handleDownload}
                  >
                    Download
                  </Clickable>
                }
              </TopNav.Item>
              <TopNav.Item>
                <Clickable
                  use={Button}
                  palette="danger"
                  iconBefore={'solid-times'} 
                  onClick={localRemove}
                >
                  Clear
                </Clickable>
              </TopNav.Item>
            </TopNav.Section>
            {/* <TopNav.Section>
              <TopNav.Item paddingRight='15px' fontWeight='semibold'>
                <PrintTime />
              </TopNav.Item>
            </TopNav.Section> */}
          </TopNav>
        </Box>
        <Box height='90vh'>
          <Columns>
            <Columns.Column spread={6}>
              <Box padding='0.75rem'>
                <Textarea
                  id='editor'
                  value={editorValue}
                  // onKeyPress={handleKeyPress}
                  onChange={e => { setValue(e.target.value); setEditorValue(e.target.value) }}
                />
              </Box>
            </Columns.Column>
            <Columns.Column spread={6}>
              <Box padding='0.75rem'>
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
