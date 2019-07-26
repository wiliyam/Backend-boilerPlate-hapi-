const cities = require("./models/cities");
const db = require("./library/mongodb");

const run = async () => {
  await db.connectToServer(err => {
    if (err) return console.log(err);
    console.log("SuccessFully connected to database....");
  });
  const zone = await cities.inZone({
    lat: 77.55523681640625,
    long: 12.994522024329195
  });
  console.log("zone", zone);
  console.log("city", zone.cityName);
  console.log("cityId", zone.cityId);
};

run();
