var app = angular.module('quota', [ 'datatables' ]);
app.controller('quotaCtrl', function($scope, $http, $filter, $window) {
	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.quotaModel = null;
	$scope.quotaModelList = null;
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.Show = "New";

	// Method for show and hide the form
	$scope.hide = function() {
		if (document.getElementById('quota-form').style.display == 'none') {
			document.getElementById('quota-form').style.display = 'block';
			$scope.Show = "Hide";
		} else {
			document.getElementById('quota-form').style.display = 'none';
			$scope.Show = "New";
		}
	}

	// Reset Function
	$scope.reset = function() {
		$scope.quotaModel = {};
		$('#qq').html('50 characters remaining');
	};

	$scope.singleSelect = function(quotaId) {
		// Get row ID
		var rowId = quotaId;
		if (rows_selected.indexOf(rowId) !== -1) {
			rows_selected.splice(rows_selected.indexOf(rowId), 1);
		} else {
			rows_selected.push(rowId);
		}

	};
	// Quota size validation
	$scope.checkQuotaSize = function() {
		var min = 1;
		var max = 100;
		if ($scope.quotaModel.quotaSize < min) {
			alert("Quota size should not be less than 1");
			$scope.quotaModel.quotaSize = "";
		}
	}

	// Edit Function

	$scope.edit = function(quotaModel, index) {
		$scope.Show = "Hide";
		document.getElementById('quota-form').style.display = 'block';
		editIndex = index;
		$scope.quotaModel = quotaModel;
		$scope.textFieldLegthValidationOnEdit();
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_dep = 50;
		var text_length = $scope.quotaModel.quotaName.length;
		var text_remaining1 = text_dep - text_length;
		$('#qq').html(text_remaining1 + ' characters remaining');

	}

	$scope.deleteSelected = function() {

		if (rows_selected.length === 0) {
			alert("please select a row to delete");
		} else {
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/quota/quotadeleteItems/" + rows_selected
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

	// Delete Function
	$scope.quotaDelete = function(quotId, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/quota/quotadeleteSingleItem/" + quotId + "";
		if ($window.confirm("Are you sure want to delete?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.quotaModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		document.getElementById('quota-form').style.display = 'none';
		var getLink = "" + HOST_NAME + "/superadmin/quota/all";
		$http.get(getLink).then(function(response) {
			$scope.quotaModelList = response.data;
		});
	};

	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.quotaModelList, function(quotaModelList1) {
			quotaModelList1.selected = $scope.selectedAll;
		});
	};

	$scope.remove = function() {
		if ($window.confirm("Are you sure want to delete?")) {
			var newDataList = [];
			$scope.selectedAll = false;
			angular.forEach($scope.quotaModelList, function(selected) {
				if (!selected.selected) {
					newDataList.push(selected);
				} else {
					rows_selected.push(selected.quotaId);
				}
			});

			$scope.deleteSelected();
			$scope.quotaModelList = newDataList;
		}
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
		$('#qq').html(text_dep + ' characters remaining');

		$("#quotaName").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#quotaName').val().length;
					var text_remaining = text_dep - text_length;

					$('#qq').html(text_remaining + ' characters remaining');
				});

	}

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		var link = "" + HOST_NAME + "/superadmin/quota/post";
		var tempQuotID = $scope.quotaModel.quotaId;

		$http.post(link, $scope.quotaModel).then(function(response) {
			$scope.quotaModel = response.data;

			if ($scope.quotaModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			} else {
				if (angular.isNumber(tempQuotID)) {
					$scope.quotaModelList.splice(editIndex, 1);
				}
				$scope.quotaModelList.push($scope.quotaModel);
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			}
		});

	};

});