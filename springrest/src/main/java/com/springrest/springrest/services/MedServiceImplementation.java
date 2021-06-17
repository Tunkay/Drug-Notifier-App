package com.springrest.springrest.services;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springrest.springrest.dao.AdminDao;
import com.springrest.springrest.dao.LoginDao;
import com.springrest.springrest.dao.MedicationDao;
import com.springrest.springrest.dao.PatientDao;
import com.springrest.springrest.dao.PhysicianDao;
import com.springrest.springrest.dao.PrescriptionDao;
import com.springrest.springrest.entities.Admin;
import com.springrest.springrest.entities.Login;
import com.springrest.springrest.entities.Medication;
import com.springrest.springrest.entities.Patient;
import com.springrest.springrest.entities.Physician;
import com.springrest.springrest.entities.Prescription;
import com.springrest.springrest.exception.UserAlreadyExistsException;
/**
 * 
 * @author MK086286
 *Implementation of MedService InterFace.
 *Service Layer.
 */

@Service
public class MedServiceImplementation implements MedService {
	@Autowired
	private LoginDao logindao; // Login Repository for the CRUD operations in the database.
	@Autowired
	private PhysicianDao physiciandao; // Physician Repository for the CRUD operations in the database.
	@Autowired
	private PatientDao patientdao; // Patient Repository for the CRUD operations in the database.
	@Autowired
	private PrescriptionDao prescription; // Prescription Repository for the CRUD operations in the database.
	@Autowired
	private MedicationDao medicationdao; // Medication Repository for the CRUD operations in the database.
	// Register Function Definition
	@Autowired
	private AdminDao admindao;
	@Override
	public String Register(Login loginObj) throws UserAlreadyExistsException, SQLIntegrityConstraintViolationException {
		// Checking if user exists otherwise exception is thrown
		if (logindao.existsById(loginObj.getUsername()) == false) {
			// Saving the login object
			logindao.save(loginObj);
			return "Registered";
		} else {
			throw new UserAlreadyExistsException("The User Already Exists");
		}
	}
	// Physician Register Function
	@Override
	public Admin registerPhysician(Long adminId,Physician physician) {
		if (admindao.findById(adminId).isPresent()) {
			Admin existingAdmin = admindao.findById(adminId).get();
			physician.setAdmin(existingAdmin); // Foreign key is set for prescription repository.
			existingAdmin.getPhysicianList().add(physician);// Adding prescription to list of prescriptions.
			existingAdmin.setPhysicianList(existingAdmin.getPhysicianList());// setting the list for the prescription into the patient repository.
		Admin updatedAdmin=admindao.save(existingAdmin);
		return updatedAdmin;
		} else {
			return null;
		}
	}
	// Patient Register Function
	@Override
	public Patient registerPatient(Patient patient) {
		patientdao.save(patient);
		return patient;
	}
	// Validate Credentials Function
	@Override
	public Login getUserLogin(String userName, String password) {
		return logindao.getOne(userName);
	}
	// Getting all users from database.
	@Override
	public List<Login> findAllUserLogin() throws EntityNotFoundException {
		return logindao.findAll();
	}
	// Get Patient by id.
	public Patient getAll(Long P_id) {
		return patientdao.getOne(P_id);
	}
	// Getting Patient by attributes.
	@Override
	public Patient getPatient(String Username) {
		return patientdao.findbyattributes(Username);
	}
	// Adding Prescription to patient
	/*
	 * To add prescription in the patient: 1.Find the existing patient by id 2.Set
	 * Patient object into prescription mandatory to set foreign key 3.Save the
	 * patient and hibernate will save the the details for patient and prescription
	 */
	@Override
	public Patient addPrescription(Long p_id, Prescription prescriptions) {
		if (patientdao.findById(p_id).isPresent()) {
			Patient existingPatient = patientdao.findById(p_id).get();
			prescriptions.setPatient(existingPatient); // Foreign key is set for prescription repository.
			for (Medication med : prescriptions.getDrugs()) // Foriegn key is set for medication repository.
			{
				med.setPrescription(prescriptions);
			}
			existingPatient.getPrescriptions().add(prescriptions);// Adding prescription to list of prescriptions.
			existingPatient.setPrescriptions(existingPatient.getPrescriptions());// setting the list for the prescription into the patient repository.
			Patient updatedPatient = patientdao.save(existingPatient);
			return updatedPatient;
		} else {
			return null;
		}
	}
	// Adding Medication to Prescription
	/*
	 * To add Medication in Prescription 1.Find the existing prescription by id
	 * 2.Set medication object into prescription mandatory to set foreign key 3.Save
	 * the prescription and hibernate will save the the details for patient and
	 * prescription
	 */
	@Override
	public Prescription addDrug(Long prescription_id, Medication medicine) {
		if (prescription.findById(prescription_id).isPresent()) {
			Prescription existingPrescription = prescription.findById(prescription_id).get();
			medicine.setPrescription(existingPrescription);
			existingPrescription.getDrugs().add(medicine);
			existingPrescription.setDrugs(existingPrescription.getDrugs());
			Prescription updatedPrescription = prescription.save(existingPrescription);
			return updatedPrescription;
		} else {
			return null;
		}
	}
	// Deleting the prescription by its id.
	@Override
	public Boolean deletePrescription(Long prescription_id) {
		prescription.deleteById(prescription_id);
		if (prescription.existsById(prescription_id))
			return false;
		else
			return true;
	}

	// Modifying the Medication details.
	@Override
	public Medication modifyDrugDetails(Long drug_id, Medication medicine) {
		if (medicationdao.findById(drug_id).isPresent()) {
			Medication existingMedication = medicationdao.findById(drug_id).get();
			existingMedication.copy(medicine);// copying modified object into old medication.
			Medication updatedMed = medicationdao.save(existingMedication);
			return updatedMed;
		} else {
			return null;
		}
	}
	// Getting Physician by attributes.
	@Override
	public Physician getPhysician(String Username) {
		return physiciandao.findphysicianbyattributes(Username);
	}
	// Deleting Drugs of a prescription.
	@Override
	public Boolean deleteDrug(Long drug_id) {
		medicationdao.deleteById(drug_id);
		if (medicationdao.existsById(drug_id))
			return false;
		else
			return true;
	}
	// Getting prescription by prescription id.
	@Override
	public Prescription getPrescription(Long prescription_id) {
		return prescription.findById(prescription_id).get();
	}
	@Override
	public Patient getAll(String usrname) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Admin getAdmin(String username) {
		return admindao.findbyattributes(username);
	}
}
