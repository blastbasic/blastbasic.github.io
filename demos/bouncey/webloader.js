var statusElement = document.getElementById('status');

var canvas = document.getElementById( "canvas" );
canvas.style.backgroundColor = "black";

canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;


var Module = {
	preRun: [],
	postRun: [],
	print: (function() {
		var element = document.getElementById('output');
		if (element) element.value = ''; // clear browser cache
		return function(text) {
			if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
			// These replacements are necessary if you render to raw HTML
			//text = text.replace(/&/g, "&amp;");
			//text = text.replace(/</g, "&lt;");
			//text = text.replace(/>/g, "&gt;");
			//text = text.replace('\n', '<br>', 'g');
			console.log(text);
			if (element) {
				element.value += text + "\n";
				element.scrollTop = element.scrollHeight; // focus on bottom
			}
		};
	})(),
	printErr: function(text) {
		if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
		if (0) { // XXX disabled for safety typeof dump == 'function') {
			dump(text + '\n'); // fast, straight to the real console
		} else {
			console.error(text);
		}
	},
	canvas: (function() {
		var canvas = document.getElementById('canvas');

		// As a default initial behavior, pop up an alert when webgl context is lost. To make your
		// application robust, you may want to override this behavior before shipping!
		// See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
		//canvas.addEventListener("webglcontextlost", function(e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);

		return canvas;
	})(),
	setStatus: function(text) {
		if (!Module.setStatus.last) Module.setStatus.last = {
			time: Date.now(),
			text: ''
		};
		if (text === Module.setStatus.text) return;
		var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
		var now = Date.now();
		if (m && now - Date.now() < 30) return; // if this is a progress update, skip it if too soon
		statusElement.innerHTML = text;
	},
	totalDependencies: 0,
	monitorRunDependencies: function(left) {
		this.totalDependencies = Math.max(this.totalDependencies, left);
		Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
	}
};

var demo = "bouncey";
//var baseurl = "https://sandbox.blitzcoder.org/blitzx/" + demo + "/" + demo;
var baseurl = demo;

(function() {
	var memoryInitializer = baseurl + '.html.mem';
	if (typeof Module['locateFile'] === 'function') {
		memoryInitializer = Module['locateFile'](memoryInitializer);
	} else if (Module['memoryInitializerPrefixURL']) {
		memoryInitializer = Module['memoryInitializerPrefixURL'] + memoryInitializer;
	}
	var xhr = Module['memoryInitializerRequest'] = new XMLHttpRequest();
	xhr.open('GET', memoryInitializer, true);
	xhr.responseType = 'arraybuffer';
	xhr.send(null);
})();

var script = document.createElement('script');
script.src = baseurl + ".js";
document.body.appendChild(script);

//var help = document.createTextNode("Press WASD to move camera. [ ] to rotate. Q/Z for zoom");
//helpDiv = document.getElementById("help");
//helpDiv.appendChild(help);