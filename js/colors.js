class Colors {
    static getNumberFromRangeByPercent(start, target, percent = 0) {
        if (percent === 0) {
            return start;
        } else if(percent === 1) {
            return target;
        } else {
            const diff = target-start;
            const finalDiff = diff * percent;
            return start + finalDiff;
        }
    }

    static getColorFromGradientA(startColor, targetColor, percent = 0) {
        return [
            Math.floor(this.getNumberFromRangeByPercent(startColor[0], targetColor[0], percent)),
            Math.floor(this.getNumberFromRangeByPercent(startColor[1], targetColor[1], percent)),
            Math.floor(this.getNumberFromRangeByPercent(startColor[2], targetColor[2], percent))
        ];
    }

    static colorToHexString(color) {
        const colorHelper = ("000000"+color.toString(16));
        return colorHelper.substring(colorHelper.length - 6);
    }

    static colorToRGBArray(color) {
        const colorString = this.colorToHexString(color);
        const strR = colorString.substring(0, 2);
        const strG = colorString.substring(2, 4);
        const strB = colorString.substring(4, 6);
    
        return [
            parseInt(strR, 16),
            parseInt(strG, 16),
            parseInt(strB, 16)
        ];
    }

    static getColorFromGradient(startColor, targetColor, percent = 0) {
        const startColorA = this.colorToRGBArray(startColor);
        const targetColorA = this.colorToRGBArray(targetColor);
        
        const colorA = this.getColorFromGradientA(startColorA, targetColorA, percent);
        const rHex = this.colorToHexString(colorA[0]).substring(4);
        const gHex = this.colorToHexString(colorA[1]).substring(4);
        const bHex = this.colorToHexString(colorA[2]).substring(4);
    
        const colorStr = rHex + gHex + bHex;
        return "#" + colorStr;
    }
}