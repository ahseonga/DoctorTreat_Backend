package com.doctorTreat.app.doctorMypage;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.doctorTreat.app.Result;

/**
 * Servlet implementation class MemberFrontController
 */
public class DoctorMypageFrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DoctorMypageFrontController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doProcess(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doProcess(request, response);
	}

	protected void doProcess(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String target = request.getRequestURI().substring(request.getContextPath().length());
		System.out.println(target);
		Result result = null;
		
		
		
		switch(target) {
		case "/doctor/doctorInfo.dm":
			System.out.println("나 여기까지 왔어요");
			
			 
	         // medicalInfoNumber 값을 세션에 저장
	         String doctorNumber = request.getParameter("doctorNumber");
	         request.getSession().setAttribute("doctorNumber", doctorNumber);
			
			result = new DoctorInfoController().execute(request, response);
			request.getRequestDispatcher("/app/myPage/doctorInfo.jsp").forward(request, response);
			break;
			
		case "/doctor/doctorPw.dm":
			System.out.println("안뇽하세요");
			request.getRequestDispatcher("/app/myPage/doctorPwOk.jsp").forward(request, response);
			
		case "/doctor/doctorPwOk.dm":
		    System.out.println("나 여기 또 왔어요");

		    // medicalInfoNumber 값을 세션에 저장
		    String doctorPwNumber = request.getParameter("doctorNumber");
		    request.getSession().setAttribute("doctorPwNumber", doctorPwNumber);
		    
		    result = new DoctorPwOkController().execute(request, response);
		    
		   
		    
		    
		    break;

			
			
			
			
		}
		
	}

}
