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
    public class TravelDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public TravelDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/TravelDetails
        [HttpGet]
        public IActionResult GetTravel()
        {
            return Ok(_dbContext.travels.ToList());
        }

        //GET: api/User/1001
        [HttpGet("{id}")]
        public IActionResult GetTravel(int id)
        {
            var travel = _dbContext.travels.FirstOrDefault(u => u.TravelID == id);
            if(travel == null)
            {
                return NotFound();
            }
            return Ok(travel);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostTravel([FromBody] TravelDetails travel)
        {
            _dbContext.travels.Add(travel);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/User/1001
        [HttpPut("{id}")]
        public IActionResult PutTravel(int id, [FromBody] TravelDetails travel)
        {
            var travelOld = _dbContext.travels.FirstOrDefault(u => u.TravelID == id);
            if(travelOld == null)
            {
                return NotFound();
            }
            travelOld.CardNumber= travel.CardNumber;
            travelOld.FromLocation= travel.FromLocation;
            travelOld.ToLocation = travel.ToLocation;
            travelOld.TravelCost = travel.TravelCost;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing user
        //DELETE: api/TravelDetails/1001
        [HttpDelete("{id}")]
        public IActionResult DeleteTravel(int id)
        {
            var travel = _dbContext.travels.FirstOrDefault(u => u.TravelID == id);
            if(travel == null)
            {
                return NotFound();
            }
            _dbContext.travels.Remove(travel);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}