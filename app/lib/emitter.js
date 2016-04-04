import Particle from './particle';
import AudioGraphics from './audioGraphics';
import Cursor from './cursor';

class Emitter {

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
	 * throw
	 * - Add new particles in the scene
	 *
	 * @param {number} nb
	 */
	throw(nb) {

		for (let i = 0; i < nb; i++) {
			let p = new Particle(this.app);
			this.particles.push(p);
			this.scene.addChild(p);
		}

	}

	update(dt) {

		this.averageAmplitude = this.music.getAverageAmplitude();

		this.scene.removeChild(this.audioGraphics);
		this.scene.removeChild(this.cursor);

		this.timer += dt;
		// The number of particles throwed depends of the average amplitude
		if (this.timer >= 500) {
			this.throw(Math.floor(this.averageAmplitude));
			this.timer = 0;
		}

		// Update the particles
		for (let i = 0; i < this.particles.length; i++) {
			let p = this.particles[i];
			p.update(dt);
			// Kill the particles
			if (!p.isAlive) {
				this.particles.splice(i, 1);
				this.scene.removeChild(p);
			}
		}

		// Update the audio graphics and the cursor
		this.audioGraphics.update(dt);
		this.cursor.update(dt);

		this.scene.addChild(this.audioGraphics);
		this.scene.addChild(this.cursor);

	}

}

export default Emitter;
