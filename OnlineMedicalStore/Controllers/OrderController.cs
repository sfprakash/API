using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMedicalStore.Data;

namespace OnlineMedicalStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/Order
        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.orders);
        }

        //GET: api/Order/101
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(o => o.OrderID == id);
            if(order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        //Adding a new order
        //POST: api/Order
        [HttpPost]
        public IActionResult PostOrder([FromBody] Order order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing order
        //PUT: api/Order/101
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, [FromBody] Order order)
        {
            var orderOld = _dbContext.orders.FirstOrDefault(o => o.OrderID == id);
            if(orderOld == null)
            {
                return NotFound();
            }
            orderOld.MedicineID = order.MedicineID;
            orderOld.UserID = order.UserID;
            orderOld.MedicineName = order.MedicineName;
            orderOld.MedicineCount = order.MedicineCount;
            orderOld.TotalPrice = order.TotalPrice;
            orderOld.OrderStatus = order.OrderStatus;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing order
        //DELETE: api/Order/101
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(o => o.UserID == id);
            if(order == null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }

    }
}