# Clinic-Management-System
CMS is a web-based application for managing multiple clinic’s data along with providing common access clinic’s doctors and receptionists. 
Clinic required a system to manage all the back-office team activities for their patient’s appointment & their follow-ups. 
It provides doctors with their daily schedule also allows the patient to make the payment through Cash, Credit Card. 
User can generate receipts for Insurance Company and also for the patient.

# The systems goal is to manage the following entities:
   1. ### **Doctors**
   2. ### **Patients**
   3. ### **Employees**
   4. ### **Medicines**
   5. ### **Clinic Services**
   6. ### **Appointments**
   7. ### **Prescriptions**
   8. ### **Reports**
   
# API Endpoints:
### **Doctors:**
  - /doctor
  
     - __GET__ Get all doctors
     - __POST__ Add new doctor
     - __PATCH__ Update doctor
     - __DELETE__ Delete doctor 


### **Patients:**
  - /patient
  
     - __GET__ Get all patients
     - __POST__ Add new patient
     - __PATCH__ Update patient
     - __DELETE__ Delete patient
     
### **Employees:**
  - /employee
  
     - __GET__ Get all employees
     - __POST__ Add new employee
     - __PATCH__ Update employee
     - __DELETE__ Delete employee  
     
### **Medicines:**
  - /medicine
  
     - __GET__ Get all medicines
     - __POST__ Add new medicine
     - __PATCH__ Update medicine
     - __DELETE__ Delete medicine  
     
 ### **Clinic Services:**
  - /Services
  
     - __GET__ Get all services
     - __POST__ Add new service
     - __PATCH__ Update service
     - __DELETE__ Delete service   
     
### **Appointments:**
  - /appointment
  
     - __GET__ Get all appointments
     - __POST__ Add new appointment
     - __PATCH__ Update appointment
     - __DELETE__ Delete appointment    
     
 ### **Prescriptions:**
  - /prescription
  
     - __GET__ Get all prescriptions
     - __POST__ Add new prescription
     - __PATCH__ Update prescription
     - __DELETE__ Delete prescription        
 - /prescription/:patient
 
     - __GET__ Get specific patient prescriptions
     
-  /prescription/:patient/:doctor    

      - __GET__ Get specific patient prescriptions for specific doctor
    
### **Invoices:**
  - /invoice
  
     - __GET__ Get all doctors
     - __POST__ Add new doctor
     
 - /invoice/:id     
     - __GET__ Get specific invoice by id
     - __DELETE__ Delete specific invoice by id
     
 ### **Reports:**   
   - /report/invoices 
      - __GET__ Get invoices at specific period of time
       
   - /report/invoices/:day          
      - __GET__ Get invoices at specific day
          
   - /report/appointment/:doctor/:day              
       - __GET__ Get specific docto appointments on specific day
       
   -  /report/appointment/:day           
      - __GET__ Get all appointments on specific day  
       
       
 ### **Payment:**  
  - /payment  
  
     - __POST__ Perform payment for appointment


 ### **Login:**  
  - /login 
  
    - __POST__ Login of authenticated users on our system
       
       
       
       
       
       
       
       
     
