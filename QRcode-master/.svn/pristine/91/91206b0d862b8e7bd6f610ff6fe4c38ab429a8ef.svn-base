var app = angular.module('Category', [ 'datatables' ]);
app.controller('categoryCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.categoryModel = null;
	$scope.categoryModelList = null;
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.Show = "New";

	// Method for show and hide the form
	$scope.hide = function() {
		if (document.getElementById('category-form').style.display == 'none') {
			document.getElementById('category-form').style.display = 'block';
			$scope.Show = "Hide";
		} else {
			document.getElementById('category-form').style.display = 'none';
			$scope.Show = "New";
		}
	}
	// Reset Function
	$scope.reset = function() {

		$scope.categoryModel = {};
		$('#cc').html('50 characters remaining');

		$('#cd').html('255 characters remaining');

	};
	// Reset Function
	$scope.singleSelectCat = function(catID) {
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
		document.getElementById('category-form').style.display = 'block';
		editIndex = index;
		$scope.categoryModel = catModel;
		$scope.textFieldLegthValidationOnEdit();
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_max = 255;
		var text_cat = 50;
		var text_length = $scope.categoryModel.category.length;
		var text_remaining1 = text_cat - text_length;
		$('#cc').html(text_remaining1 + ' characters remaining');

		$('#cd').html(text_max + ' characters remaining');
		var text_length = $scope.categoryModel.description.length;
		var text_remaining1 = text_max - text_length;
		$('#cd').html(text_remaining1 + ' characters remaining');
	}

	$scope.deleteSelectedCat = function() {

		if ($window.confirm("Are you sure want to delete this category?")) {
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/category/CatdeleteItems/" + rows_selected
					+ "";
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
					$scope.categoryModelList = newDataList;
				} else {
					alert("Not deleted");
				}
			});
		}
	};

	// Delete Function
	$scope.deleteCat = function(catID, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/category/CatdeleteSingleItem/" + catID + "";
		if ($window.confirm("Are you sure want to delete?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.categoryModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {

		document.getElementById('category-form').style.display = 'none';
		var getLink = "" + HOST_NAME + "/superadmin/category/Catgoryall";
		$http.get(getLink).then(function(response) {
			$scope.categoryModelList = response.data;
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
		var text_cat = 50;
		$('#cc').html(text_cat + ' characters remaining');
		$('#cd').html(text_max + ' characters remaining');

		$("#category").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#category').val().length;
					var text_remaining = text_cat - text_length;

					$('#cc').html(text_remaining + ' characters remaining');
				});

		$("#description").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#description').val().length;
					var text_remaining = text_max - text_length;

					$('#cd').html(text_remaining + ' characters remaining');
				});

	}

	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.categoryModelList, function(categoryModelList1) {
			categoryModelList1.selected = $scope.selectedAll;
		});
	};

	$scope.remove = function() {
		// if ($window.confirm("Are you sure want to delete?")) {
		rows_selected = [];
		newDataList = [];
		$scope.selectedAll = false;
		angular.forEach($scope.categoryModelList, function(selected) {
			if (!selected.selected) {
				newDataList.push(selected);
			} else {
				rows_selected.push(selected.rowId);
			}
		});
		if (rows_selected.length === 0) {

			alert("please select a row to delete");
		} else {
			$scope.deleteSelectedCat();
		}

		// $scope.categoryModelList = newDataList;
		// }
	};
	// method for empty check
	$scope.checkSpaces = function() {
		var status = true;
		if ($.trim($scope.categoryModel.category).length == 0) {
			$scope.categoryModel.category = "";
			status = false;
		}
		return status;
	}

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;

		var link = "" + HOST_NAME + "/superadmin/category/post";
		var tempDeptID = $scope.categoryModel.rowId;
		if ($scope.checkSpaces()) {
			$http.post(link, $scope.categoryModel).then(function(response) {
				$scope.categoryModel = response.data;

				if ($scope.categoryModel.length == 0) {
					$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
					$scope.reset();
				} else {
					if (angular.isNumber(tempDeptID)) {
						$scope.categoryModelList.splice(editIndex, 1);
					}
					$scope.categoryModelList.push($scope.categoryModel);
					$("#success").fadeIn(300).delay(1500).fadeOut(400);
					$scope.reset();
					// $scope.validation();
				}
			});
		}

	};

});