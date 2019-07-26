
const Joi=require('joi')
const i18n=require('../../../../locales/locales')



const payload=Joi.object({
    name: Joi.string().required().default('customer').description('Name'),
    email: Joi.string().trim().empty('').email().required().default('customer@test.com').description('Email'),
    deviceId: Joi.string().required().default('deviceID').description('Device id'),
    pushToken: Joi.string().required().default('pushtoken').description('Push token'),
    password: Joi.string().required().default('test123').description('Password'),
    countryCode: Joi.string().trim().empty('').default('countrycode').required().description('Country code'),
    mobile: Joi.string().trim().empty('').default('7896541235').required().description('Mobile'),
    profilePic: Joi.any().description('Profile pic'),
    loginType: Joi.number().integer().min(1).max(3).default('1').required().description('1- Normal login, 2- Fb , 3-Google'),
    dateOfBirth: Joi.string().description('Date of birth format : YYYY-MM-DD'),
    socialMediaId: Joi.any().description(' Fb id or Google id'),
    termsAndCond: Joi.number().required().integer().min(0).max(1).default('1').description('0 - false,1 - true').error(new Error('Invalid terms and conditions')),
    latitude: Joi.number().description('Latitude'),
    longitude: Joi.number().description('Longitude'),
    deviceType: Joi.number().required().integer().min(1).max(3).default('2').description('1- IOS , 2- Android 3- web'),
    appVersion: Joi.string().required().default('1.0.0').description('App version'),
    deviceOsVersion: Joi.string().description('Device Os Version'),
    deviceMake: Joi.string().required().default('sumsung').description('Device Make'),
    deviceModel: Joi.string().required().default('s6').description('Device model'),
    deviceTime: Joi.string().description('format : YYYY-MM-DD HH:MM:SS'),
    referralCode: Joi.string().description('Referral code optional').allow(""),
    currency: Joi.string().description('currency optional').allow(""),
    currencySymbol: Joi.string().description('currencySymbol optional').allow(""),
    identityCard: Joi.string().description('Identity Card'),
    mmjCard: Joi.string().description('MMJ Card'),
    cityId: Joi.string().description('cityId').allow(""),
    city: Joi.string().description('city name'),
    zoneId: Joi.string().required().default('1').description('zoneId'),
    ipAddress: Joi.string().description('Ip Address')
})

const response={
    status: {
        200: {
            message: Joi.any().default(i18n.__('genericErrMsg')['200']),
            data: Joi.any().example({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjgwMjI5OGI1YjMzOTJiZmYxZWYwNjEiLCJrZXkiOiJhY2MiLCJkZXZpY2VJZCI6IjEyMzQ1MTI0MjQyNCIsImlhdCI6MTUzNTEyNDEyMCwiZXhwIjoxNTM1NzI4OTIwLCJzdWIiOiJjdXN0b21lciJ9.xq1iKKrXLcAT7kPnoW7gq2SzomiMEc6xvSjQ1gkD2Ig",
                "sid": "5b802298b5b3392bff1ef061",
                "mobile": "9890987678",
                "countryCode": "+91",
                "email": "superadmin@gmail.com",
                "name": "Test User",
                "fcmTopic": "FCM-5b802297c53f9068a285b5ed1535124119",
                "mqttTopic": "MQTT-5b802297c53f9068a285b5ed1535124119",
                "mmjCard": {
                    "url": "",
                    "verified": false
                },
                "identityCard": {
                    "url": "",
                    "verified": false
                },
                "requester_id": ""})
        },
        412: {
            message: Joi.any().default(i18n.__('postSignUp')['412'])
        },
        413: {
            message: Joi.any().default(i18n.__('postSignUp')['413'])
        },
        500: {
            message: Joi.any().default(i18n.__('genericErrMsg')['500'])
        }
    }
}

module.exports={payload,response}