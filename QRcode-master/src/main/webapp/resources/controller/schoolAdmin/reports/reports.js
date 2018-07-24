var app = angular.module('reports', [ 'datatables' ]);
app.controller('reportsCtrl', function($scope, $http, $filter, $window) {

	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.studentPaymentList = null;
	$scope.feesPaymentModel = null;
	// $scope.daysSelected = '';
	$scope.std = null;
	$scope.division = null;
	$scope.filter = null;
	$scope.divisionList = [];
	$scope.days = null;
	
	
	
	
	

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		document.getElementById('btnDelete').style.display = 'none';
		var getStudentList = "" + HOST_NAME
				+ "/schooladmin/reports/studentListView";

		var getDropDownDivision = "" + HOST_NAME
				+ "/schooladmin/schoolDivison/divOnlydropDown";

		$http.get(getStudentList).then(function(response) {
			$scope.studentPaymentList = response.data;

		});

		$http.get(getDropDownDivision).then(function(response) {
			$scope.divisionList = response.data;

		});

	};

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
	});

	// METHOD TO SUBMIT
	$scope.submit = function() {

		if (days == 0 && std == 0 && division == 0) {
			alert("Please select from the list to filter")
		}
		/*if (division!= 0) {
			alert("Invalid selection")
			document.getElementById('btnDelete').style.display = 'none';
		}*/
		
		
		//document.getElementById('btnDelete').style.display = 'block';

		var getStudentListFiler = "" + HOST_NAME
				+ "/schooladmin/reports/studentListViewFilter/" + std + "/"
				+ division + " /" +days+" ";
		$http.get(getStudentListFiler).then(function(response) {
			$scope.studentPaymentList = response.data;

			if ($scope.studentPaymentList.length == 0) {

				document.getElementById('btnDelete').style.display = 'none';

			} else {

				document.getElementById('btnDelete').style.display = 'block';
			}
		});

	}

	$scope.getStandards = function(standards) {

		std = standards;
	}

	$scope.getDivisions = function(divisions) {

		division = divisions;

	}

	$scope.changedValue = function(item) {
		if (item === '') {
		alert("Please select a value")
			days = 0;
		}else{
		days = item;
		}
	}

	// $scope.daysList=['Last 10 days','Last 20 days']
	$scope.clothes = ['Last 10 days', 'Last 20 days']

	$scope.checkNull = function(model, classModel,selectedDays) {
	
		if(selectedDays == undefined){
			days = 0;
		}else if(selectedDays == 'Last 10 days'){
			days = 10;
		}else{
			days = 20;
		}

		if (model == undefined) {
			
			division = 0;
		}
		if (classModel == undefined) {

			std = 0;

		}
	}

});