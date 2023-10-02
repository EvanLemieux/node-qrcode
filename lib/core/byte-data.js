import { BYTE } from './mode.js';
import encodeUtf8 from 'encode-utf8';

function ByteData(data) {
	this.mode = BYTE;
	if (typeof (data) === 'string') {
		data = encodeUtf8(data);
	}
	this.data = new Uint8Array(data);
}

ByteData.getBitsLength = function getBitsLength(length) {
	return length * 8;
};

ByteData.prototype.getLength = function getLength() {
	return this.data.length;
};

ByteData.prototype.getBitsLength = function getBitsLength() {
	return ByteData.getBitsLength(this.data.length);
};

ByteData.prototype.write = function(bitBuffer) {
	for (let i = 0, l = this.data.length; i < l; i++) {
		bitBuffer.put(this.data[i], 8);
	}
};

export default ByteData;
