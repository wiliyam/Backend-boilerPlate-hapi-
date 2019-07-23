const http = require("http");
var FCM = require("fcm-node");
var serverKey =
  "AAAAUWBWJSw:APA91bF_ninwIP5wMhTWdL-bXRuPudGflNtfa0hVh9TQb6pIU7U6QORw82cRiDKKpOsrql5cwOxEsMceaaQv1ZvwTvFP7wdSpCjZaRl6laBUHJFzgW8voFA7SAg7ThaRuQtga4IH7CjH"; //put your server key here
var fcm = new FCM(serverKey);

const server = http.createServer((req, res) => {
  res.write("hello server is running....");
  console.log("server is running on port 3000");
  var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: "registration_token",
    collapse_key: "your_collapse_key",

    notification: {
      title: "Title of your push notification",
      body: "Body of your push notification"
    }

    // data: {
    //   //you can send only notification or only data(or include both)
    //   my_key: "my value",
    //   my_another_key: "my another value"
    // }
  };

  fcm.send(message, function(err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
  res.end();
});

server.listen(3003);
