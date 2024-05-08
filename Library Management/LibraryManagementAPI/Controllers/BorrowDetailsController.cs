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
    public class BorrowDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/User
        [HttpGet]
        public IActionResult GetBorrow()
        {
            return Ok(_dbContext.borrows.ToList());
        }

        //GET: api/User/1001
        [HttpGet("{id}")]
        public IActionResult GetBorrow(int id)
        {
            var borrow = _dbContext.borrows.FirstOrDefault(b => b.BorrowID == id);
            if(borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostBorrow([FromBody] BorrowDetails borrow)
        {
            _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/BorrowDetails/1001
        [HttpPut("{id}")]
        public IActionResult PutBorrow(int id, [FromBody] BorrowDetails borrow)
        {
            var borrowOld = _dbContext.borrows.FirstOrDefault(b => b.BorrowID == id);
            if(borrowOld == null)
            {
                return NotFound();
            }
            borrowOld.BookID= borrow.BookID;
            borrowOld.UserID = borrow.UserID;
            borrowOld.BorrowedDate = borrow.BorrowedDate;
            borrowOld.BorrowCount = borrow.BorrowCount;
            borrowOld.BorrowStatus = borrow.BorrowStatus;
            borrowOld.PaidFineAmount = borrow.PaidFineAmount;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/BookDetails/11
        [HttpDelete("{id}")]
        public IActionResult DeleteBorrow(int id)
        {
            var borrow = _dbContext.borrows.FirstOrDefault(b => b.BorrowID == id);
            if(borrow == null)
            {
                return NotFound();
            }
            _dbContext.borrows.Remove(borrow);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}