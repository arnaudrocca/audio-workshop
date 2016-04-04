import { Graphics } from 'pixi.js';

class Particle extends Graphics {

	constructor(app) {

		super();

		this.app = app;
		this.season = this.app.season;
		this.music = this.app.music;

		if (Math.random() < .5) {
			this.type = true;
		} else {
			this.type = false;
		}

		this.x = window.innerWidth / 2;
		this.y = window.innerHeight / 2;
		this.size = 2;
		this.angle = Math.random() * 2 * Math.PI;
		this.alpha = Math.random() * .3 + .2;
		this.easing = 5;

		this.life = Math.random() * 25000;
		this.isAlive = true;

		this.sphereRadius = 2.5;

	}

	update(dt) {

		this.clear();

		this.averageAmplitude = this.music.getAverageAmplitude();

		this.scale.x = this.scale.y = 1 + (this.averageAmplitude / 50);
		this.pivot.set(this.size / 2);

		if (this.type) {
			this.angle += 0.01;
			this.rotation += 0.05 * this.season.spinSpeed;
		} else {
			this.angle -= 0.01;
			this.rotation -= 0.05 * this.season.spinSpeed;
		}

		if (this.easing > 0) {
			this.easing -= 0.1;
		}

		// The particle's sphere stay responsive
		this.vx = (this.sphereRadius + this.easing) * Math.cos(this.angle);
		this.vy = (this.sphereRadius + this.easing) * Math.sin(this.angle);
		this.x += (Math.min(this.app.width, this.app.height / 1250)) * this.vx;
		this.y += (Math.min(this.app.width, this.app.height / 1250)) * this.vy;

		this.life -= dt;

		// Kill the particle with a fadeOut
		if (this.life <= this.alpha * 500) {
			this.alpha -= 0.05;
		}
		if (this.life <= 0) {
			this.isAlive = false;
		}

		this.beginFill(this.season.color);
		this.drawEllipse(0, 0, this.size, 1.5 * this.size);

	}

}

export default Particle;
