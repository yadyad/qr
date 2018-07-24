var app = angular.module('subject', [ 'datatables' ]);
app.controller('subjectCtrl', function($scope, $http, $filter, $window) {
	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.subjectModel = null;
	$scope.subjectModelList = {};
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.Show = "New";

	// Method for show and hide the form
	$scope.hide = function() {
		if (document.getElementById('sub-form').style.display == 'none') {
			document.getElementById('sub-form').style.display = 'block';
			$scope.Show = "Hide";
		} else {
			document.getElementById('sub-form').style.display = 'none';
			$scope.Show = "New";
		}
	}

	// Reset Function
	$scope.reset = function() {
		$scope.subjectModel = {};
		$('#su').html('50 characters remaining');
		$('#sd').html('255 characters remaining');
	};

	$scope.singleSelect = function(subId) {
		// Get row ID
		var rowId = subId;
		if (rows_selected.indexOf(rowId) !== -1) {
			rows_selected.splice(rows_selected.indexOf(rowId), 1);
		} else {
			rows_selected.push(rowId);
		}

	};

	// Edit Function

	$scope.edit = function(subModel, index) {
		$scope.Show = "Hide";
		document.getElementById('sub-form').style.display = 'block';
		editIndex = index;
		$scope.subjectModel = subModel;
		$scope.textFieldLegthValidationOnEdit();
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_max = 255;
		var text_dep = 50;
		var text_length = $scope.subjectModel.subject.length;
		var text_remaining1 = text_dep - text_length;
		$('#su').html(text_remaining1 + ' characters remaining');

		$('#sd').html(text_max + ' characters remaining');
		var text_length = $scope.subjectModel.description.length;
		var text_remaining1 = text_max - text_length;
		$('#sd').html(text_remaining1 + ' characters remaining');

	}

	$scope.deleteSelected = function() {


		if ($window.confirm("Are you sure want to delete this subject?")) {
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/subject/deleteItems/" + rows_selected + "";
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
					$scope.subjectModelList = newDataList;
				} else {
					alert("Not deleted");
				}
			});
		}

	};

	// Delete Function
	$scope.subjectDept = function(subId, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/subject/deleteSingleItem/" + subId + "";
		if ($window.confirm("Are you sure want to delete?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.subjectModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		document.getElementById('sub-form').style.display = 'none';
		var getLink = "" + HOST_NAME + "/superadmin/subject/all";
		$http.get(getLink).then(function(response) {
			$scope.subjectModelList = response.data;
		});
	};

	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.subjectModelList, function(subjectModelList1) {
			subjectModelList1.selected = $scope.selectedAll;
		});
	};

	$scope.remove = function() {
		// if ($window.confirm("Are you sure want to delete?")) {
		rows_selected = [];
		newDataList = [];
		$scope.selectedAll = false;
		angular.forEach($scope.subjectModelList, function(selected) {
			if (!selected.selected) {
				newDataList.push(selected);
			} else {
				rows_selected.push(selected.subjectId);
			}
		});

		if (rows_selected.length === 0) {

			alert("please select a row to delete");
		} else {
			$scope.deleteSelected();
		}

		/*
		 * $scope.deleteSelected(); $scope.subjectModelList = newDataList;
		 */
		// }
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
		$('#su').html(text_dep + ' characters remaining');
		$('#sd').html(text_max + ' characters remaining');

		$("#subject").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#subject').val().length;
					var text_remaining = text_dep - text_length;

					$('#su').html(text_remaining + ' characters remaining');
				});

		$("#description").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#description').val().length;
					var text_remaining = text_max - text_length;

					$('#sd').html(text_remaining + ' characters remaining');
				});

	}
	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		var link = "" + HOST_NAME + "/superadmin/subject/post";
		var tempSubID = $scope.subjectModel.subjectId;
		$http.post(link, $scope.subjectModel).then(function(response) {
			$scope.subjectModel = response.data;
			if ($scope.subjectModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			} else {
				if (angular.isNumber(tempSubID)) {
					$scope.subjectModelList.splice(editIndex, 1);
				}
				$scope.subjectModelList.push($scope.subjectModel);
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			}
		});

	};

});