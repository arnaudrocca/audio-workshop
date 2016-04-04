class Music {

    constructor(season) {

        this.season = season;
        this.soundPath = this.season.soundPath;

        let constructor = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new constructor();
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    }

    /**
     * loadSound
     */
    loadSound() {

        var request = new XMLHttpRequest();
        request.open('GET', this.soundPath, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function () {

            this.audioCtx.decodeAudioData(request.response, function (buffer) {

                // Success callback
                this.audioBuffer = buffer;

                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                // Play sound
                this.audioSource.start(this.audioCtx.currentTime);

            }.bind(this), function () {

                // Error callback

            });

        }.bind(this);

        request.send();

    }

    /**
     * getFrequencyData
     */
    getFrequencyData() {

        this.analyser.getByteFrequencyData(this.frequencyData);
        return this.frequencyData;

    }

    /**
     * getAverageAmplitude
     */
    getAverageAmplitude() {

        this.amplitudes = 0;
        let frequencyDataLength = this.frequencyData.length;

        for (let i = 0; i < frequencyDataLength; i++) {
            this.amplitude = this.frequencyData[i];
            this.amplitudes += this.amplitude;
        }

        this.averageAmplitude = ((this.amplitudes / frequencyDataLength) * this.season.factor);

        if (this.averageAmplitude == 0)
            this.averageAmplitude = .01; // Never = 0

        return this.averageAmplitude;

    }

}

export default Music;
