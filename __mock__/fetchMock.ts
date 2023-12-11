export const fetchMock = (data: any) => {
	return jest.fn().mockImplementation(() =>
		Promise.resolve({
			ok: true,
			text: () => Promise.resolve(JSON.stringify(data)),
			json: () => data
		})
	);
};
