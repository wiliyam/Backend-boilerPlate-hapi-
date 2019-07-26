var Zendesk = require('zendesk-node-api');
const config=require('./config')
 

/**
 * create and congif zendesk
 */
var zendesk = new Zendesk({
  url: config.zd_url, // https://example.zendesk.com
  email: config.zd_email, // me@example.com
  token: config.zd_token // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
});


/**
 * create a new single ticket
 * @param {*} req 
 */
var createSingleTicket = async (req)=> {
   const result=await zendesk.tickets.create(req)
   return result
}

/**
 * update ticket
 * @param {*} req 
 */
var updateTicket = async (req)=> {
    const result=await zendesk.tickets.update(req.TICKET_ID, req)
    return result
}

/**
 * Delete ticket
 * @param {*} req 
 */
var deleteTicket = async (req) =>{
    const result=await zendesk.tickets.delete(req.TICKET_ID)
    return result 
}

/**
 * Show a single ticket 
 * @param {*} req 
 */
var showSingleTicket = async (req)=>{
    const result=await zendesk.tickets.show(req)
    return result
  
}

/**
 * show list of ticket
 * @param {*} req 
 */
var showListTicket = async (req)=> {
    const result=await zendesk.tickets.list()
    return result
  
}

/**
 * list all open ticket
 * @param {*} req 
 */
var showListAllOpenTicket = async (req)=> {
    const result=await zendesk.search.list(req)
    return result
}

module.exports = {
    createSingleTicket,
    updateTicket,
    deleteTicket,
    showSingleTicket,
    showListTicket,
    showListAllOpenTicket
}
