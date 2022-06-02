import	{ createHash, createHmac } from 'crypto'
import	{ encode, decode } from 'hi-base32'
import { toDataURL } from 'qrcode'

let generateSecret = data => {
	const hash = createHash('md5').update(data).digest('hex');
	return (encode(hash).replace(/=/g, ''));
};

let dynamicTruncationFn = hmacValue => {
	const offset = hmacValue[hmacValue.length - 1] & 0xf;
	return (
		((hmacValue[offset] & 0x7f) << 24) |
		((hmacValue[offset + 1] & 0xff) << 16) |
		((hmacValue[offset + 2] & 0xff) << 8) |
		(hmacValue[offset + 3] & 0xff)
	);
};

let generateCode = (secret: string): number => {
	const decodedSecret = decode.asBytes(secret);
	const buffer = Buffer.alloc(8);
	let counter = Math.floor(Date.now() / 30000);
	for (let i = 0; i < 8; i++)
	{
		buffer[7 - i] = counter & 0xff;
		counter = counter >> 8;
	}
	const hmac = createHmac('sha1', Buffer.from(decodedSecret))
	const hmacResult = hmac.update(buffer).digest();
	return (dynamicTruncationFn(hmacResult) % 10 ** 6);
};

let validateCode = (code: number, secret: string): boolean => generateCode(secret) === code;
let generateGoogleUri = (user: string, secret: string): string => `otpauth://totp/Transcendence:${user}?secret=${secret}`;

let generateQrCode = async (user: string, secret: string) => {
	const uri = generateGoogleUri(user, secret);
	return (await toDataURL(uri)).replace("data:image/png;base64,", "");
}

export {
	generateSecret,
	generateCode,
	validateCode,
	generateGoogleUri,
	generateQrCode
};
