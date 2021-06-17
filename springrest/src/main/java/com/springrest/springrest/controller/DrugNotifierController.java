//Controller Layer.
package com.springrest.springrest.controller;
import org.springframework.web.bind.annotation.RestController;

import com.springrest.springrest.entities.Admin;
import com.springrest.springrest.entities.Login;
import com.springrest.springrest.entities.Medication;
import com.springrest.springrest.entities.Patient;
import com.springrest.springrest.entities.Physician;
import com.springrest.springrest.entities.Prescription;
import com.springrest.springrest.exception.UserAlreadyExistsException;
import com.springrest.springrest.services.MedService;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class DrugNotifierController {
	@Autowired
	private MedService meds; // Object of Service class which is autowired to the controller.
	// Login Validation Function with getMapping Two attributes.

	@GetMapping("/home/{userName}/{password}")
	public ResponseEntity<String> validationCredentials(@PathVariable String userName, @PathVariable String password) {
		Login loginObj = this.meds.getUserLogin(userName, password);
		if (loginObj.getPassword().equals(password))
			return new ResponseEntity<>("Successful", HttpStatus.OK);
		else
			return new ResponseEntity<>("Username or password wrong", HttpStatus.BAD_REQUEST);
	}
	// Function to get all username List from registration.
	@GetMapping("/GetAllUsers")
	public ResponseEntity<List> checkExistence() {
		List<Login> userList = this.meds.findAllUserLogin();
		List<String> usrnameList = new ArrayList<String>();
		if (!userList.isEmpty()) {
			for (int index = 0; index < userList.size(); index++) {
				usrnameList.add(userList.get(index).getUsername());
			}
			return new ResponseEntity<>(usrnameList, HttpStatus.OK);
		} else
			return new ResponseEntity<>(usrnameList, HttpStatus.BAD_REQUEST);
	}
	// Get Patient by username,phone,mrn id
	@GetMapping("/GetPatient/{userName}")
	public ResponseEntity<Patient> getPatient(@PathVariable String userName) {
		Patient patient = this.meds.getPatient(userName);
		if (patient == null)
			return new ResponseEntity<>(patient, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(patient, HttpStatus.OK);
	}
	// Get Patient by username,phone,mrn id
	@GetMapping("/GetPhysician/{userName}")
	public Physician getPhysician(@PathVariable String userName) {
		return this.meds.getPhysician(userName);
	}
	@GetMapping("/GetAdmin/{userName}")
	public Admin getAdmin(@PathVariable String userName) {
		return this.meds.getAdmin(userName);
	}
	// Registration of the user and also throws error
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Login loginObj)
			throws UserAlreadyExistsException, SQLIntegrityConstraintViolationException {
		try {
			return new ResponseEntity<>(this.meds.Register(loginObj), HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<>("Duplicate", HttpStatus.BAD_REQUEST);
		}
	}
	// Registration of the Physician.
	@PostMapping(value = "/RegisterPhysician/{Id}")
	public ResponseEntity<Admin> registerPhysician(@PathVariable String Id,@RequestBody Physician physician) {
		Long adminId = Long.parseLong(Id);
		return new ResponseEntity<>(this.meds.registerPhysician(adminId,physician), HttpStatus.CREATED);
	}
	// Registration of patient
	@PostMapping(value = "/RegisterPatient")
	public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
		return new ResponseEntity<>(this.meds.registerPatient(patient), HttpStatus.CREATED);
	}
	
	/**
	 * 
	 * @param pid
	 * @param prescriptions
	 * @return
	 */
	// Inserting the prescription Detail
	@PostMapping(value = "/AddPrescription/{pid}")
	public ResponseEntity<Patient> insertPrescription(@PathVariable String pid,
			@RequestBody Prescription prescriptions) {
		Long p_id = Long.parseLong(pid);
		return new ResponseEntity<>(this.meds.addPrescription(p_id, prescriptions), HttpStatus.CREATED);
	}
	//Adding Drugs
	@PostMapping(value = "/AddDrug/{prescriptionId}")
	public ResponseEntity<Prescription> insertDrug(@PathVariable String prescriptionId,
			@RequestBody Medication medicine) {
		Long prescription_id = Long.parseLong(prescriptionId);
		return new ResponseEntity<>(this.meds.addDrug(prescription_id, medicine), HttpStatus.CREATED);
	}
	// Modifying existing Drug
	@PutMapping(value = "/ModifyDrug/{prescriptionId}")
	public ResponseEntity<Medication> modifyDrug(@PathVariable String prescriptionId,
			@RequestBody Medication medicine) {
		Long p_id = Long.parseLong(prescriptionId);
		return new ResponseEntity<>(this.meds.modifyDrugDetails(p_id, medicine), HttpStatus.CREATED);
	}
	// Checking Existence of Patient
	@PostMapping(value = "/CheckPatient/{userName}")
	public String checkPatient(@PathVariable String userName) {
		Patient Patient = this.meds.getPatient(userName);
		Physician physician = this.meds.getPhysician(userName);
		if (Patient != null)
			return "patient";
		else
			if(physician!=null)
				return "physician";
			else
			return "admin";
	}
	// Getting Prescription by attributes
	@GetMapping(value = "/GetPrescription/{userName}")
	public List<Prescription> getAll(@PathVariable String userName) {
		Patient patient = this.meds.getPatient(userName);
		if (patient != null)
			return patient.getPrescriptions();
		else
			return null;
	}
	// Getting Drug by prescription id.
	@GetMapping(value = "/GetDrug/{prescriptionId}")
	public Prescription getAllDrugs(@PathVariable String prescriptionId) {
		Long prescription_id = Long.parseLong(prescriptionId);
		Prescription prescription = this.meds.getPrescription(prescription_id);
		return prescription;
	}
	// Deleting the prescription
	@GetMapping(value = "/DeletePrescription/{prescriptionId}")
	public Boolean deletePrescription(@PathVariable String prescriptionId) {
		Long prescription_id = Long.parseLong(prescriptionId);
		return this.meds.deletePrescription(prescription_id);
	}
	// Deleting Drugs
	@GetMapping(value = "/Deletedrug/{drugId}")
	public Boolean deleteDrug(@PathVariable String drugId) {
		Long drug_id = Long.parseLong(drugId);
		return this.meds.deleteDrug(drug_id);
	}
}
