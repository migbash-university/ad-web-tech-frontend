import * as api from 'api.js';

export function post(req, res) {
	const user = req.body;

	api.post('register', { user }).then(response => {

		if (process.env.NODE_ENV != 'production') {
			console.log("Register /API response:" + response)
		}

		if (response.user) {
			req.session.user = response.user;
		}

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
	});
}