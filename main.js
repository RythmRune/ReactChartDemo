
"use strict";

const config = require("./Config");

const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router")
const router = new Router();

app.use(require("koa-morgan")("combined", {
	stream: require("file-stream-rotator").getStream(
		{
			filename: "./log/log_%DATE%.log",
			frequency: "daily",
			verbose: false,
		}
	)
}));

app.use(require("koa-views")(__dirname + "/views", {
	extension: "pug"
}));

// public
app.use(require("koa-static")(require("path").join(__dirname, "/public")));

// // bootstrap
// app.use(require("koa-static")(require("path").join(__dirname, "/node_modules/bootstrap/dist/js")));
// app.use(require("koa-static")(require("path").join(__dirname, "/node_modules/bootstrap/dist/css")));

// // jquery
// app.use(require("koa-static")(require("path").join(__dirname, "/node_modules/jquery/dist")));

// // popper.js
// app.use(require("koa-static")(require("path").join(__dirname, "/node_modules/popper.js/dist/umd")));

//router
router.all("*", require("./controllers/IndexController").init);
app.use(router.routes());

app.listen(config[app.env].port);

console.info("Service executed on " + app.env);
console.info("Port " + config[app.env].port);