import React from 'react';
import Markdown from './react-markdown.js';
import Image from './react-image.js';
import Gallery from './react-gallery.js';
import YouTube from './react-youtube.js';
import MoonLanding from './react-moonlanding.js';

export default class PageContent extends React.Component {
	constructor() {
		super();
	}

	renderElement = (item) => {
		var components = {
			'MoonLanding': MoonLanding,
			'Markdown': Markdown,
			'Image': Image,
			'Gallery': Gallery,
			'YouTube': YouTube
		}

		if (typeof window !== 'undefined' && typeof item.id !== 'undefined') {
			console.log('send', 'event', item.type, window.location.pathname);
			ga('send', 'event', item.type, window.location.pathname, item.id, 1, { 'nonInteraction': 1 });
		}
		else if (typeof window !== 'undefined') {
			console.log('send', 'event', item.type, window.location.pathname);
			ga('send', 'event', item.type, window.location.pathname, 'No id', 1, { 'nonInteraction': 1 });
		}

		return React.createElement(components[item.type], item);
	}

	recurseElements = (item) => {
		return (Object.prototype.toString.call(item) === '[object Array]')
			? item.map(this.recurseElements)
			: this.renderElement(item);
	}

	render() {
		var content = [];

		for (var i = 0; i < Object.keys(this.props).length; i++) {
			content.push(this.recurseElements(this.props[i]));
		}

		return React.createElement("div", { id: "content" }, content)
	}
}