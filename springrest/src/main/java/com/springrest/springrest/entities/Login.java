/**
 * Login Entity with all the user credentials.*/
package com.springrest.springrest.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
//Registration Record of the users.
@Entity
@Table(name = "Registration_Record")
public class Login {
	@Id
	@Column(name = "id", unique = true, nullable = false)
	String username;
	@Column(name = "Password")
	String Password;
	// Constructor Parameterized.
	public Login(String username, String password) {
		super();
		this.username = username;
		Password = password;
	}
	// Constructor no parameters
	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}
//Getters and Setters.
	@Override
	public String toString() {
		return "Login [username=" + username + ", Password=" + Password + "]";
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
}
