package com.springrest.springrest.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.springrest.springrest.entities.Physician;
@Repository
public interface PhysicianDao extends JpaRepository<Physician,Long>{
	//Firing query which would be converted into JPAQL to find Physician by attributes.
	@Query(value=" SELECT * FROM physician WHERE  usr_name=?1  ",nativeQuery=true)
    Physician findphysicianbyattributes(String Username);
}
