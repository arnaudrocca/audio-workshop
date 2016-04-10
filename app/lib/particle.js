import { Graphics } from 'pixi.js'

class Particle extends Graphics {

	/**
	 * constructor
	 *
	 * @param {obj} app - The app
	 */
	constructor(app) {

		super();

		this.app = app;
		this.season = this.app.season;
		this.music = this.app.music;

		this.x = window.innerWidth / 2;
		this.y = window.innerHeight / 2;
		this.size = 2;
		this.pivot.set(this.size / 2);
		this.angle = Math.random() * 2 * Math.PI;
		this.alpha = Math.random() * .3 + .2;
		this.easing = 5;

		if (Math.random() < .5) {
			this.type = true;
		} else {
			this.type = false;
		}

		this.life = Math.random() * 25;
		this.isAlive = true;

		this.sphereRadius = 2;

	}

	/**
	 * update
	 * - Triggered on every TweenMax tick
	 *
	 * @param {number} dt
	 */
	update(dt) {

		this.clear();

		this.averageAmplitude = this.music.getAverageAmplitude();

		if (this.type) {
			this.angle += .01;
			this.rotation += 0.05 * this.season.spinSpeed;
		} else {
			this.angle -= .01;
			this.rotation -= 0.05 * this.season.spinSpeed;
		}

		if (this.easing > 0) {
			this.easing -= .1;
		} else {
			this.easing = 0;
		}

		// The particle's sphere stay responsive
		this.vx = (this.sphereRadius + this.easing) * Math.cos(this.angle);
		this.vy = (this.sphereRadius + this.easing) * Math.sin(this.angle);
		this.x += (Math.min(this.app.width, this.app.height) / 1000) * this.vx;
		this.y += (Math.min(this.app.width, this.app.height) / 1000) * this.vy;

		this.life -= dt / 1000;

		// Kill the particle with a fadeOut
		if (this.life <= this.alpha * 5) {
			this.alpha -= 5 / 1000 * dt;
		}
		if (this.life <= 0) {
			this.isAlive = false;
		}

		// Draw the particle
		this.beginFill(this.season.color);
		this.drawEllipse(0, 0, this.size, 1.5 * this.size);

	}

}

export default Particle
