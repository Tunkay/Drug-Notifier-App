package com.springrest.springrest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<?> handleUserAlreadyExists(UserAlreadyExistsException exception,WebRequest request)
	{
	   ErrorDetails err=new ErrorDetails(new Date(),exception.getMessage(),request.getDescription(false));
	   return new ResponseEntity(err,HttpStatus.INTERNAL_SERVER_ERROR);
	}

	

}
