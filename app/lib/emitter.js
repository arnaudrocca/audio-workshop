import Particle from './particle'
import AudioGraphics from './audioGraphics'
import Cursor from './cursor'

class Emitter {

	/**
	 * constructor
	 *
	 * @param {obj} app - The app
	 */
	constructor(app) {

		this.app = app;
		this.scene = this.app.scene;
		this.music = this.app.music;

		this.particles = new Array();
		this.audioGraphics = new AudioGraphics(this.app);
		this.cursor = new Cursor(this.app);

		this.timer = 0;

	}

	/**
	 * onResize
	 * - Triggered when the window is resized
	 */
	onResize() {

		this.audioGraphics.onResize();

	}

	/**
	 * throw
	 * - Add new particles in the scene
	 *
	 * @param {number} nb - The number of particles to throw
	 */
	throw(nb) {

		for (let i = 0; i < nb; i++) {
			const particle = new Particle(this.app);
			this.particles.push(particle);
			this.scene.addChild(particle);
		}

	}

	/**
	 * update
	 * - Triggered on every TweenMax tick
	 *
	 * @param {number} dt
	 */
	update(dt) {

		let averageAmplitude = this.music.getAverageAmplitude();

		this.timer += dt;

		// The number of particles throwed depends of the average amplitude
		if (this.timer >= 100) {
			this.throw(Math.floor(averageAmplitude / 5));
			this.timer = 0;
		}

		this.scene.removeChild(this.audioGraphics);
		this.scene.removeChild(this.cursor);

		// Update the particles
		const self = this;
		this.particles.forEach(function(particle, index) {
			particle.update(dt);
			// Kill the particles
			if (!particle.isAlive) {
				self.particles.splice(index, 1);
				self.scene.removeChild(particle);
			}
		});

		// Update the audio graphics and the cursor
		this.audioGraphics.update();
		this.cursor.update(dt);

		this.scene.addChild(this.audioGraphics);
		this.scene.addChild(this.cursor);

	}

}

export default Emitter
