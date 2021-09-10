module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "foodie-server",
      url: "http://localhost:5001/graphql",
    },
  },
};
