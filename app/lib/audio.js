class Audio {

    /**
	 * @constructor
	 * @param {object} season - The season
	 */
    constructor(season) {

        this.season = season;
        this.soundPath = this.season.soundPath;

        const Constructor = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new Constructor();
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    }

    /**
	 * @method
	 * @name loadSound
	 * @description Load the sound
	 */
    loadSound() {

        const request = new XMLHttpRequest();
        request.open('GET', this.soundPath, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = () => {

            this.audioCtx.decodeAudioData(request.response, (buffer) => {

                // SUCCESS CALLBACK

                // Create sound from buffer
                this.audioBuffer = buffer;
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                // Audio source params
                this.audioSource.crossOrigin = 'anonymous';

                // Play sound
                this.audioSource.start(this.audioCtx.currentTime);

            }, (error) => {

                // ERROR CALLBACK
                console.info(`The following error occured : \n${error}`);

            });

        }

        request.send();

    }

    /**
	 * @method
	 * @name getFrequencyData
	 * @return {array} frequencyData
	 */
    getFrequencyData() {

        this.analyser.getByteFrequencyData(this.frequencyData);
        return this.frequencyData;

    }

    /**
	 * @method
	 * @name getAverage
	 * @return {number} average
	 */
    getAverage() {

        let amplitudes = 0;

        for (let amplitude of this.frequencyData) {
            amplitudes += amplitude;
        }

        let average = (amplitudes / this.frequencyData.length) * this.season.factor;

        if (average <= 0) {
            average = .01; // Never = 0
        }

        return average;

    }

}

export default Audio
