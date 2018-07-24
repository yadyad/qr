var app = angular.module('newtax', [ 'datatables' ]);
app.controller('newtaxCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.taxModel = null;
	$scope.taxModelList={};
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	// Method for show and hide the form
	
	
	// Reset Function
	$scope.reset = function() {
		$scope.taxModel = {};
	};

	// Edit Function

	$scope.edit = function(taxPOJO, index) {
		editIndex = index;
		$scope.taxModel = taxPOJO;
	};

	// Delete Function
	$scope.deletePlan = function(taxID, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/tax/taxdeleteSingleItem/" + taxID
				+ "";
		if ($window.confirm("Are you sure want to delete?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.taxModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		var getLink = "" + HOST_NAME + "/superadmin/tax/all";
		$http.get(getLink).then(function(response) {
			$scope.taxModel = response.data;
			
			
			
		});
	};

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
	});

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		var link = "" + HOST_NAME + "/superadmin/tax/post";
		var tempTaxID=$scope.taxModel.taxId;
		$http.post(link, $scope.taxModel).then(function(response) {
			$scope.taxModel = response.data;
			//if ($scope.taxModel.length == 0) {
			//	$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
			//	$scope.reset();
			//} else {
			$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.taxModelList.push($scope.taxModel);
				
			//	$scope.reset();
			//}
		});

	};

});