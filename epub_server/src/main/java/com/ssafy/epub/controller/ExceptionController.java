package com.ssafy.epub.controller;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.epub.exception.NotificationManager;

@RestControllerAdvice(annotations = RestController.class)
public class ExceptionController {
	@Autowired
    private NotificationManager notificationManager;

	// 에러가 발생한 Exception을 log로 지정된 곳에 알림을 보낸다.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exceptionNotify(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        notificationManager.sendNotification(e, req.getRequestURI(), getParams(req));
        System.out.println(req.getRequestURI());
        System.out.println(getParams(req));
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append("/n");
        }
        
        return params.toString();
    }
}
