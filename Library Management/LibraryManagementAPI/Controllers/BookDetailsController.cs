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
    public class BookDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/User
        [HttpGet]
        public IActionResult GetBook()
        {
            return Ok(_dbContext.books.ToList());
        }

        //GET: api/User/1001
        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            var book = _dbContext.books.FirstOrDefault(b => b.BookID == id);
            if(book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostBook([FromBody] BookDetails book)
        {
            _dbContext.books.Add(book);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/BookDetails/1001
        [HttpPut("{id}")]
        public IActionResult PutBook(int id, [FromBody] BookDetails book)
        {
            var bookOld = _dbContext.books.FirstOrDefault(b => b.BookID == id);
            if(bookOld == null)
            {
                return NotFound();
            }
            bookOld.BookName= book.BookName;
            bookOld.AuthorName = book.AuthorName;
            bookOld.BookCount = book.BookCount;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/BookrDetails/11
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _dbContext.books.FirstOrDefault(b => b.BookID == id);
            if(book == null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}