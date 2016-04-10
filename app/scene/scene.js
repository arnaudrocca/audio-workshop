import { WebGLRenderer, Container } from 'pixi.js'
var pixi = require('pixi.js')

class Scene {

	/**
	 * constructor
	 */
	constructor() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer = new WebGLRenderer(this.width, this.height, { antialias: true });

		this.stage = new Container();

	}

	/**
	 * addChild
	 * - Add a child to the stage
	 *
	 * @param {obj} child - A PIXI object
	 */
	addChild(child) {

		this.stage.addChild(child);

	}

	/**
	 * removeChild
	 * - Remove a child from the stage
	 *
	 * @param {obj} child - A PIXI object
	 */
	removeChild(child) {

		this.stage.removeChild(child);

	}

	/**
	 * render
	 * - Renders/Draw the scene
	 */
	render() {

		this.renderer.render(this.stage);

	}

	/**
	 * resize
	 * - Resize the scene according to screen size
	 *
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
	resize(newWidth, newHeight) {

		this.renderer.resize(newWidth, newHeight);

	}

}

export default Scene
