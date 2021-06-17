/**
 * Patient entity contains patient information along with list of prescription.
 */
package com.springrest.springrest.entities;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name="Patient")
public class Patient {
	@Id
	@Column(name="P_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long P_id;
	@Column(name = "UsrName", unique = true, nullable = false)
	String UserName;
	public Patient(Long p_id, String userName, String name, String gender, int age, String phone, String address,
			String disease, List<Prescription> prescriptions) {
		super();
		P_id = p_id;
		UserName = userName;
		Name = name;
		Gender = gender;
		this.age = age;
		Phone = phone;
		this.address = address;
		this.disease = disease;
		this.prescriptions = prescriptions;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	@Column(name = "Name", unique = true, nullable = false)
	String Name;
	@Column(name = "Gender")
	String Gender;
	
	@Column(name = "age")
      int age;
	@Column(name = "phone")
     String Phone;
	@Column(name = "address")
     String address;
	@Column(name = "disease")
      String disease;
	//One to Many relationship with prescription and cascade is set on.
	@OneToMany(targetEntity=Prescription.class,mappedBy="patient",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	//One patient can have multiple prescription and changes in patient would be reflected on prescription and vice-versa.
	private List<Prescription> prescriptions =new ArrayList<>();
	//constructor parameterized.
	public Patient(Long p_id, String name, String gender, int age, String phone, String address, String disease,
			List<Prescription> prescriptions) {
		super();
		P_id = p_id;
		Name = name;
		Gender = gender;
		this.age = age;
		Phone = phone;
		this.address = address;
		this.disease = disease;
		this.prescriptions = prescriptions;
	}
	public List<Prescription> getPrescriptions() {
		return prescriptions;
	}
	public void setPrescriptions(List<Prescription> prescriptions) {
		this.prescriptions = prescriptions;
	}
	public Patient(Long p_id, String name, String gender, int age, String phone, String address, String disease) {
		super();
		P_id = p_id;
		Name = name;
		Gender = gender;
		this.age = age;
		Phone = phone;
		this.address = address;
		this.disease = disease;
	}
	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}
	//Getters and Setters.
	public Long getP_id() {
		return P_id;
	}
	public void setP_id(Long p_id) {
		P_id = p_id;
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
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getPhone() {
		return Phone;
	}
	public void setPhone(String phone) {
		Phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
}
	