export const fetchMock = (data: any, status: number = 200) => {
	return jest.fn().mockImplementation(() =>
		status === 500
			? Promise.resolve({ status: 500, ok: false, json: () => Promise.resolve({ message: 'Internal Server Error' }) })
			: status === 400
			? Promise.resolve({ status: 400, ok: false, json: () => Promise.resolve({ message: 'Bad Request' }) })
			: status === 403
			? Promise.resolve({ status: 403, ok: false, json: () => Promise.resolve({}), statusText: 'Forbidden' })
			: status === 502
			? Promise.resolve({ status: 502, ok: false, json: () => Promise.resolve({}), statusText: 'Bad Gateway' })
			: status === 204
			? Promise.resolve({
					status: 204,
					ok: true,
					text: () => Promise.resolve(null),
					json: () => null
			  })
			: Promise.resolve({
					status: status,
					ok: true,
					text: () => Promise.resolve(JSON.stringify(data)),
					json: () => data
			  })
	);
};
