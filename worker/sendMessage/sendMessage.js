

const accountSid = 'AC04c4bdddf5c3e0a38172323e17b52ad4'; // Your Account SID from www.twilio.com/console
const authToken = 'a26ba085826ed969cdb3387fe3253676';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);



module.exports=(receiver,msg)=>{
    return new Promise((res,rej)=>{
        client.messages.create({
            body: msg,
            to: receiver,  // Text this number
            from:'+16313434022' // From a valid Twilio number
        }).then(result=>{
            res(result)
        }).catch(err=>{
            rej(err)
        })
    }) 
}

// client.messages.create({
//     body: 'sample msag',
//     to: '+919898494194',  // Text this number
//     from:'+16313434022' // From a valid Twilio number
// })

