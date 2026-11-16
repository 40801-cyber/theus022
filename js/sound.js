// Web Audio API Sound Synthesizer for CadêMeuCelular?
// Produces native, high-fidelity sound effects without external audio dependencies.

class SoundFX {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.alarmInterval = null;
        this.isAlarmPlaying = false;
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.isAlarmPlaying) {
            this.stopAlarm();
        }
        return this.isMuted;
    }

    // Dramatic heartbeat for the 5-second simulation
    playHeartbeat() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.18);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.26);

        // Second beat of the heart
        setTimeout(() => {
            if (this.isMuted || !this.ctx) return;
            const now2 = this.ctx.currentTime;
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(60, now2);
            osc2.frequency.exponentialRampToValueAtTime(32, now2 + 0.15);

            gain2.gain.setValueAtTime(0.3, now2);
            gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.22);

            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);

            osc2.start(now2);
            osc2.stop(now2 + 0.23);
        }, 180);
    }

    // High-tech radar sonar ping
    playRadarPing() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(980, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.46);
    }

    // Loud, unmistakable phone finder melody that breaks silent mode
    startAlarm() {
        if (this.isAlarmPlaying) return;
        this.initContext();
        this.isAlarmPlaying = true;

        const playChimeSequence = () => {
            if (!this.ctx || this.isMuted || !this.isAlarmPlaying) return;
            const notes = [659.25, 783.99, 987.77, 1318.51, 987.77, 1318.51]; // E5, G5, B5, E6...
            notes.forEach((freq, idx) => {
                const startTime = this.ctx.currentTime + (idx * 0.13);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.25, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.2);
            });
        };

        playChimeSequence();
        this.alarmInterval = setInterval(playChimeSequence, 1200);
    }

    stopAlarm() {
        this.isAlarmPlaying = false;
        if (this.alarmInterval) {
            clearInterval(this.alarmInterval);
            this.alarmInterval = null;
        }
    }

    playClick() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
    }
}

window.soundFX = new SoundFX();
