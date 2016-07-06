import Particle from './Particle'
import AudioGraphics from './AudioGraphics'
import Cursor from './Cursor'

class Emitter {

	/**
	 * @constructor
	 * @param {object} app - The app
	 */
	constructor(app) {

		this.app = app;
		this.scene = this.app.scene;
		this.audio = this.app.audio;

		this.particles = new Array();
		this.audioGraphics = new AudioGraphics(this.app);
		this.cursor = new Cursor(this.app);

		this.timer = 0;

	}

	/**
     * @method
     * @name throw
     * @description Add new particles in the scene
     * @param {number} number - Number of thrown particles
     */
	throw(number) {

		for (let i = 0; i < number; i++) {
			const particle = new Particle(this.app);

			this.particles.push(particle);
			this.scene.add(particle);
		}

	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 * @param {number} dt - DELTA_TIME
	 */
	update(dt) {

		let average = this.audio.getAverage();

		this.timer += dt;

		// The number of particles throwed depends of the average amplitude
		if (this.timer >= 100) {
			this.throw(Math.floor(average / 5));
			this.timer = 0;
		}

		this.scene.remove(this.audioGraphics);
		this.scene.remove(this.cursor);

		// Update the particles
		for (let i in this.particles) {
			const particle = this.particles[i];
			particle.update(dt);
			// Kill the particles
			if (!particle.isAlive) {
				this.particles.splice(i, 1);
				this.scene.remove(particle);
			}
		}

		// Update the audio graphics and the cursor
		this.audioGraphics.update();
		this.cursor.update();

		this.scene.add(this.audioGraphics);
		this.scene.add(this.cursor);

	}

}

export default Emitter
