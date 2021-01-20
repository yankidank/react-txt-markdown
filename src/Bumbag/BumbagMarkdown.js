import React from 'react'
import { Stack } from 'bumbag';
import { Markdown } from 'bumbag-addon-markdown'

function BumbagMarkdown(props) {
	return (
		<div>
			<Markdown
				wrap={children => <Stack spacing="major-2">{children}</Stack>}
				content={props.markdown}
			/> 
		</div>
	)
}

export default BumbagMarkdown

/* 
<Markdown
  wrap={children => <Stack spacing="major-2">{children}</Stack>}
  content={`
A _friendly_, _themeable_, _accessible_ **React UI Kit** built with [Reakit](https://reakit.io).
\n\n
> This is a blockquote.
\n\n
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\n\n
**This is bold text**\n
_This is italic text_\n
_**This is bold italic text**_\n
\n\n
- Get
- Around
- This
- List
\n\n
1. What
1. About
1. An
1. Ordered
1. One?
\n\n
| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
\n\n\n\n
It also supports [links](https://google.com)
\n\n
And images:\n
![Bumbag](https://raw.githubusercontent.com/bumbagui/bumbag/master/logo.png)
`}
/> */