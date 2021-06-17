package com.springrest.springrest;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springrest.springrest.controller.DrugNotifierController;
import com.springrest.springrest.dao.LoginDao;
import com.springrest.springrest.dao.PatientDao;
import com.springrest.springrest.dao.PhysicianDao;
import com.springrest.springrest.entities.Admin;
import com.springrest.springrest.entities.Login;
import com.springrest.springrest.entities.Medication;
import com.springrest.springrest.entities.Patient;
import com.springrest.springrest.entities.Physician;
import com.springrest.springrest.entities.Prescription;
import com.springrest.springrest.exception.UserAlreadyExistsException;
import com.springrest.springrest.services.MedService;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DrugNotifierController.class)
public class ControllerTests {
	// Autowiring the service class in the test class
	// Mocking the Table Repository Login
	@MockBean
	private MedService meds;
	@MockBean
	private LoginDao login;
	@Autowired
	private MockMvc mockMvc;

	@Test
	public void getPatientSuccess() throws Exception {
		Patient patientData = new Patient((long) 100, "Mayank", "Male", 23, "9470289876",
				"Krishna Apartment,Lokhandwala,Mumbai", "ADHD");
		when(meds.getPatient("Mayank")).thenReturn(patientData);
		this.mockMvc.perform(get("/GetPatient/{Username}", "Mayank")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(jsonPath("$.p_id").value(100));
	}
	@Test
	public void getPatientFailure() throws Exception {
		this.mockMvc.perform(get("/GetPatient/{Username}", "Shenoyji")).andExpect(status().isBadRequest());
	}
	@Test
	public void ValidationCredentialsTest() throws Exception {
		Login mockLogin = new Login("Mayank", "12345");
		when(meds.getUserLogin("Mayank", "12345")).thenReturn(mockLogin);
		this.mockMvc.perform(get("/home/{Username}/{Password}", "Mayank", "12345")).andExpect(status().isOk())
				.andExpect(content().string("Successful"));
	}
	@Test
	public void ValidationCredentialsFailureTest() throws Exception {
		Login mockLogin = new Login("Mayank", "12345");
		when(meds.getUserLogin("Mayank", "12")).thenReturn(mockLogin);
		this.mockMvc.perform(get("/home/{Username}/{Password}", "Mayank", "12")).andExpect(status().isBadRequest())
				.andExpect(content().string("Username or password wrong"));
	}
	@Test
	public void CheckPatientSuccessTest() throws Exception {
		Login mockLoginobject1 = new Login("Mayank", "12345");
		Login mockLoginobject2 = new Login("Shanu", "123456");
		List<String> usernamelist = new ArrayList<String>();
		usernamelist.add("Mayank");
		usernamelist.add("Shanu");
		List<Login> registered_users = new ArrayList<Login>();
		registered_users.add(mockLoginobject1);
		registered_users.add(mockLoginobject2);
		when(meds.findAllUserLogin()).thenReturn(registered_users);
		this.mockMvc.perform(get("/GetAllUsers")).andExpect(status().isOk())
				.andExpect(jsonPath("$").value(usernamelist));
	}
	@Test
	public void getPatientSuccessTest() throws Exception {
		Patient patientData = new Patient((long) 100, "Mayank", "Male", 23, "9470289876",
				"Krishna Apartment,Lokhandwala,Mumbai", "ADHD");
		when(meds.getPatient("Mayank")).thenReturn(patientData);
		this.mockMvc.perform(get("/GetPatient/{Username}", "Mayank")).andExpect(status().isOk())
				.andExpect(jsonPath("$.p_id").value(100));
	}
	@Test
	public void getPatientFailureTest() throws Exception {
		when(meds.getPatient("Shanu")).thenReturn(null);
		this.mockMvc.perform(get("/GetPatient/{Username}", "Shanu")).andExpect(status().isBadRequest());
	}
	@Test
	public void getPhysicianSuccessTest() throws Exception {
		Physician physicianData = new Physician((long) 1509, "Dr.Karen Jung", "Male", 23, "9470289876",
				"MD in child anatomy", "Child Medical Specialist", "Karen898");
		when(meds.getPhysician("Karen898")).thenReturn(physicianData);
		this.mockMvc.perform(get("/GetPhysician/{Username}", "Karen898")).andExpect(status().isOk())
				.andExpect(jsonPath("$.u_id").value(1509));
	}
	@Test
	public void RegisterSuccessTest() throws Exception {
		Login mockLoginobject1 = new Login("Mayank", "12345");
		when(meds.Register(mockLoginobject1)).thenReturn("Registered");
		this.mockMvc
				.perform((post("/register").contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(mockLoginobject1))).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	@Test
	public void RegisterPhysicianSuccessTest() throws Exception {
		Physician physicianData = new Physician((long) 1509, "Dr.Karen Jung", "Male", 23, "9470289876",
				"MD in child anatomy", "Child Medical Specialist", "Karen898");
		List<Physician> physicianList = new ArrayList<Physician>();
		physicianList.add(physicianData);
		Admin adminData = new Admin((long) 86286,"admin","Mayank","Male",23,"9470289876","System Engineer",physicianList);
		
		when(meds.registerPhysician((long)86286,physicianData)).thenReturn(adminData);
		this.mockMvc
				.perform((post("/RegisterPhysician/{Id}",(long)86286).contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(physicianData))).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	@Test
	public void RegisterPatientSuccessTest() throws Exception {
		Patient patientData = new Patient((long) 100, "Mayank", "Male", 23, "9470289876",
				"Krishna Apartment,Lokhandwala,Mumbai", "ADHD");
		when(meds.registerPatient(patientData)).thenReturn(patientData);
		this.mockMvc
				.perform((post("/RegisterPatient").contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(patientData))).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	@Test
	public void AddPrescriptionSuccessTest() throws Exception {
		Patient patientData = new Patient((long) 100, "Mayank", "Male", 23, "9470289876",
				"Krishna Apartment,Lokhandwala,Mumbai", "ADHD");
		Prescription prescription = new Prescription();
		List<Prescription> modifiedPatient = new ArrayList<Prescription>();
		modifiedPatient.add(prescription);
		patientData.setPrescriptions(modifiedPatient);
		when(meds.addPrescription(patientData.getP_id(), prescription)).thenReturn(patientData);
		this.mockMvc
				.perform((post("/AddPrescription/{pid}", patientData.getP_id()).contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(prescription))).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	@Test
	public void AddDrugSuccessTest() throws Exception {
		Prescription prescription = new Prescription((long) 123, "for diziness", new Date(0), new Date(0), new Time(0),
				"Acetophensamine", 12);
		Medication medication = new Medication();
		List<Medication> modifiedprescription = new ArrayList<Medication>();
		modifiedprescription.add(medication);
		prescription.setDrugs(modifiedprescription);
		when(meds.addDrug(prescription.getPrescription_id(), medication)).thenReturn(prescription);
		this.mockMvc
				.perform((post("/AddDrug/{pid}", "123").contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(medication))).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	@Test
	public void ModifyDrugSuccessTest() throws Exception {
		Medication newmedication = new Medication();
		Medication modifiedMedication = new Medication();
		modifiedMedication.copy(newmedication);
		when(meds.modifyDrugDetails((long) 123, newmedication)).thenReturn(modifiedMedication);
		this.mockMvc
				.perform((put("/ModifyDrug/{pid}", "123").contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(newmedication))).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	@Test
	public void getPrescriptionSuccessTest() throws Exception {
		Patient patientData = new Patient((long) 100, "Mayank", "Male", 23, "9470289876",
				"Krishna Apartment,Lokhandwala,Mumbai", "ADHD");
		Prescription prescription = new Prescription((long) 123, "for diziness", new Date(0), new Date(0), new Time(0),
				"Acetophensamine", 12);
		List<Prescription> list_of_prescription = new ArrayList<Prescription>();
		list_of_prescription.add(prescription);
		patientData.setPrescriptions(list_of_prescription);
		when(meds.getPatient("Mayank")).thenReturn(patientData);
		this.mockMvc.perform(get("/GetPrescription/{usrname}", "Mayank")).andExpect(status().isOk());
	}
	@Test
	public void getDrugSuccessTest() throws Exception {
		Prescription prescription = new Prescription((long) 123, "for diziness", new Date(0), new Date(0), new Time(0),
				"Acetophensamine", 12);
		when(meds.getPrescription((long) 123)).thenReturn(prescription);
		this.mockMvc.perform(get("/GetDrug/{pid}", "123")).andExpect(status().isOk());
	}
	@Test
	public void DeletePrescriptionTest() throws Exception {
		when(meds.deletePrescription((long) 123)).thenReturn(true);
		this.mockMvc.perform(get("/DeletePrescription/{pid}", "123")).andExpect(status().isOk());
	}
	@Test
	public void DeleteDrugTest() throws Exception {
		when(meds.deletePrescription((long) 123)).thenReturn(true);
		this.mockMvc.perform(get("/Deletedrug/{pid}", "123")).andExpect(status().isOk());
	}
	public static String asJsonString(final Object obj) {
		try {
			final ObjectMapper mapper = new ObjectMapper();
			final String jsonContent = mapper.writeValueAsString(obj);
			return jsonContent;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
