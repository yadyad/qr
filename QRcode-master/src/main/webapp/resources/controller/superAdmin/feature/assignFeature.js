var app = angular.module('schoolFeature', [ 'datatables' ]);
app.controller('schoolFeatureCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.featureModelList = null;
	$scope.remFeatureModelList = null;
	$scope.featID=[];

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		var getFeatureList = "" + HOST_NAME + "/superadmin/schoolfeature/listSchoolFeatures";
		$http.get(getFeatureList).then(function(response) {
			$scope.featureModelList = response.data;
		});
		
		var getRemFeatureList = "" + HOST_NAME + "/superadmin/schoolfeature/listRemSchoolFeatures";
		$http.get(getRemFeatureList).then(function(response) {
			$scope.remFeatureModelList = response.data;
		});
	};

	$scope.reset=function(){
		alert("reset");
	};
	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
	});
	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
	alert("sssssssss111"+JSON.stringify($scope.featID))
	/*	var link = "" + HOST_NAME + "/superadmin/department/post";
		var tempDeptID=$scope.departmentModel.rowId;*/
	/*	$http.post(link, $scope.departmentModel).then(function(response) {
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
		});*/

	};

});