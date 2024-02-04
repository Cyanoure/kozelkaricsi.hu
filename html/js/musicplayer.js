class MusicPlayer {
    audio = null;
    isPlaying = false;
    analyser = null;
    dataArray = new Uint8Array(64);
    constructor(uri) {
        this.uri = uri;
    }

    /**
     * Create player
     */
    init() {
        /**
                 * Loading audio
                 */
        const audio = this.audio = new Audio(this.uri);
                
        /**
         * Register audio events
        */
        audio.addEventListener("playing", e => {
            this.isPlaying = true;
        });
        audio.addEventListener("ended", e => {
            this.isPlaying = false;
        });
        audio.addEventListener("pause", e => {
            this.isPlaying = false;
        });

        /**
         * Audio analyser
         */
        const context = new AudioContext();
        const src = context.createMediaElementSource(audio);
        const analyser = this.analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 32;

        this.dataArray = new Uint8Array(analyser.frequencyBinCount);
    }

    /**
     * Play audio
     */
    play() {
        if (this.audio) {
            this.audio.play();
        } else {
            this.init();
            this.audio.play();
        }
    }

    /**
     * Stop audio
     */
    stop() {
        if (this.audio) {
            this.audio.stop();
        }
    }

    /**
     * Pause audio
     */
    pause() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    /**
     * Pause or unpause
     */
    pauseOrPlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Getting the frequency data array in Uint8Array.
     * @returns Frequency data array in Uint8Array.
     */
    getFrequencyData() {
        if (this.analyser) this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }
}