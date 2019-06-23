export const richTextToHTML = elem => {
	let outputString = '';

	outputString += `<${elem.type}${
		elem.type === 'a'
			? ` href='${elem.props.href}' rel='${elem.props.rel}' target='${
					elem.props.target
			  }'`
			: elem.type === 'img'
			? ` style='${elem.props.style}' class='${elem.props.class}' src='${
					elem.props.src
			  }' alt='${elem.props.alt}'`
			: ''
	}>`;

	elem.props.children.forEach(child => {
		outputString +=
			typeof child === 'string' ? child : richTextToHTML(child);
	});
	if (!['br', 'img'].includes(elem.type)) outputString += `</${elem.type}>`;

	return outputString;
};
