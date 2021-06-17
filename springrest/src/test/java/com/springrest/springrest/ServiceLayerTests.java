package com.springrest.springrest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;   // ...or...
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.*;
import java.sql.Date;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.springrest.springrest.dao.AdminDao;
import com.springrest.springrest.dao.LoginDao;
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
import com.springrest.springrest.services.MedService;
@SpringBootTest
@AutoConfigureMockMvc
class ServiceLayerTests {
	//Autowiring the service class in the test class
	@Autowired
	private MedService meds;
	//Mocking the Table Repository Login
	@MockBean
	private LoginDao login;
	//Mocking the Table Repository Patient
	@MockBean
	private PatientDao  patient;
	//Mocking the Table Repository Physician
	@MockBean
	private PhysicianDao physician;
	@MockBean
	private AdminDao admin;
	@Autowired
	private PrescriptionDao prescription;
	@Autowired
	private MockMvc mockMvc;

//Test the get function from the database Login  using mockito.
	@Test
	public void getfromDatabseTest() {
		String username = "Danile";
		String password="USA";
		Login log=new Login("Danile","USA");
		when(login.getOne(username))
				.thenReturn(log);
		assertEquals(log, meds.getUserLogin(username,password));
	}
//Testing the insert operation into database Register using mockito.
	@Test
	public void InsertintoLoginTableTest() throws UserAlreadyExistsException, SQLIntegrityConstraintViolationException {
		Login user = new Login("jk","12345");
		when(login.save(user)).thenReturn(user);
		assertEquals("Registered", meds.Register(user));
	}
//Testing the insert operation into database Patient using mockito.
	@Test
	public void InsertintoPatientTableTest() {
		Patient patientData = new Patient((long) 100, "Mayank","Male",23,"9470289876", "Krishna Apartment,Lokhandwala,Mumbai", "ADHD");
		when(patient.save(patientData)).thenReturn(patientData);
		assertEquals(patientData, meds.registerPatient(patientData));
	}
//Testing the insert operation into database Physician using mockito.
	@Test
	public void InsertintoPhysicianTableTest() {
		Physician physicianData = new Physician((long) 1509, "Dr.Karen Jung", "Male", 23, "9470289876",
				"MD in child anatomy", "Child Medical Specialist", "Karen898");
		List<Physician> physicianList = new ArrayList<Physician>();
		physicianList.add(physicianData);
		Admin adminData = ((new Admin((long) 86286,"admin","Mayank","Male",23,"9470289876","System Engineer",physicianList)));
		when(admin.findById((long) 86286)).thenReturn(Optional.of(adminData));
		when(admin.save(adminData)).thenReturn(adminData);
		assertEquals(adminData, meds.registerPhysician((long)86286,physicianData));
	}
	/*@Test
	public void addDrugTest() {
		Medication medication = new Medication();
		long now = System.currentTimeMillis();
		Prescription prescriptionData = new Prescription((long)100, "crocin", new Date(2021, 11, 29), new Date(2021, 11, 31), new Time(now), "For headache", 43);
		when(prescription.findById((long)100)).thenReturn(Optional.of(prescriptionData));
		when(prescription.save(prescriptionData)).thenReturn(prescriptionData);
		assertEquals(prescriptionData, meds.addDrug((long)100,medication));
	}*/
}
