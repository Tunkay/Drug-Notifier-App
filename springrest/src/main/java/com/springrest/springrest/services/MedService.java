//Service layer Interface helps in Loose coupling. 
package com.springrest.springrest.services;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;

import com.springrest.springrest.entities.Admin;
import com.springrest.springrest.entities.Login;
import com.springrest.springrest.entities.Medication;
import com.springrest.springrest.entities.Patient;
import com.springrest.springrest.entities.Physician;
import com.springrest.springrest.entities.Prescription;
import com.springrest.springrest.exception.UserAlreadyExistsException;
public interface MedService {
//Registeration service
public String Register(Login loginObj) throws UserAlreadyExistsException, SQLIntegrityConstraintViolationException;
//Physician Registeration service.
public Admin registerPhysician(Long adminId,Physician physician);
//Patient Registration
public Patient registerPatient(Patient patient);
//Validate Credentials
public Login getUserLogin(String userName, String password);
//Check the existence of User for the form validation
public  List<Login> findAllUserLogin () ;
//getAll Patient by username.
public Patient getAll(String userName);
//GetAll Patient using attributes.
public Patient getPatient(String userName);
//Adding prescription by patient id.
public Patient addPrescription(Long p_id, Prescription prescriptions);
//Adding Medication by Prescription id.
public Prescription addDrug(Long prescription_id, Medication medicine);
//Deleting prescription.
public Boolean deletePrescription(Long prescription_id);
//Modifying details.
public Medication modifyDrugDetails(Long prescription_id, Medication medicine);
//Getting Physician by username.
public Physician getPhysician(String userName);
//Deleting drug.
public Boolean deleteDrug(Long drugId);
//Getting Prescription.
public Prescription getPrescription(Long prescriptionId);
//Getting admin info.
public Admin getAdmin(String username);


}