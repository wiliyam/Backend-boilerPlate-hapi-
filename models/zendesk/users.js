
var zendesk = require('node-zendesk');
var request = require('request-promise');;
var config = require('./config')

var headerOption = {
    "url": config.zd_url + "/auth/",
    "headers": {
        "Authorization": "Basic " + Buffer.from(config.zd_email + ':' + config.zd_pass).toString("base64")
    }
};


/**
 * Create new user at zendesk
 * @param {*} data 
 * @param {*} url 
 */
var postUser = async (data, url) =>{
    var options = {
        method: 'POST',
        url: url,
        headers:
        {
            authorization: headerOption.headers.Authorization,
            'content-type': 'application/json'
        },
        body: data,
        json: true
    };
    const result=await request(options)
    return result
}

/**
 * Get all user from zendesk
 * @param {*} url 
 */
var getUser = async (url) =>{
    var options = {
        method: 'GET',
        url: url,
        headers:
        {
            authorization: headerOption.headers.Authorization,
            'content-type': 'application/json'
        },
        json: true
    };
    const result=await request(options)
    return result
}

/**
 * Update user at zendesk
 * @param {*} data 
 * @param {*} url 
 */
var putUser = async (data, url)=> {
    var options = {
        method: 'PUT',
        url: url,
        headers:
        {
            authorization: headerOption.headers.Authorization,
            'content-type': 'application/json'
        },
        body: data,
        json: true
    };
    const result=await request(options)
    return result
}

/**
 * delete user from zendesk
 * @param {*} url 
 */
var deleteUser = async (url)=> {
    var options = {
        method: 'DELETE',
        url: url,
        headers:
        {
            authorization: headerOption.headers.Authorization,
            'content-type': 'application/json'
        },
        json: true
    };
    const result=await request(options)
    return result
}
module.exports={getUser,postUser,putUser,deleteUser}