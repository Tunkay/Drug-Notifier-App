/**
 * Physician entity contains physician information.
 */
package com.springrest.springrest.entities;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Physician")
public class Physician {
	@Id
	@Column(name = "U_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long U_id;
	@Column(name = "Name", nullable = false)
	String Name;
	@Column(name = "Gender")
	String Gender;
	@Column(name = "Physician_Age")
	int Physician_Age;
	@Column(name = "Physician_Phone")
	String Physician_Phone;
	@Column(name = "Physician_Qualifiacation")
	String Physician_Qualifiacation;
	@Column(name = "Physician_Specilization")
	String Physician_Specilization;
	@Column(name = "UsrName", unique = true, nullable = false)
	String UserName;
	@ManyToOne(targetEntity=Admin.class ,cascade= {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name="adminId",updatable = true, insertable = true)
	private Admin admin;

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	public Physician(Long u_id, String name, String gender, int physician_Age, String physician_Phone,
			String physician_Qualifiacation, String physician_Specilization, String userName, Admin admin) {
		super();
		U_id = u_id;
		Name = name;
		Gender = gender;
		Physician_Age = physician_Age;
		Physician_Phone = physician_Phone;
		Physician_Qualifiacation = physician_Qualifiacation;
		Physician_Specilization = physician_Specilization;
		UserName = userName;
		this.admin = admin;
	}
	// Getters And Setters
	public Physician(Long u_id, String name, String gender, int physician_Age, String physician_Phone,
			String physician_Qualifiacation, String physician_Specilization, String userName) {
		super();
		U_id = u_id;
		Name = name;
		Gender = gender;
		Physician_Age = physician_Age;
		Physician_Phone = physician_Phone;
		Physician_Qualifiacation = physician_Qualifiacation;
		Physician_Specilization = physician_Specilization;
		UserName = userName;
	}
	public Long getU_id() {
		return U_id;
	}
	public void setU_id(Long u_id) {
		U_id = u_id;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public Physician() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getGender() {
		return Gender;
	}
	public void setGender(String gender) {
		Gender = gender;
	}
	public int getPhysician_Age() {
		return Physician_Age;
	}
	public void setPhysician_Age(int physician_Age) {
		Physician_Age = physician_Age;
	}
	public String getPhysician_Phone() {
		return Physician_Phone;
	}
	public void setPhysician_Phone(String physician_Phone) {
		Physician_Phone = physician_Phone;
	}
	public String getPhysician_Qualifiacation() {
		return Physician_Qualifiacation;
	}
	public void setPhysician_Qualifiacation(String physician_Qualifiacation) {
		Physician_Qualifiacation = physician_Qualifiacation;
	}
	public String getPhysician_Specilization() {
		return Physician_Specilization;
	}
	public void setPhysician_Specilization(String physician_Specilization) {
		Physician_Specilization = physician_Specilization;
	}
}
