import React, { useState, useEffect } from 'react';
import ls from 'local-storage';
// import parse from 'html-react-parser';
import { Provider as BumbagProvider, css } from 'bumbag';
import { Columns, Box, Group, Button, Textarea, Clickable } from 'bumbag';
import BumbagMarkdown from './Bumbag/BumbagMarkdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faFileDownload, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import FileReader from './FileReader';
import './App.css';

const welcomeText = `## Welcome to React .txt Markdown
Use the textarea on the left half of the screen to input markup-styled text and see it render on the right half in real time.
#### Features:
- Import a .txt file into the editor
- Export content and download it as a .txt file
- Save content so that you can resume writing later
- Clear saved content and the textarea

Supported markdown tag examples can be found in the sample.txt file included with this project.`;

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
  
  const localGet = () => {
    return ls.get('reactTextEditor') || {name:'', value:''};
  }

  const localSet = (newValue) => {
    // const {name, value } = newValue;
    let checkValue = {...newValue, value: ''};
    if ( newValue === undefined || newValue.value === undefined){
      checkValue = {...fileAttributes, value: ''};
    } else if ( newValue.name !== undefined && newValue.value !== undefined ){
      checkValue = {...newValue};
    } else {
      checkValue = {...fileAttributes, value: document.getElementById('editor') ? document.getElementById('editor').value : ''};
    }
    ls.set('reactTextEditor', checkValue);
  }

  const handleChange = (newValue) => {
    setFileAttributes(newValue);
    setValue(newValue.value);
    setEditorValue(newValue.value);
    if (localGet.value === undefined){ 
      localSet(newValue)
    } else if (localGet.name !== fileAttributes.name){
      localSet(newValue)
    };
  }

  const handleSave = () => {
    const checkValue = document.getElementById('editor') ? document.getElementById('editor').value : '';
    const newValue = {...fileAttributes, value: checkValue};
    setFileAttributes(newValue);
    setValue(newValue.value);
    localSet(newValue);
  }
  
  const localRemove = () => {
    ls.remove('reactTextEditor');
    setFileAttributes({name:'', value: ''});
    setValue('');
    setEditorValue('');
  }

  const fileDownload = (newValue) => {
    // Save to new file
    const shortName = newValue.name ? newValue.name.slice(0, -4) : null;
    const fileName = prompt('Name the text file', shortName || 'export').toString() || shortName.toString() || 'export';
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('editor').value.toString()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    setFileAttributes({...fileAttributes, name: fileName+'.txt'});
    element.click();
  }

  const handleDownload = () => {
    const newValue = {...fileAttributes, value: value};
    fileDownload(newValue);
  }

/*   
  const handleKeyPress = (event) => {
    event.stopPropagation();
    console.log(event);
  } 
*/

  useEffect(() => {
    if (localGet() !== null && localGet().value !== ''){
      setEditorValue(localGet().value);
      setValue(localGet().value);
      setFileAttributes(localGet());
    } else {
      // setEditorValue(welcomeText);
      setValue(welcomeText);
    }
  }, [])

  return (
    <div className='App'>
      <BumbagProvider theme={theme}>
        <Box backgroundColor='#f5f5f5' padding='1rem' margin='0' minHeight="68px" className="header">
          <Group>
            <FileReader onChange={handleChange} attributes={fileAttributes} />
            {editorValue === '' ? 
              <Clickable 
                use={Button}
                disabled
                variant='ghost'
              >
                <FontAwesomeIcon icon={faFileDownload} /> 
                Download
              </Clickable>
            : 
              <Clickable
                use={Button}
                palette="primary"
                variant="outlined"
                onClick={handleDownload}
              >
                <FontAwesomeIcon icon={faFileDownload} /> 
                Download
              </Clickable>
            }
            { editorValue === '' ?
              <Clickable use={Button} disabled variant='ghost'><FontAwesomeIcon icon={faSave} />Save</Clickable>
            : localGet().value === editorValue || fileAttributes.value === editorValue ? 
              <Clickable use={Button} disabled variant='ghost'><FontAwesomeIcon icon={faCheck} />Save</Clickable>
            : /* fileAttributes.value !== '' && fileAttributes.value !== localGet().value ? */
              <Clickable
                use={Button}
                palette="primary"
                variant="outlined"
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faSave} /> 
                Save
              </Clickable>
            }
            {localGet().value !== ''?
              <Clickable
                use={Button}
                palette="danger"
                onClick={localRemove}
              >
                <FontAwesomeIcon icon={faTimes} /> 
                Clear
              </Clickable>
            :
              <Clickable
                use={Button}
                variant='ghost'
                disabled
                onClick={localRemove}
              >
                <FontAwesomeIcon icon={faTimes} /> 
                Clear
              </Clickable>
            }
          </Group>
        </Box>
        <Box className="content">
          <Columns>
            <Columns.Column spread={6}>
              <Box padding='0.75rem' className="textarea-box">
                <Textarea
                  id='editor'
                  className="editor-textarea"
                  value={editorValue}
                  // onKeyPress={handleKeyPress}
                  placeholder={welcomeText}
                  onChange={e => { setValue(e.target.value); setEditorValue(e.target.value) }}
                />
              </Box>
            </Columns.Column>
            <Columns.Column spread={6}>
              <Box padding='1rem 0.75rem'>
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
