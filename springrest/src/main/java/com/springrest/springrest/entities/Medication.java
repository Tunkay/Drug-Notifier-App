/**
 * Medication entity contains drug details and many to one relationship prescription entity.
 */
package com.springrest.springrest.entities;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name="Drug")
public class Medication {
	public Medication() {
		super();
	}
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long id;
	private String medName;
	private String description;
	private Date startDate;
	private Date endDate;
	private Long drugDosage;
	private Time drugTime;
	private long drugFrequency;
	//Foreign Key Set up for prescription and relationship type between medication and prescription is many to one.
	//Cascading is set on i.e.changing the values in one automatically changes occur in medication and vice-versa.
	@ManyToOne(targetEntity=Prescription.class,cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH},fetch=FetchType.LAZY)
	@JoinColumn(name="Prescription_id", referencedColumnName="Prescription_id",updatable = true, insertable = true)
	//Foreign set by prescription object
	private Prescription prescription;
	//Getters and Setters.
	public long getDrugFrequency() {
		return drugFrequency;
	}
	public void setDrugFrequency(long drugFrequency) {
		this.drugFrequency = drugFrequency;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getmedName() {
		return medName;
	}
	public Long getDrugDosage() {
		return drugDosage;
	}
	public void setDrugDosage(Long drugDosage) {
		this.drugDosage = drugDosage;
	}
	public void setmedName(String medName) {
		this.medName = medName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getstartDate() {
		return startDate;
	}
	public void setstartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getendDate() {
		return endDate;
	}
	public void setendDate(Date endDate) {
		this.endDate = endDate;
	}
	public Time getdrugTime() {
		return drugTime;
	}
	public void setdrugTime(Time drugTime) {
		this.drugTime = drugTime;
	}
	
	public void setPrescription(Prescription prescription) {
		this.prescription = prescription;
	}
	//Parameterized Medication Constructor.
	
	//For mocking.
	public Medication(long l, String string, Date date, Date date2, Time time, String string2, int i) {
		// TODO Auto-generated constructor stub
	}
	public Medication(long id, String medName, String description, Date startDate, Date endDate, Long drugDosage,
			Time drugTime, com.springrest.springrest.entities.Prescription prescription) {
		super();
		this.id = id;
		this.medName = medName;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.drugDosage = drugDosage;
		this.drugTime = drugTime;
		this.prescription = prescription;
	}
	public void copy(Medication med)
	{
		this.medName = med.medName;
		this.description = med.description;
		this.startDate = med.startDate;
		this.endDate = med.endDate;
		this.drugDosage= med.drugDosage;
		this.drugTime = med.drugTime;
		this.drugFrequency=med.drugFrequency;
	}
	public Medication(long id, String medName, String description, Date startDate, Date endDate, Long drugDosage,
			Time drugTime, long drugFrequency, Prescription prescription) {
		super();
		this.id = id;
		this.medName = medName;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.drugDosage = drugDosage;
		this.drugTime = drugTime;
		this.drugFrequency = drugFrequency;
		this.prescription = prescription;
	}
	
}
