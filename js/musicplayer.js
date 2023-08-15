class MusicPlayer {
    audio = null;
    isPlaying = false;
    analyser = null;
    dataArray = null;
    constructor(uri) {
        /**
         * Loading audio
         */
        const audio = this.audio = new Audio(uri);
        
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
        this.audio.play();
    }

    /**
     * Stop audio
     */
    stop() {
        this.audio.stop();
    }

    /**
     * Pause audio
     */
    pause() {
        this.audio.pause();
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
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }
}