var app = angular.module('paymentRequest', [ 'datatables' ]);
app.controller('paymentRequestController', function($scope, $http, $filter,
		$window) {
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.totalAmount=0;
	$scope.planType = [ "Quarterly", "Yearly" ];
	$scope.planTypeModel;
	$scope.memberCount;
	$scope.activeSubscription = null;
	$scope.quataModel = null;
	$scope.planDetails = null;
	$scope.subscriptionDetails;
	var existingStudentCount=0;
	$scope.taxModel;
	var initialCost = 0;
	var perMemberAmount;

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		var getLastSubscribedPlan = "" + HOST_NAME
				+ "/schooladmin/subscriptionactivation/getcurrentsubscription";
		
		var planDetails = "" + HOST_NAME
				+ "/schooladmin/subscriptionactivation/getPlanDetails";
		$http.get(planDetails).then(function(response) {
			$scope.planDetails = response.data;
		});


		var getStudentCount = "" + HOST_NAME
		+ "/schooladmin/payment/getStudentsCount";
		$http.get(getStudentCount).then(function(response) {
			existingStudentCount = response.data;
			});
		
		var taxModelLink = "" + HOST_NAME
				+ "/schooladmin/tax/currentTax";
					$http.get(taxModelLink).then(function(response) {
							$scope.taxModel = response.data;
				});
					var quqtaAmount = "" + HOST_NAME
					+ "/getquataamount";
					$http.post(quqtaAmount).then(function(response) {
						if(angular.isUndefined($scope.taxModel)){
							$scope.totalAmount="";
						}else{
							$scope.totalAmount=response.data+(response.data*$scope.taxModel.taxPercentage/100);
				}
				});

	};


	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
	});

});
