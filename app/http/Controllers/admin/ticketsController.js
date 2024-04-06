const controller = require('app/http/Controllers/Controller')
const Tickets = require('app/Models/tickets')
const User = require('app/Models/user')

class ticketController extends controller {

    async ShowTickets(req , res , next){

        let page = req.query.page || 1;
        
        let ticket = await Tickets.findOne(req.params.id)
        
        // return res.json(ticket)
        res.render('admin/Tickets-Show', {title : 'مدیریت تیکت ها' , ticket })
    }


    async ticketsManagement(req , res , next){
        try{

        }catch(err){
            next(err);
        }
    }

}



module.exports = new ticketController();