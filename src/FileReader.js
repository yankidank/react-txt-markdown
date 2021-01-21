import React from 'react';
import { Button } from 'bumbag';
import ReactFileReader from 'react-file-reader';
import base64 from 'base-64';

export const FileReader = (props) => {
	
	function handleChange(newFileAttributes) {
		// Callback with the new value
		props.onChange(newFileAttributes);
	}
	
	const handleFileChosen = (files) => {
		const file = files.fileList[0];
		const baseRaw = files.base64;
		const baseSplit = baseRaw.split(',')[1].split('=')[0];
		const fileDecode = base64.decode(baseSplit);
		const newFileAttributes = {name: file.name, value: fileDecode }
		handleChange(newFileAttributes)
	};

	return (
		<ReactFileReader 
			handleFiles={handleFileChosen}
			multipleFiles={false}
			fileTypes={[".txt"]}
			base64={true}
		>
			<Button>Select File</Button>
		</ReactFileReader>
	);
}

export default FileReader
