class Car { 
  constructor(serviceId, brand, status, step, history, details, userId) { 
  
  this.serviceId = serviceId; 
  this.brand = brand; 
  this.status = status;
  this.step = step;  
  this.history = history;
  this.details = details;
  this.userId = userId;
  } 
}

module.exports = Car