export default {
	Query: {
		me: (parent, args, context) => {
			return { id: 1, name: "nico", lastname: "flores" };
		}
	}
};
