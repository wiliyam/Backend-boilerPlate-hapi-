const api = require("./upload");
const validate = require("../../../../middleware/validations");
const BaseJoi = require("joi");
const ImageExtension = require("joi-image-extension");
const joi = BaseJoi.extend(ImageExtension);
const entity = "user";
exports.pkg = {
  name: "uploadProfileImage"
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/uploadProfileImage`,
    handler: api.handler,
    vhost: "localhost",

    config: {
      tags: ["api", entity],
      description: "API is use for upload user profile image",
      validate: {
        headers: validate.validateJwtHeader,
        payload: {
          image: joi
            .image()
            .allowTypes(["jpg", "jpeg", "png", "bmp"])
            .meta({ swaggerType: "file" })
            .description("Profile image file")
        }
      }
    }
  });
};
