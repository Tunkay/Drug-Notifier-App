/*
 * Prescription entity contains list of drug/medication,prescription id.
 * Relationship is that one patient can have multiple prescriptions and each prescription have multiple drugs.
 */
package com.springrest.springrest.entities;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name="Prescription")
public class Prescription {
	@Id
	@Column(name="Prescription_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long Prescription_id;
	private Date startdate;
	private Date enddate;
	private Long drug_id;
	private Long Drug_dosage;
	private  Time drug_time;
	//One to many Relationship with medication and cascade type is set on.
	@OneToMany(targetEntity=Medication.class,mappedBy="prescription",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	//One Prescription contains multiple drugs many to one relationship.
	private List<Medication> drugs =new ArrayList<>();
	//Foreign Key set up is done many to one relationship between patient and prescription.
	@ManyToOne(targetEntity=Patient.class ,cascade= {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name="P_id",updatable = true, insertable = true)
	private Patient patient;
	//Getters and Setters.
	public Long getPrescription_id() {
		return Prescription_id;
	}
	public void setPrescription_id(Long prescription_id) {
		Prescription_id = prescription_id;
	}
	public Date getStartdate() {
		return startdate;
	}
	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}
	public Date getEnddate() {
		return enddate;
	}
	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}
	public Long getDrug_id() {
		return drug_id;
	}
	public void setDrug_id(Long drug_id) {
		this.drug_id = drug_id;
	}
	public Long getDrug_dosage() {
		return Drug_dosage;
	}
	public void setDrug_dosage(Long drug_dosage) {
		Drug_dosage = drug_dosage;
	}
	public Time getDrug_time() {
		return drug_time;
	}
	public void setDrug_time(Time drug_time) {
		this.drug_time = drug_time;
	}
	public List<Medication> getDrugs() {
		return drugs;
	}
	public void setDrugs(List<Medication> drugs) {
		this.drugs = drugs;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	//Parameterized Prescription Constructor.
	public Prescription(Long prescription_id, Date startdate, Date enddate, Long drug_id, Long drug_dosage,
			Time drug_time, List<Medication> drugs,Patient patient) {
		super();
		Prescription_id = prescription_id;
		this.startdate = startdate;
		this.enddate = enddate;
		this.drug_id = drug_id;
		Drug_dosage = drug_dosage;
		this.drug_time = drug_time;
		this.drugs = drugs;
		this.patient=patient;
	}
	public Prescription() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Prescription(long l, String string, Date date, Date date2, Time time, String string2, int i) {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
