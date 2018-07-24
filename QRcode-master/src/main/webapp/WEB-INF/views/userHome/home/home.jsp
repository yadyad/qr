<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
<title>Spring MVC Form Handling</title>
</head>
<body>
	<form:form method="POST" action="save">
		<table>
			<tr>
				<td><form:label path="text">Name</form:label></td>
				<td><form:input path="text" /></td>
			</tr>
			  <tr>    
          <td colspan="2"><input type="submit" value="save" /></td>    
         </tr>  

		</table>
	</form:form>
</body>
</html>
