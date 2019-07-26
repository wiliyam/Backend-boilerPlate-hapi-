const validator = require("./validators");
const handler = require("./post");

exports.pkg = {
  name: `guestLogin`
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: "/guest/signIn",
    config: {
      tags: ["api", "guest"],
      description: "Api for guest users.",
      notes:
        "This will enable the customer to get a feel of the application.Please note in order for the customer to process a booking , login/sign up is mandatory.",
      auth: false,
      validate: { payload: validator.payload },
      response: validator.response
    },
    /** @memberof guest */
    handler: handler
  });
};
