package com.zs.cws.appconfig;

import java.util.Properties;
import javax.sql.DataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
//@PropertySource({ "classpath:database.properties" })
@ImportResource("classpath:spring-datasource.xml")
@EnableJpaRepositories("com.zs.cws")
public class PersistenceConfig {

	@Autowired
	DataSource dataSource;
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {

		LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
		entityManagerFactoryBean.setDataSource(dataSource);
		entityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
		entityManagerFactoryBean
				.setPackagesToScan(new String[] { "com.zs.cws" });
		entityManagerFactoryBean.setJpaProperties(getHibernateProperties());
		return entityManagerFactoryBean;
	}
	
	/*@Bean
	public BoneCPDataSource getBoneCPDataSource(){
		
		BoneCPDataSource bds = new BoneCPDataSource();
		bds.setDriverClass("com.mysql.jdbc.Driver");
		bds.setJdbcUrl("jdbc:mysql://192.168.1.122:3306/clubwizard_db");
		bds.setUsername("root");
		bds.setPassword("root");
		return bds;
	}*/
	
	@Bean
    public JpaTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return transactionManager;
    }
	
	/*@Bean
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(getBoneCPDataSource());
	}
	*/
	
	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}

	private Properties getHibernateProperties() {
		Properties properties = new Properties();
		properties.put("hibernate.show_sql", "true");
		properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
		/*------------------- Need to use it when neccessary--------------------------------*/
		/*properties.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));*/
		properties.put("hibernate.globally_quoted_identifiers", "true");

		return properties;
	}

}