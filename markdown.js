let string = '';

function inlineCode(){
	if(/`[\w|\t|\r|\W]*`/.test(string)){
		string = string.replace('`', '<code>').replace('`', '</code>');
		inlineCode();
	}
}

function bold(){
	if(string.includes('**')){
		string = string.replace('**', '<strong>').replace('**', '</strong>');
		bold();
	}
}

function italic(){
	if(string.includes('_')){
		string = string.replace('_', '<em>').replace('_', '</em>');
		italic();
	}
}

function strikethrough(){
	if(string.includes('~~')){
		string = string.replace('~~', '<span style="text-decoration:line-through">').replace('~~', '</span>');
		strikethrough();
	}
}

function multiLineCode(){
	if(string.includes('```')){
		string = string.replace('```', '<codea>').replace('```', '</codea>');
		multiLineCode();
	}
}

function multiLineCodeReplace(){
	if(string.includes('<codea>')){
		string = string.replaceAll('<codea>', '<pre><code>').replaceAll('</codea>', '</code></pre>');
	}
}

function blockQuote(str){
	if(str.trim().startsWith('&gt;')){
		str = str.replace('&gt;', '<blockquote>');
		if(str.includes('<br>')){
			str = str.replace('<br>', '</blockquote>');
		}
		else if(str.includes('<p>')){
			str = str.replace('<p>', '</blockquote><p>');
		}
		else{
			str = str + '</blockquote>';
		}
		console.log(str);
	}
	return str;
}

function convertMarkdown(textbox){
	string = document.getElementById(textbox).value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;');
	string = string.replaceAll("'", '&#39;');
	string = string.replaceAll('"', '&#34;');
	string = string.replace(/'/g, "\\'");
	if(!string.includes('\n') && !string.includes('\r')){
		string = '<p>' + string + '</p>';
	}

	string = string.replaceAll('\n\n', '<p>').replaceAll('<p></p>', '');
	string = string.replaceAll('\n\r', '<br>');

	bold();
	italic();
	strikethrough();
	string = string.replaceAll('&nbsp;', ' ');

	let headers = [
		{
			md: '###### ',
			tag: '<h6>',
			tagName: 'h6'
		},
		{
			md: '##### ',
			tag: '<h5>',
			tagName: 'h5'
		},
		{
			md: '#### ',
			tag: '<h4>',
			tagName: 'h4'
		},
		{
			md: '### ',
			tag: '<h3>',
			tagName: 'h3'
		},
		{
			md: '## ',
			tag: '<h2>',
			tagName: 'h2'
		},
		{
			md: '# ',
			tag: '<h1>',
			tagName: 'h1'
		}
	];
	string = string.replace('\n\r', '<br>');
	let strArray = string.split('\n');

	for(let i = 0; i < strArray.length; i++){
		if(/`[\w|\t|\r|\W]*`/.test(string)){
			if(strArray[i].includes('```')){
				let newArrayStr = '';
				newArray = strArray[i].split(' ');
				for(let j = 0; j < newArray.length; j++){
					if(newArray[j].includes('&#39;') || newArray[j].includes('&#34;')){
						newArray[j] = newArray[j].replaceAll('`', 'nsbkey1-');
					}
					newArrayStr += newArray[j] + ' ';
				}

				strArray[i] = newArrayStr;
			}
		}

		if(/\[[\w|\t|\r|\W](\w|\t|\r|\W)\]*/g.test(strArray[i])){
			let url = strArray[i].match(/\((.*)\)/);
			if(!strArray[i].includes('![')){
				strArray[i] = strArray[i].replace('[', '<a href="'+url[1]+'" target="_blank">').replace(']', '</a>').replace(/\((.*)\)/g, '');
			}else{
				let altText = strArray[i].match(/\[(.*)\]/);
				strArray[i] = strArray[i].replace(/\[(.*)\]/g, '<img src="'+url[1]+'" alt="'+altText[1]+'">').replace(/\((.*)\)/g, '').replace('!', '');
			}
		}

		strArray[i] = blockQuote(strArray[i]);

		if(strArray[i].trim().includes(' #')){
			strArraySplit = strArray[i].split(' #');
			
			for(let j = 0; j < strArraySplit.length; j++){
				if(j > 0){
					strArraySplit[j] = '#' + strArraySplit[j];
				}
				for(let k = 0; k < headers.length; k++){
					if(strArraySplit[j].includes(headers[k].md)){
						let regex =  new RegExp(headers[k].md,'g');
						strArraySplit[j] = strArraySplit[j].trim();
						strArraySplit[j] = '\n' + strArraySplit[j].replace(regex, headers[k].tag) + headers[k].tag.replace('<', '</');
					}
				}
			}
			strArray[i] = strArraySplit.toString().replace(/,/g, '\n');
		}
		for(let j = 0; j < headers.length; j++){
			if(strArray[i].includes(headers[j].md)){
				let regex =  new RegExp(headers[j].md,'g');
				strArray[i] = strArray[i].trim();
				strArray[i] = '\n' + strArray[i].replace(regex, headers[j].tag) + headers[j].tag.replace('<', '</');
			}
		}
	}
	
	string = strArray.toString().replaceAll(/,/g, '<br>').replaceAll('&nbsp;', ' ').replaceAll('</h1><br>', '</h1>').replaceAll('</h2><br>', '</h2>').replaceAll('</h3><br>', '</h3>').replaceAll('</h4><br>', '</h4>').replaceAll('</h5><br>', '</h5>').replaceAll('</h6><br>', '</h6>').replaceAll('<br><br>', '<br>');
	
	multiLineCode();
	multiLineCodeReplace();
	inlineCode();
	string = string.replaceAll('<code></code>', '').replaceAll('nsbkey1-', '`');

	strArray = string.split('<p>');
	let newString = '';
	for(let i = 0; i < strArray.length; i++){
		if(strArray[i].trim().includes('- ')){
			newString += '<ul>' + strArray[i].replaceAll('-', '<li>').replaceAll('<br>', '</li>') + '</ul>';
			console.log(newString);
			strArray[i] = newString;
		}
		
		strArray[i] = blockQuote(strArray[i]);
	}

	return strArray.toString().replaceAll(/,/g, '<p>');
}