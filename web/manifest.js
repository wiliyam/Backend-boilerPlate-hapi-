const inert = require("@hapi/inert");
const vision = require("@hapi/vision");
const router = require("./router");
const middleware = require("./middleware");

const config = require("config");

//define all plugin here

module.exports = {
  server: {
    port: config.get("port")
  },
  register: {
    plugins: [
      middleware.good,
      inert,
      vision,
      middleware.swagger,
      middleware.auth,
      router.user.signUp,
      router.user.signIn,
      router.user.profile.getDetails,
      router.user.profile.updateUser,
      router.user.profile.deleteUser,
      router.user.profile.uploadImage,
      router.user.utility.genAccessToken,
      router.user.signOut
    ]
  }
};
