import { WebGLRenderer, Container } from 'pixi.js'

class Scene {

	/**
	 * @constructor
	 */
	constructor() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer = new WebGLRenderer(this.width, this.height, { antialias: true });

		this.stage = new Container();

	}

	/**
	 * @method
	 * @name addChild
	 * @description Add a child to the stage
	 * @param {object} child - A PIXI object
	 */
	addChild(child) {

		this.stage.addChild(child);

	}

	/**
	 * @method
	 * @name removeChild
	 * @description Remove a child from the stage
	 * @param {object} child - A PIXI object
	 */
	removeChild(child) {

		this.stage.removeChild(child);

	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		this.renderer.render(this.stage);

	}

	/**
	 * @method
	 * @name resize
	 * @description Resize the scene according to screen size
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
	resize(newWidth, newHeight) {

		this.renderer.resize(newWidth, newHeight);

	}

}

export default Scene
