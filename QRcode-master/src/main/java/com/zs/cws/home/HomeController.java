package com.zs.cws.home;

import java.security.Principal;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.JOptionPane;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@Scope("session")
public class HomeController {
	public String qname;

	/* @RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView("user_home");
		return model;
	}
	*/
	@RequestMapping(value = "/", method = RequestMethod.GET)
		   public ModelAndView QRD() {
		      return new ModelAndView("user_home","command",new QRD());
		   }
	@RequestMapping(value="/save",method = RequestMethod.POST)  
    public ModelAndView save(@ModelAttribute("QRD") QRD Qrd,ModelMap model){  
		model.addAttribute("qname",Qrd.getText());
        System.out.println(Qrd.getText());
        return new ModelAndView("printQR","command",Qrd);
	}
	@RequestMapping(value="/print",method = RequestMethod.GET)  
    public ModelAndView print() { 
        return new ModelAndView("redirect:/");
        }
} 


