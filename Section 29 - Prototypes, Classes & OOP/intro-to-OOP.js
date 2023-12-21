
// like this we can add method to prototype of string, so every string here can use this method. This is not good idea!!!
String.prototype.greet = function () {
    console.log("Hello");
}

// Like this we can override some method (again this is not good idea!!)

String.prototype.toUpperCase = function () {
    console.log("I don't like this toUpperCase method so it will not work in future!")
}

// Now we are going to see how factory function looks like. This approach is overriden with classes (we will see it later)
// When we create objects like this, every object has its own function (rgb and hex)
// play with this in console to see how it is working

function makeColor(r, g, b) {
    const color = {}; // first we create an empty object which will be returned at the end
    // now we will add properties to the object
    color.r = r;
    color.g = g;
    color.b = b;

    // now we will add some methods to this object
    color.rgb = function () {
        const { r, g, b } = this; // destructuring "this" object so we dont need to use this.r and so on every time we use properties
        return `rgb(${r}, ${g}, ${b})`;
    }

    color.hex = function () {
        const { r, g, b } = this; // dont' use arrow functions when using keyword 'this' because it acts different then
        return ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
    }
    return color;
}

const color1 = makeColor(230, 15, 122);  // now this is object that represents color based on arguments we provided

// Next approach is a way better - constructor functions
// When we create objects on this way, functions are added to the prototype so every object reuse same function from __proto__

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}
// Now .this refers to that object on which we are calling method (color1.rgb() - this refers to the color1)

Color.prototype.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
}

Color.prototype.hex = function () {
    const { r, g, b } = this;
    return ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
}

Color.prototype.rgba = function (a) {
    const { r, g, b } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const color2 = new Color(5, 66, 156);
const color3 = new Color(77, 244, 15);

// Now we will se the best aproach, using class

class Colorr {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }

    rgb() {
        const { r, g, b } = this;
        return `rgb(${this.innerRGB()})`;
    }

    innerRGB() {
        const {r, g, b} = this;
        return `${r}, ${g}, ${b}`;
    }

    hex() {
        const { r, g, b } = this;
        return ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
    }

    rgba(a = 1.0) { // 1.0 is default value for alpha so if we don't provide our alpha, it will be 1.0
        const { r, g, b } = this;
        return `rgba(${this.innerRGB()}, ${a})`;
    }

    // this method will calculate hsl from rgb
    calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		this.h = h;
		this.s = s;
		this.l = l;
	}

    hsl () {
        const {h, s, l} = this;
        return `hsl(${h}, ${s}, ${l})`;
    }

    opposite () {
        const {h, s, l} = this;
        const newH = (h +180) % 360;
        return `hsl(${newH}, ${s}, ${l})`;
    }
}

const a = new Colorr(22, 33, 44, "hehe");
console.log(a.hsl());



