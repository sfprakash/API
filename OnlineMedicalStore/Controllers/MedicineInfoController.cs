using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMedicalStore.Data;

namespace OnlineMedicalStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineInfoController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public MedicineInfoController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/User
        [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.medicineInfo.ToList());
        }

        //GET: api/User/1001
        [HttpGet("{id}")]
        public IActionResult GetMedicine(int id)
        {
            var medicine = _dbContext.medicineInfo.FirstOrDefaultAsync(m => m.MedicineID == id);
            if(medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostMedicine([FromBody] MedicineInfo medicine)
        {
            _dbContext.medicineInfo.Add(medicine);
            _dbContext.SaveChanges();
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/Medicine/1001
        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id, [FromBody] MedicineInfo medicine)
        {
            var medicineOld = _dbContext.medicineInfo.FirstOrDefault(m => m.MedicineID == id);
            if(medicineOld == null)
            {
                return NotFound();
            }
            medicineOld.MedicineName = medicine.MedicineName;
            medicineOld.MedicineCount = medicine.MedicineCount;
            medicineOld.MedicinePrice = medicine.MedicinePrice;
            medicineOld.MedicineExpiryDate = medicine.MedicineExpiryDate;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/Medicine/11
        [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(int id)
        {
            var medicine = _dbContext.medicineInfo.FirstOrDefault(m => m.MedicineID == id);
            if(medicine == null)
            {
                return NotFound();
            }
            _dbContext.medicineInfo.Remove(medicine);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}