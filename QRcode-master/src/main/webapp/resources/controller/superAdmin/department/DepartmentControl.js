var app = angular.module('department', [ 'datatables' ]);
app.controller('departmentCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.departmentModel = null;
	$scope.departmentModelList = null;
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.Show = "New";
	var newDataList = [];
	/*
	 * // Method for show and hide the form $scope.hide = function() {
	 * document.getElementById('dept-id').style.display = 'none'; } $scope.show =
	 * function() { document.getElementById('dept-id').style.display = 'block'; }
	 */

	// Method for show and hide the form
	$scope.hide = function() {
		if (document.getElementById('dept-id').style.display == 'none') {
			document.getElementById('dept-id').style.display = 'block';
			$scope.Show = "Hide";
		} else {
			document.getElementById('dept-id').style.display = 'none';
			$scope.Show = "New";
		}
	}
	/*
	 * $scope.show = function() {
	 * document.getElementById('dept-id').style.display = 'block'; }
	 */
	// Reset Function
	$scope.reset = function() {
		$scope.departmentModel = {};
		$scope.submitted = false;
		$('#dd').html('50 characters remaining');

		$('#ds').html('255 characters remaining');
	};
	// Reset Function
	$scope.singleSelect = function(deptID) {
		// Get row ID
		var rowId = deptID;
		if (rows_selected.indexOf(rowId) !== -1) {
			rows_selected.splice(rows_selected.indexOf(rowId), 1);
		} else {
			rows_selected.push(rowId);
		}

	};

	// Edit Function

	$scope.edit = function(deptModel, index) {
		$scope.Show = "Hide";
		document.getElementById('dept-id').style.display = 'block';
		editIndex = index;
		$scope.departmentModel = deptModel;
		$scope.textFieldLegthValidationOnEdit();
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_max = 255;
		var text_dep = 50;
		var text_length = $scope.departmentModel.department.length;
		var text_remaining1 = text_dep - text_length;
		$('#dd').html(text_remaining1 + ' characters remaining');

		$('#ds').html(text_max + ' characters remaining');
		var text_length = $scope.departmentModel.description.length;
		var text_remaining1 = text_max - text_length;
		$('#ds').html(text_remaining1 + ' characters remaining');

	}

	$scope.deleteSelected = function() {

		if ($window.confirm("Are you sure want to delete this department?")) {
			

		//	alert("Are you sure you want to delete this department");
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/department/deleteItems/" + rows_selected
					+ "";
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
					$scope.departmentModelList = newDataList;
				} else {
					alert("Not deleted");
				}
				
			});
		}
	};

	// Delete Function
	$scope.deleteDept = function(deptID, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/department/deleteSingleItem/" + deptID + "";
		if ($window.confirm("Are you sure?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.departmentModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		document.getElementById('dept-id').style.display = 'none';
		var getLink = "" + HOST_NAME + "/superadmin/department/all";
		$http.get(getLink).then(function(response) {
			$scope.departmentModelList = response.data;

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
		var text_dep = 50;
		$('#dd').html(text_dep + ' characters remaining');
		$('#ds').html(text_max + ' characters remaining');

		$("#departmentID").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#departmentID').val().length;
					var text_remaining = text_dep - text_length;

					$('#dd').html(text_remaining + ' characters remaining');
				});

		$("#descriptionID").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#descriptionID').val().length;
					var text_remaining = text_max - text_length;

					$('#ds').html(text_remaining + ' characters remaining');
				});

	}

	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.departmentModelList, function(
				departmentModelList1) {
			departmentModelList1.selected = $scope.selectedAll;
		});
	};

	$scope.remove = function() {

		rows_selected=[];
		newDataList=[];
			$scope.selectedAll = false;
			angular.forEach($scope.departmentModelList, function(selected) {
				if (!selected.selected) {
					newDataList.push(selected);
				} else {
					rows_selected.push(selected.rowId);
				}
			});
			if (rows_selected.length === 0) {
				
				alert("please select a row to delete");
			}else{
			$scope.deleteSelected();
			}
			
		
	};

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		// alert($scope.submitted);
		var link = "" + HOST_NAME + "/superadmin/department/post";
		var tempDeptID = $scope.departmentModel.rowId;
		var tempModel = $scope.departmentModel;

		$http.post(link, $scope.departmentModel).then(function(response) {
			$scope.departmentModel = response.data;
			if ($scope.departmentModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			} else {
				if (angular.isNumber(tempDeptID)) {
					$scope.departmentModelList.splice(editIndex, 1);
				}
				$scope.departmentModelList.push($scope.departmentModel);
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			}
		});
		// alert($scope.submitted);
	};

});