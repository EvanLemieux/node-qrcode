import { render, renderToDataURL } from './renderer/canvas.js';
import { create as _create } from './core/qrcode.js';
import { render as _render } from './renderer/svg-tag.js';

function renderCanvas(renderFunc, canvas, text, opts, cb) {
	const args = [].slice.call(arguments, 1);
	const argsNum = args.length;
	const isLastArgCb = typeof args[argsNum - 1] === 'function';

	if (isLastArgCb) {
		if (argsNum < 2) {
			throw new Error('Too few arguments provided');
		}

		if (argsNum === 2) {
			cb = text;
			text = canvas;
			canvas = opts = undefined;
		} else if (argsNum === 3) {
			if (canvas.getContext && typeof cb === 'undefined') {
				cb = opts;
				opts = undefined;
			} else {
				cb = opts;
				opts = text;
				text = canvas;
				canvas = undefined;
			}
		}
	} else {
		if (argsNum < 1) {
			throw new Error('Too few arguments provided');
		}

		if (argsNum === 1) {
			text = canvas;
			canvas = opts = undefined;
		} else if (argsNum === 2 && !canvas.getContext) {
			opts = text;
			text = canvas;
			canvas = undefined;
		}

		return new Promise((resolve, reject) => {
			try {
				const data = _create(text, opts);
				resolve(renderFunc(data, canvas, opts));
			} catch (e) {
				reject(e);
			}
		});
	}

	try {
		const data = _create(text, opts);
		cb(null, renderFunc(data, canvas, opts));
	} catch (e) {
		cb(e);
	}
}

export const create = _create;
export const toCanvas = renderCanvas.bind(null, render);
export const toDataURL = renderCanvas.bind(null, renderToDataURL);

export const toString = renderCanvas.bind(null, (data, _, opts) => {
	return _render(data, opts);
});
