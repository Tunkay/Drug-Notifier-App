package com.springrest.springrest.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springrest.springrest.entities.Medication;



public interface MedicationDao  extends JpaRepository<Medication,Long>{

}