import { Graphics } from 'pixi.js';
import EventEmitter from './event-emitter';

class AudioGraphics extends Graphics {

    constructor(app) {

		super();

        this.app = app;
		this.season = this.app.season;
        this.music = this.app.music;

        this.frequencyData = 0;
        this.spectreWidth = 3;
        this.start = false;
        this.startEmitted = false;

    }

    update(dt) {

        this.clear();

        this.frequencyData = this.music.getFrequencyData();
        this.averageAmplitude = this.music.getAverageAmplitude();

        // Background
        this.beginFill(this.season.color, this.averageAmplitude / 300);
        this.drawRect(0, 0, this.app.width, this.app.height);

        // Audio spectre
        for (let i = 0; i < (this.app.width / 2) / (2 * this.spectreWidth); i++) {
            this.amplitude = this.frequencyData[i];
            this.beginFill(this.season.color, this.amplitude / 1000);
            this.drawRect(i * 2 * this.spectreWidth, (this.app.height - this.amplitude) / 2, this.spectreWidth, this.amplitude);
            this.drawRect(this.app.width - this.spectreWidth - (i * 2 * this.spectreWidth), (this.app.height - this.amplitude) / 2, this.spectreWidth, this.amplitude);
        }

        // Middle circles
        this.scaleFactor = Math.min(this.app.width, this.app.height) / 200;
        for (let i = 1; i <= 10; i++) {
            this.beginFill(this.season.color, 1 / i);
            this.drawCircle(this.app.width / 2, this.app.height / 2, (this.averageAmplitude * this.scaleFactor) + i);
        }
        this.beginFill(0x000000);
        this.drawCircle(this.app.width / 2, this.app.height / 2, this.averageAmplitude * this.scaleFactor);

        // Update the cursor style
        if (this.averageAmplitude < 0.1 && !this.start) {
            document.body.style.cursor = 'wait';
        } else {
            document.body.style.cursor = 'pointer';
            this.start = true;
        }

        if (!this.startEmitted && this.start) {
            EventEmitter.emit('START', this.start);
            this.startEmitted = true;
        }

    }

}

export default AudioGraphics;
