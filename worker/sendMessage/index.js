//const config = require("config");
const http = require("http");
var amqp = require("amqplib");
const sendMessage=require('./sendMessage')

const CONN_URL =
  "amqp://uzslbmyf:EP0Ma0b5t_ljrQqBZGAnF4pLYlk2h0wA@buck.rmq.cloudamqp.com/uzslbmyf";

let ch = null;

process.on("exit", code => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});

const server = http.createServer(async (req, res) => {
  res.write("server for sending message from rabbit mq...");

  
  try {

    const conn = await amqp.connect(CONN_URL);
    ch = await conn.createChannel();
    ch.prefetch(1)
    ch.consume(
      "user-message",
      async msg => {
        phoneNum = msg.content.toString();
        console.log("phoneNum",phoneNum );
        const sid=await sendMessage(phoneNum,'You just won 500000$ send your email to claim it')
        console.log(sid)

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
