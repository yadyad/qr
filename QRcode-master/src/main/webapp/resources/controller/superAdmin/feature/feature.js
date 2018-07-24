var app = angular.module('feature', [ 'datatables' ]);
app.controller('featureCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.featureModel = null;
	$scope.featureModelList = [];
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.Show = "New";

	// Method for show and hide the form
	$scope.hide = function() {
		if (document.getElementById('feature-form').style.display == 'none') {
			document.getElementById('feature-form').style.display = 'block';
			$scope.Show = "Hide";
		} else {
			document.getElementById('feature-form').style.display = 'none';
			$scope.Show = "New";
		}
	}
	/*
	 * $scope.show = function() {
	 * document.getElementById('feature-form').style.display = 'block'; }
	 */

	// Reset Function
	$scope.reset = function() {
		$scope.featureModel = {};
		$('#feat').html('50 characters remaining');

		$('#fd').html('255 characters remaining');
		$('#fu').html('255 characters remaining');

		$('#fc').html('255 characters remaining');
	};
	// Reset Function
	$scope.singleSelectfeature = function(catID) {
		// Get row ID
		var rowId = catID;
		if (rows_selected.indexOf(rowId) !== -1) {
			rows_selected.splice(rows_selected.indexOf(rowId), 1);
		} else {
			rows_selected.push(rowId);
		}

	};

	// Edit Function

	$scope.edit = function(catModel, index) {
		$scope.Show = "Hide";
		document.getElementById('feature-form').style.display = 'block';
		editIndex = index;
		$scope.featureModel = catModel;

		$scope.featureModel.featureType = $scope.featureModel.featureType
				.toString();
		$scope.textFieldLegthValidationOnEdit();
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_max = 255;
		var text_dep = 50;
		var text_length = $scope.featureModel.featureName.length;
		var text_remaining1 = text_dep - text_length;
		$('#feat').html(text_remaining1 + ' characters remaining');

		$('#fd').html(text_max + ' characters remaining');
		var text_length = $scope.featureModel.description.length;
		var text_remaining1 = text_max - text_length;

		$('#fu').html(text_max + ' characters remaining');
		var text_length = $scope.featureModel.url.length;
		var text_remaining1 = text_max - text_length;
		$('#fu').html(text_remaining1 + ' characters remaining');

		$('#fd').html(text_max + ' characters remaining');
		var text_length = $scope.featureModel.url.length;
		var text_remaining1 = text_max - text_length;
		$('#fd').html(text_remaining1 + ' characters remaining');

		$('#fc').html(text_max + ' characters remaining');
		var text_length = $scope.featureModel.url.length;
		var text_remaining1 = text_max - text_length;
		$('#fc').html(text_remaining1 + ' characters remaining');

	}

	$scope.deleteSelectedfeature = function() {

		if ($window.confirm("Are you sure want to delete this feature?")) {
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/feature/featuredeleteItems/" + rows_selected
					+ "";
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
					$scope.featureModelList = newDataList;
				} else {
					alert("Not deleted");
				}
			});
		}
	};

	// Delete Function
	$scope.deletefeature = function(catID, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/feature/featuredeleteSingleItem/" + catID + "";
		if ($window.confirm("Are you sure?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.featureModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		document.getElementById('feature-form').style.display = 'none';
		var getLink = "" + HOST_NAME + "/superadmin/feature/featureall";
		var getFeatureType = "" + HOST_NAME
				+ "/superadmin/feature/dropDownFeatureType"
		$http.get(getLink).then(function(response) {
			$scope.featureModelList = response.data;
		});

		$http.get(getFeatureType).then(function(response) {
			$scope.featureTypeList = response.data;
		});
	};

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
		$scope.textFieldLegthValidation();
	});

	// / TEXT FIELD LENGTH VALIDATION.....

	$scope.textFieldLegthValidation = function() {
		var text_dep = 50;
		var text_max = 255;
		$('#feat').html(text_dep + ' characters remaining');
		$('#fd').html(text_max + ' characters remaining');

		$('#fu').html(text_max + ' characters remaining');
		$('#fc').html(text_max + ' characters remaining');

		$("#featureName").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#featureName').val().length;
					var text_remaining = text_dep - text_length;

					$('#feat').html(text_remaining + ' characters remaining');
				});

		$("#description").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#description').val().length;
					var text_remaining = text_max - text_length;

					$('#fd').html(text_remaining + ' characters remaining');
				});

		$("#url").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#url').val().length;
					var text_remaining = text_max - text_length;

					$('#fu').html(text_remaining + ' characters remaining');
				});

		$("#css").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#css').val().length;
					var text_remaining = text_max - text_length;

					$('#fc').html(text_remaining + ' characters remaining');
				});

	}

	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.featureModelList, function(featureModelList1) {
			featureModelList1.selected = $scope.selectedAll;
		});
	};

	$scope.remove = function() {
		// if ($window.confirm("Are you sure want to delete?")) {
		rows_selected = [];
		newDataList = [];
		$scope.selectedAll = false;
		angular.forEach($scope.featureModelList, function(selected) {
			if (!selected.selected) {
				newDataList.push(selected);
			} else {
				rows_selected.push(selected.rowId);
			}
		});
		if (rows_selected.length === 0) {

			alert("please select a row to delete");
		} else {
			$scope.deleteSelectedfeature();
		}

		// $scope.featureModelList = newDataList;
		// }
	};

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		var link = "" + HOST_NAME + "/superadmin/feature/post";
		var tempfetureID = $scope.featureModel.rowId;
		$http.post(link, $scope.featureModel).then(function(response) {
			$scope.featureModel = response.data;
			if ($scope.featureModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			} else {
				if (angular.isNumber(tempfetureID)) {
					$scope.featureModelList.splice(editIndex, 1);
				}
				$scope.featureModelList.push($scope.featureModel);
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			}
		});

	};

});