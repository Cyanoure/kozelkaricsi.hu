// https://pixabay.com/music/electro-data-breach-112775/
const mp = new MusicPlayer("sounds/music/data-breach-112775.mp3");

//const bpm = 106.91;
const bpm = 105;
const bpmOffsetMS = 600;

const bpMS = bpm / 60 / 1000;
const msPerBeat = 1/bpMS;

const canvas = document.getElementById("audioVisualizer");
const ctx = canvas.getContext("2d");

const profile = document.getElementById("profile");

profile.addEventListener("click", ()=>{
    mp.pauseOrPlay();
});

function drawLine(x, y, percent, maxHeight = 60, lineWidth = 2, color = "red") {
    const height = maxHeight*percent;
    const halfHeight = height/2;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, lineWidth, lineWidth);
    if(halfHeight >= 1) {
        ctx.fillRect(x, y + lineWidth/2, lineWidth, halfHeight);
        ctx.fillRect(x, y - halfHeight, lineWidth, halfHeight);
    }
}

function drawSpectrum(spectrum, x, y, maxWidth, maxHeight, lineWidth = 2, lines = 32, delta = 1/60) {
    const array = [];

    let j = lines/2;
    for(let i = 0; i < lines/2; i++) {
        array[i] = spectrum[lines/2 - i] / 255;
        array[(lines-1) - i] = spectrum[lines/2 - i] / 255;
        j++;
    }

    spectrum = array;
    
    const oldArray = ctx.getImageData(0,0,canvas.width,canvas.height);
    //count through only the alpha pixels
    for(let d=3;d<oldArray.data.length;d+=4){
        oldArray.data[d] = Math.floor(oldArray.data[d]*(1 - Math.max(0, Math.min(1, delta * 30))));
    }
    ctx.putImageData(oldArray,0,0);

    
    let currX = x - maxWidth / 2;
    const spaceWidth = (maxWidth - lineWidth * spectrum.length) / (spectrum.length - 1);
    for (let i = 0; i < spectrum.length; i++) {
        const color = Colors.getColorFromGradient(0x2bd5ff, 0xb75fff, Math.min(i, spectrum.length*0.6)/(spectrum.length*0.6));
        const value = spectrum[i];
        drawLine(currX, y, value, maxHeight, lineWidth, color);
        currX += spaceWidth + lineWidth;
    }
}

let prevTime = Date.now();
let beatCount = 0;
function render() {
    const newTime = Date.now();
    const delta = (newTime - prevTime)/1000;
    prevTime = newTime;

    const frequencyData = mp.getFrequencyData();
    const t = mp.isPlaying ? mp.audio.currentTime * 1000 : 0;
    const offsettedT = t+bpmOffsetMS;
    
    let freqSum = 0;
    frequencyData.forEach(v => {
        freqSum+=v;
    });
    const freqAVG = freqSum / frequencyData.length;

    const calculatedBeat = Math.ceil(offsettedT/msPerBeat);

    if (beatCount !== calculatedBeat && mp.isPlaying) {
        beatCount = calculatedBeat;
        if (freqAVG >= 120) {
            document.body.classList.add("loudbeat");
            setTimeout(()=>{
                document.body.classList.remove("loudbeat");
            }, msPerBeat/2);
        }
        document.body.classList.add("beat");
        setTimeout(()=>{
            document.body.classList.remove("beat");
        }, msPerBeat/2);
    }

    drawSpectrum(frequencyData, 60, 15, canvas.width, canvas.height, 2, 32, delta);

    if (!mp.isPlaying && t === 0) {
        beatCount = 0;
    }

    requestAnimationFrame(render);
}

render();