//const config = require("config");
const http = require("http");
var amqp = require("amqplib");
const sendMail=require('./sendMail')
const CONN_URL =
  "amqp://uzslbmyf:EP0Ma0b5t_ljrQqBZGAnF4pLYlk2h0wA@buck.rmq.cloudamqp.com/uzslbmyf";

let ch = null;

process.on("exit", code => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});

const server = http.createServer(async (req, res) => {
  res.write("server for sending email from rabbit mq...");

  
  try {
   
    const conn = await amqp.connect(CONN_URL);
    ch = await conn.createChannel();
  
    ch.consume(
      "user-email",
      async msg => {
        mailid= JSON.parse(msg.content.toString());
        console.log(mailid);
        await sendMail('vivekpatel169@gmail.com','vivekpatel169@gmail.com','test mail','hello from server')
        
        ch.ack(msg); //send ack when data is read
      },
      { noAck: false } //when true no need to send ack
    );
  } catch (error) {
    console.log(error)
  }

  res.write("done");
  res.end();
});

server.listen(3000);
