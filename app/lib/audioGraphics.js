import { Graphics } from 'pixi.js'

class AudioGraphics extends Graphics {

    /**
	 * @constructor
	 * @param {object} app - The app
	 */
    constructor(app) {

		super();

        this.app = app;
		this.season = this.app.season;
        this.music = this.app.music;

        this.spectreWidth = 3;
        this.scaleFactor = Math.min(this.app.width, this.app.height) / 300;

        this.frequencyData = this.averageAmplitude = 0;

    }

    /**
	 * @method
	 * @name onResize
	 * @description Triggered when the window is resized
	 */
    onResize() {

        this.scaleFactor = Math.min(this.app.width, this.app.height) / 300;

    }

    /**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 * @param {number} dt
	 */
    update() {

        this.clear();

        let frequencyData = this.music.getFrequencyData();
        let averageAmplitude = this.music.getAverageAmplitude();

        // Background
        this.beginFill(this.season.color, averageAmplitude / 300);
        this.drawRect(0, 0, this.app.width, this.app.height);

        // Audio spectre
        for (let i = 0, l = (this.app.width / 2) / (2 * this.spectreWidth); i < l; i++) {
            this.amplitude = (frequencyData[i] * this.scaleFactor) / 2;
            this.beginFill(this.season.color, this.amplitude / 1000);
            this.drawRect(i * 2 * this.spectreWidth, (this.app.height - this.amplitude) / 2, this.spectreWidth, this.amplitude);
            this.drawRect(this.app.width - this.spectreWidth - (i * 2 * this.spectreWidth), (this.app.height - this.amplitude) / 2, this.spectreWidth, this.amplitude);
        }

        // Circles
        for (let i = 1; i <= 10; i++) {
            this.beginFill(this.season.color, 1 / i);
            this.drawCircle(this.app.width / 2, this.app.height / 2, (averageAmplitude * this.scaleFactor) + i);
        }
        this.beginFill(0x000000);
        this.drawCircle(this.app.width / 2, this.app.height / 2, averageAmplitude * this.scaleFactor);

    }

}

export default AudioGraphics
