import Scene from './scene/scene'
import Season from './lib/season'
import Music from './lib/music'
import Emitter from './lib/emitter'

class App {

	/**
	 * constructor
	 */
	constructor() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.DELTA_TIME = 0;
		this.LAST_TIME = Date.now();
		this.timer = this.timerMouse = 0;
		this.mouseX = this.mouseY = 0;
		this.mouseDown = false;
		this.start = false;

		this.scene = new Scene();
		this.season = new Season();
		this.music = new Music(this.season);
		this.emitter = new Emitter(this);

		let root = document.body.querySelector('.app');
		root.appendChild(this.scene.renderer.view);

		this.music.loadSound();

		this.addListeners();

	}

	/**
	 * onResize
	 * - Triggered when the window is resized
	 */
	onResize() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.emitter.onResize();
		this.scene.resize(this.width, this.height);

	}

	/**
	 * onMouseDown
	 * - Triggered when the user clicks
	 *
	 * @param {obj} event
	 */
	onMouseDown(event) {

		this.mouseDown = true;

		this.event = event || window.event;
		this.mouseX = this.event.clientX;
		this.mouseY = this.event.clientY;

		window.addEventListener('mouseup', this.onMouseUp.bind(this));
		window.addEventListener('mousemove', this.onMouseMove.bind(this));

	}

	/**
	 * onMouseUp
	 * - Triggered when the user releases the click
	 */
	onMouseUp() {

		this.mouseDown = false;
		this.timerMouse = 0;

		window.removeEventListener('mouseup', this.onMouseUp.bind(this));
		window.removeEventListener('mousemove', this.onMouseMove.bind(this));

	}

	/**
	 * onMouseMove
	 * - Triggered when the user moves the mouse
	 *
	 * @param {obj} event
	 */
	onMouseMove(event) {

		this.event = event || window.event;
		this.mouseX = this.event.clientX;
		this.mouseY = this.event.clientY;

	}

	/**
	 * addListeners
	 */
	addListeners() {

		TweenMax.ticker.addEventListener('tick', this.update.bind(this));
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('mousedown', this.onMouseDown.bind(this));

    }

	/**
	 * update
	 * - Triggered on every TweenMax tick
	 */
	update() {

		this.DELTA_TIME = Date.now() - this.LAST_TIME;
		this.LAST_TIME = Date.now();

		if (!this.start && this.music.getAverageAmplitude() > .01) {
			this.start = true;
		}

		if (this.start) {
			this.timer += this.DELTA_TIME / 1000;

			// Reload the page at the end of the music
			if (this.timer > this.music.audioBuffer.duration) {
				location.reload();
			}

			// Reload the page if the user holds a click
			if (this.mouseDown) {
				this.timerMouse += this.DELTA_TIME / 1000;
				if (this.timerMouse >= 1) {
					location.reload();
				}
			}
		}

		this.emitter.update(this.DELTA_TIME);
		this.scene.render();

	}

}

export default App
