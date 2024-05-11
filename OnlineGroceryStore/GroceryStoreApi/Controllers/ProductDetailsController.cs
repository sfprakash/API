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
    public class ProductDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public ProductDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/ProductDetails
        [HttpGet]
        public IActionResult GetProduct()
        {
            return Ok(_dbContext.products.ToList());
        }

        //GET: api/ProductDetails/1
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _dbContext.products.FirstOrDefault(p => p.ProductID == id);
            if(product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        //Adding a new product
        //POST: api/ProductDetail
        [HttpPost]
        public IActionResult PostProduct([FromBody] ProductDetails product)
        {
            _dbContext.products.Add(product);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing product
        //PUT: api/ProductDetails/1
        [HttpPut("{id}")]
        public IActionResult PutProduct(int id, [FromBody] ProductDetails product)
        {
            var productOld = _dbContext.products.FirstOrDefault(p => p.ProductID == id);
            if(productOld == null)
            {
                return NotFound();
            }
            productOld.ProductName= product.ProductName;
            productOld.ProductQuantity= product.ProductQuantity;
            productOld.ProductQuantity = product.ProductQuantity;
            productOld.UnitPrice = product.UnitPrice;
            productOld.PurchaseDate = product.PurchaseDate;
            productOld.ExpiryDate = product.ExpiryDate;
            productOld.ProductImage = product.ProductImage;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing product
        //DELETE: api/ProductDetails/1
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _dbContext.products.FirstOrDefault(p => p.ProductID == id);
            if(product == null)
            {
                return NotFound();
            }
            _dbContext.products.Remove(product);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}