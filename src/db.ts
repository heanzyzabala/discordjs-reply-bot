import 'reflect-metadata';
import { createConnection } from 'typeorm';

(async () => {
	try {
		await createConnection();
	} catch (err) {
		console.log(JSON.stringify(err));
	}
})();
