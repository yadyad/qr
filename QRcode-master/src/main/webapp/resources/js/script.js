
	function submitForm() {
		var form = document.getElementById("frmTransaction");
		var formResult = validateFormFields(form);
		if(formResult)
		{
			form.submit();
		}
		return formResult ;
}

function validateFormFields(form)
{
	var fieldResult = true ; 
	
	if(!isFieldValid(document.forms["frmTransaction"]["referenceNo"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["referenceNo"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["referenceNo"].style.borderColor="";
	
	if(!isAmountValid(document.forms["frmTransaction"]["amount"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["amount"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["amount"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingContactName"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingContactName"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingContactName"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingAddress"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingAddress"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingAddress"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingCity"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingCity"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingCity"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingState"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingState"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingState"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingPostalCode"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingPostalCode"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingPostalCode"].style.borderColor="";
	
	if(!isValidEmail(document.forms["frmTransaction"]["billingEmail"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingEmail"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingEmail"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingPhone"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingPhone"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingPhone"].style.borderColor="";
	
	if(!isFieldValid(document.forms["frmTransaction"]["billingCountry"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["billingCountry"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["billingCountry"].style.borderColor="";
	
	
	
	
	
	
	if(!isFieldValid(document.forms["frmTransaction"]["responseURL"].value)){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
		document.forms["frmTransaction"]["responseURL"].style.borderColor="red";
		fieldResult = false;
	}
	else
		document.forms["frmTransaction"]["responseURL"].style.borderColor="";
	
	
	if(!fieldResult){
		document.getElementById("form_validator").innerHTML= "please fill all mandatory fields";
	}
	else
		document.getElementById("form_validator").innerHTML= "";
	return fieldResult ;
}
function isFieldValid(value)
{
	if(value.trim() == '')
		return false ;
	else
		return true ;
}
	
function isAmountValid(e) {
	
	if (e<=0) {
		return false
	}
	else
		return true ;
}

function isValidEmail(inputId) {
	var pattern = /^\w.+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/;
	if(pattern.test(inputId))
		return true ;
	else
		return false ;
}
	
	
	
	
	
	
	
	