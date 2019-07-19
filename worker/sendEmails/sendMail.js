var api_key = ""
var domain =
  ""
var mg = require("mailgun-js")({ apiKey: api_key, domain: domain });




module.exports=(sender,receiver,sub,msg)=>{
    const data = {
        from: sender,
        to: receiver,
        subject: sub,
        text: msg
      };
      
     return new Promise((res,rej)=>{
        mg.messages().send(data, (err) => {
            if(err) rej(err)
            res('mail sent successfully..')
        });
     })
}
