package com.springrest.springrest.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.springrest.springrest.entities.Admin;
@Repository
public interface AdminDao extends JpaRepository<Admin,Long>{ 
	@Query(value=" SELECT * FROM admin WHERE  usr_name=?1  ",nativeQuery=true)
    Admin findbyattributes(String Username);

}
