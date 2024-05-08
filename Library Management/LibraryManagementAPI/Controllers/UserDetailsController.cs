using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryManagementAPI.Data;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/User
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users.ToList());
        }

        //GET: api/User/1001
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/Medicine/1001
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] UserDetails user)
        {
            var userOld = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if(userOld == null)
            {
                return NotFound();
            }
            userOld.UserName= user.UserName;
            userOld.Password = user.Password;
            userOld.Gender = user.Gender;
            userOld.Department = user.Department;
            userOld.MobileNumber = user.MobileNumber;
            userOld.MailID = user.MailID;
            userOld.WalletBalance = user.WalletBalance;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/UserDetails/11
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}