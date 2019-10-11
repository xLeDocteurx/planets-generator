let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function stats_begin() {
	stats.begin();
}

function stats_end() {
	stats.end();
}