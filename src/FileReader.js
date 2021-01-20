import React, { useEffect, useState } from 'react';
import { Button, PageContent } from 'bumbag';
import BumbagMarkdown from './Bumbag/BumbagMarkdown';
import ReactFileReader from 'react-file-reader';
import base64 from 'base-64';

export const FileReader = () => {

	const [fileAttributes, setFileAttributes] = useState({});
	const [fileContent, setFileContent] = useState('');

	useEffect(() => {
		// console.log(fileContent)
		return function cleanup() {
			// cleanup
		}
	}, [fileContent]);
	
	const handleFileChosen = (files) => {
		const file = files.fileList[0];
		const baseRaw = files.base64;
		const baseSplit = baseRaw.split(',')[1].split('=')[0];
		const fileDecode = base64.decode(baseSplit);
		const newFileAttributes = { name: file.name }
		setFileAttributes(newFileAttributes)
		setFileContent(fileDecode);
	};

	return (
		<PageContent>
			<ReactFileReader 
				handleFiles={handleFileChosen}
				multipleFiles={false}
				fileTypes={[".txt"]}
				base64={true}
			>
				<Button>Select File</Button>
			</ReactFileReader>
			{fileAttributes.name}
			<BumbagMarkdown markdown={fileContent} />
		</PageContent>
	);
}

export default FileReader
