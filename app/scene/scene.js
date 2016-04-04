import { WebGLRenderer, Container } from 'pixi.js';
var pixi = require('pixi.js');

class Scene {

	constructor() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer = new WebGLRenderer(this.width, this.height, {
			antialias: true
		});

		this.stage = new Container();

	}

	/**
	 * Add a child to the stage
	 *
	 * @param {obj} child - a PIXI object
	 */
	addChild(child) {

		this.stage.addChild(child);

	}

	/**
	 * Remove a child from the stage
	 *
	 * @param {obj} child - a PIXI object
	 */
	removeChild(child) {

		this.stage.removeChild(child);

	}

	/**
	 * Renders/Draw the scene
	 */
	render() {

		this.renderer.render(this.stage);

	}

	/**
	 * Resize the scene according to screen size
	 *
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
	resize(newWidth, newHeight) {

		this.renderer.resize(newWidth, newHeight);

	}

}

export default Scene;
