package com.zs.cws.appconfig.core;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.zs.cws.appconfig.AppConfig;


public class SpringMvcInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { AppConfig.class };
	}
	/*
	 * @Override protected Class<?>[] getServletConfigClasses() { return new
	 * Class[] { AppConfig.class }; }
	 */

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		// TODO Auto-generated method stub
		return null;
	}
	/*
	 * @Override public void onStartup(ServletContext servletContext) throws
	 * ServletException { servletContext.addFilter("securityFilter", new
	 * DelegatingFilterProxy("springSecurityFilterChain"))
	 * .addMappingForUrlPatterns(null, false, "/*");
	 * 
	 * super.onStartup(servletContext); }
	 */

	/*
	 * @Override public void onStartup(ServletContext servletContext) throws
	 * ServletException { super.onStartup(servletContext);
	 * servletContext.addListener(new SessionListener()); }
	 */

	@Override
	protected DispatcherServlet createDispatcherServlet(WebApplicationContext servletAppContext) {
		final DispatcherServlet dispatcherServlet = (DispatcherServlet) super.createDispatcherServlet(
				servletAppContext);
		dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);
		return dispatcherServlet;
	}

}
