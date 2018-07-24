var app = angular.module('examdetails', [ 'datatables' ]);
app.controller('examdetailsCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.examdetailsModel = null;
	$scope.examdetailsList = null;
	$scope.Show="New";
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];

	// Method for show and hide the form
	$scope.hide = function() {
		if(document.getElementById('exam-form').style.display=='none'){
			document.getElementById('exam-form').style.display='block';
			$scope.Show="Hide";
		}else{
			document.getElementById('exam-form').style.display='none';
			$scope.Show="New";
		}
	}

	// Reset Function
	$scope.reset = function() {

		$scope.examdetailsModel = {};
		$('#examID').html('255 characters remaining');
		$('#examDesxc').html('255 characters remaining');

	};

	// Edit Function

	$scope.edit = function(exam, index) {
		$scope.Show="Hide";
		document.getElementById('exam-form').style.display='block';
		editIndex = index;
		$scope.examdetailsModel = exam;
		$scope.textFieldLegthValidationOnEdit();
		
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_max = 255;
		var text_length = $scope.examdetailsModel.examName.length;
		var text_remaining1 = text_max - text_length;
		$('#examID').html(text_remaining1 + ' characters remaining');

		$('#examDesxc').html(text_max + ' characters remaining');
		var text_length = $scope.examdetailsModel.examDesc.length;
		var text_remaining1 = text_max - text_length;
		$('#examDesxc').html(text_remaining1 + ' characters remaining');

	}
	
	$scope.deleteExam = function() {

		if (rows_selected.length === 0) {
			alert("please select a row to delete");
		} else if ($window.confirm("Are you sure want to delete?"))  {
			var deleteLink = "" + HOST_NAME
					+ "/schooladmin/examdetails/examdeleteItems/" + rows_selected
					+ "";
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}
	};

	
	
	
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {

		document.getElementById('exam-form').style.display = 'none';
		var getLink = "" + HOST_NAME + "/schooladmin/examdetails/all";
		$http.get(getLink).then(function(response) {
			$scope.examdetailsList = response.data;
		});
		
	};

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
		$scope.textFieldLegthValidation();
	});

	// / TEXT FIELD LENGTH VALIDATION.....

	$scope.textFieldLegthValidation = function() {
		var text_max = 255;
		$('#examID').html(text_max + ' characters remaining');
		$('#examDesxc').html(text_max + ' characters remaining');

		$("#examName").bind(
				'propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#examName').val().length;
					var text_remaining = text_max - text_length;

					$('#examID')
							.html(text_remaining + ' characters remaining');
				});

		$("#examDesc").bind(
				'propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#examDesc').val().length;
					var text_remaining = text_max - text_length;

					$('#examDesxc').html(
							text_remaining + ' characters remaining');
				});

	}
	
	


	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.examdetailsList, function(examdetailsList1) {
			examdetailsList1.selected = $scope.selectedAll;
		});
	};

	
	$scope.remove = function() {
		//if ($window.confirm("Are you sure want to delete?")) {
			var newDataList = [];
			$scope.selectedAll = false;
			angular.forEach($scope.examdetailsList, function(selected) {
				if (!selected.selected) {
					newDataList.push(selected);
				} else {
					rows_selected.push(selected.examDetailsID);
				}
			});

			$scope.deleteExam();
			$scope.examdetailsList = newDataList;
		//}
	};


	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
	
		var link = "" + HOST_NAME + "/schooladmin/examdetails/post";
		var tempDeptID = $scope.examdetailsModel.examDetailsID;
		$http.post(link, $scope.examdetailsModel).then(function(response) {
			$scope.examdetailsModel = response.data;

			if ($scope.examdetailsModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			} else {
				if (angular.isNumber(tempDeptID)) {
					$scope.examdetailsList.splice(editIndex, 1);
				}
				$scope.examdetailsList.push($scope.examdetailsModel);
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			}
		});
	

	};

});