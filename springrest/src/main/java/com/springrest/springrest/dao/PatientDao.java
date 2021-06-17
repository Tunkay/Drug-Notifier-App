package com.springrest.springrest.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springrest.springrest.entities.Patient;
@Repository
public interface PatientDao extends JpaRepository<Patient,Long>{
	
	@Query(value=" SELECT * FROM patient WHERE p_id=?1 or usr_name=?1 or phone=?1 ",nativeQuery=true)
      Patient findbyattributes(String Username);
}
