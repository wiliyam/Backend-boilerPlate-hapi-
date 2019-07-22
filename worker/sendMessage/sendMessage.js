

const accountSid = 'AC04c4bdddf5c3e0a38172323e17b52ad4'; // Your Account SID from www.twilio.com/console
const authToken = 'a26ba085826ed969cdb3387fe3253676';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);




const sendMessage=(receiver,msg)=>{

    console.log('receiverType',typeof(receiver))
    console.log('receiver',receiver);
    return  client.messages.create({
        body: msg,
        to:'+919898494194',  // Text this number
        from:'+16313434022' // From a valid Twilio number
    })
}

module.exports=sendMessage


// const run=async()=>{
//     sid=await sendMessage('+919898494194','hello ....')
//     console.log(sid)
// }

// run()

// client.messages.create({
//     body: 'sample massage',
//     to: '+919898494194',  // Text this number
//     from:'+16313434022' // From a valid Twilio number
// }).then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.error(err)
// })


