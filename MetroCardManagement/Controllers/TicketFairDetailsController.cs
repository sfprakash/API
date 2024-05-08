using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MetroCardManagement.Data;

namespace MetroCardManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketFairDetailsController:ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        public TicketFairDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/TicketFairDetails
        [HttpGet]
        public IActionResult GetTicket()
        {
            return Ok(_dbContext.tickets.ToList());
        }

        //GET: api/TicketFairDetails/1001
        [HttpGet("{id}")]
        public IActionResult GetTicket(int id)
        {
            var ticket = _dbContext.tickets.FirstOrDefault(t => t.TicketID == id);
            if(ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostTicket([FromBody] TicketFairDetails ticket)
        {
            _dbContext.tickets.Add(ticket);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/User/1001
        [HttpPut("{id}")]
        public IActionResult PutTicket(int id, [FromBody] TicketFairDetails ticket)
        {
            var ticketOld = _dbContext.tickets.FirstOrDefault(t => t.TicketID == id);
            if(ticketOld == null)
            {
                return NotFound();
            }
            ticketOld.FromLocation= ticket.FromLocation;
            ticketOld.ToLocation= ticket.ToLocation;
            ticketOld.TicketPrice = ticket.TicketPrice;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing user
        //DELETE: api/User/1001
        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(int id)
        {
            var ticket = _dbContext.tickets.FirstOrDefault(t => t.TicketID == id);
            if(ticket == null)
            {
                return NotFound();
            }
            _dbContext.tickets.Remove(ticket);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}