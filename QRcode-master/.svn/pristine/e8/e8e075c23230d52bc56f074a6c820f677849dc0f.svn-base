var app = angular.module('payment', [ 'datatables' ]);
app.controller('paymentController', function($scope, $http, $filter, $window) {
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.paymentModel = null;
	$scope.schoolModel = null;
	$scope.paymentList = null;

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {

		var getSchool = "" + HOST_NAME + "/schooladmin/payment/all";
		$http.get(getSchool).then(function(response) {
			$scope.paymentList = response.data;
			$scope.schoolModel = $scope.paymentList[0].schoolModel;
		});
	};
	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {

		$scope.loadAllData();
	});

});
