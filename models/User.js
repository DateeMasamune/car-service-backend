class User { 
  constructor(email, password, firstName, lastName, role) { 
  
  this.email = email; 
  this.password = password; 
  this.firstName = firstName;
  this.lastName = lastName;  
  this.role = role
  } 
}

module.exports = User