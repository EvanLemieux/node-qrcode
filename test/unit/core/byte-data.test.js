const test = require('tap').test;
const BitBuffer = require('core/bit-buffer');
const ByteData = require('core/byte-data');
const Mode = require('core/mode');

test('Byte Data: String Input', (t) => {
	const text = '1234';
	const textBitLength = 32;
	const textByte = [49, 50, 51, 52]; // 1, 2, 3, 4
	const utf8Text = '\u00bd + \u00bc = \u00be'; // 9 char, 12 byte

	const byteData = new ByteData(text);

	t.equal(byteData.mode, Mode.BYTE, 'Mode should be BYTE');
	t.equal(byteData.getLength(), text.length, 'Should return correct length');
	t.equal(byteData.getBitsLength(), textBitLength, 'Should return correct bit length');

	const bitBuffer = new BitBuffer();
	byteData.write(bitBuffer);
	t.deepEqual(bitBuffer.buffer, textByte, 'Should write correct data to buffer');

	const byteDataUtf8 = new ByteData(utf8Text);
	t.equal(byteDataUtf8.getLength(), 12, 'Should return correct length for utf8 chars');

	t.end();
});

test('Byte Data: Byte Input', (t) => {
	const bytes = new Uint8ClampedArray([1, 231, 32, 22]);

	const byteData = new ByteData(bytes);
	t.equal(byteData.getLength(), bytes.length, 'Should return correct length');
	t.equal(byteData.getBitsLength(), bytes.length * 8, 'Should return correct bit length');

	const bitBuffer = new BitBuffer();
	byteData.write(bitBuffer);
	t.deepEqual(bitBuffer.buffer, bytes, 'Should write correct data to buffer');

	t.end();
});
