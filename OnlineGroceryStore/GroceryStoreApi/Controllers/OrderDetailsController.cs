using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroceryStoreApi.Data;

namespace GroceryStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/OrderDetails
        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.orders.ToList());
        }

        //GET: api/OrderDetails/1
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
        //POST: api/OrderDetail
        [HttpPost]
        public IActionResult PostOrder([FromBody] OrderDetails order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing order
        //PUT: api/OrderDetails/1
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, [FromBody] OrderDetails order)
        {
            var orderOld = _dbContext.orders.FirstOrDefault(u => u.OrderID == id);
            if(orderOld == null)
            {
                return NotFound();
            }
            orderOld.UserID= order.UserID;
            orderOld.TotalPrice= order.TotalPrice;
            orderOld.OrderDate = order.OrderDate;
            orderOld.ItemID = order.ItemID;
            orderOld.ProductID = order.ProductID;
            orderOld.ItemCount = order.ItemCount;
            orderOld.ItemPrice = order.ItemPrice;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing order
        //DELETE: api/OrderDetails/1
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(o => o.OrderID == id);
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