var api_key = "9d5b89a12ff8ce00de48b43b2698b993-fd0269a6-6162d2ee";
var domain =
  "sandbox1102e655ecf44c6eaa90dd8880bf1c59.mailgun.org";
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
