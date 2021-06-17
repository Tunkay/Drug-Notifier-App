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
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name="Admin")

public class Admin {
	@Id
	@Column(name="adminId")
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long adminId;
	@Column(name = "UsrName", unique = true, nullable = false)
	String UserName;
	@Column(name = "Name", unique = true, nullable = false)
	String Name;
	@Column(name = "Gender")
	String Gender;
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Column(name = "age")
      int age;
	@Column(name = "phone")
     String Phone;
	@Column(name = "Designation")
     String designation;
	//One to Many relationship with prescription and cascade is set on.
	@OneToMany(targetEntity=Physician.class,mappedBy="admin",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	//One patient can have multiple prescription and changes in patient would be reflected on prescription and vice-versa.
	private List<Physician> physicianList =new ArrayList<>();
	public Admin(Long adminId, String userName, String name, String gender, int age, String phone, String designation,
			List<Physician> physicianList) {
		super();
		this.adminId = adminId;
		UserName = userName;
		Name = name;
		Gender = gender;
		this.age = age;
		Phone = phone;
		this.designation = designation;
		this.physicianList = physicianList;
	}
	public Long getAdminId() {
		return adminId;
	}
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
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
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public List<Physician> getPhysicianList() {
		return physicianList;
	}
	public void setPhysicianList(List<Physician> physicianList) {
		this.physicianList = physicianList;
	}

}
