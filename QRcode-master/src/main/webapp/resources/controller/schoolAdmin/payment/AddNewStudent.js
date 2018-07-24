var app = angular.module('paymentRequest', [ 'datatables' ]);
app
		.controller(
				'paymentRequestController',
				function($scope, $http, $filter, $window) {
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.totalAmount;
					$scope.planType;
					$scope.planTypeModel;
					$scope.memberCount;
					$scope.activeSubscription = null;
					$scope.planDetails = null;
					$scope.subscriptionDetails;
					$scope.taxModel;
					var initialCost = 0;
					var perMemberAmount;
					 var diffDays=0;
					 var months=0;
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						var getLastSubscribedPlan = ""
								+ HOST_NAME
								+ "/schooladmin/subscriptionactivation/getcurrentsubscription";
						var planDetails = ""
								+ HOST_NAME
								+ "/schooladmin/subscriptionactivation/getPlanDetails";
						$http.get(planDetails).then(function(response) {
							$scope.planDetails = response.data;
						});
						$http
								.get(getLastSubscribedPlan)
								.then(
										function(response) {
											$scope.activeSubscription = response.data;
											$scope.planType=$scope.activeSubscription.subscriptionType;
											  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds    
											    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
										});
						
						var taxModelLink = "" + HOST_NAME
						+ "/schooladmin/tax/currentTax";
							$http.get(taxModelLink).then(function(response) {
									$scope.taxModel = response.data;
						});
					};
					$scope.ss = function() {
						/*
						 * $scope.subscriptionDetails.memberCount=$scope.memberCount;
						 * $scope.subscriptionDetails.staorageSpace=1000;
						 * $scope.subscriptionDetails.planType=$scope.planTypeModel;
						 */

						// $scope.subscriptionDetails.staorageSpace=$scope.planDetails.staorageSpace;
						var planDetails = "" + HOST_NAME + "/giveplandetails";
						$http.post(planDetails, $scope.subscriptionDetails)
								.then(function(response) {
									$scope.planDetails = response.data;
								});
					};
					$scope.change = function() {
						
						$scope.totalAmount = "";
						$scope.subscriptionDetails.memberCount = "";
						if ($scope.subscriptionDetails.planType == "Quarterly") {
							perMemberAmount = $scope.planDetails.quarterlyPrice * 3;
						} else {
							perMemberAmount = $scope.planDetails.yearlyPrice * 12;
						}
					};

					$scope.search = function() {
						 var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds    
						  diffDays = Math.round(Math.abs(($scope.activeSubscription.endDate - new Date())/(oneDay)));
						  months=diffDays*0.0328767;
							if ($scope.planType == "Quarterly") {
								perMemberAmount = $scope.planDetails.quarterlyPrice * months;
							} else {
								perMemberAmount = $scope.planDetails.yearlyPrice * months;
							}
							if($scope.taxModel.taxPercentage!=0){
								$scope.totalAmount = ($scope.subscriptionDetails.memberCount * perMemberAmount)+(($scope.subscriptionDetails.memberCount * perMemberAmount)*($scope.taxModel.taxPercentage/100));
							}else{
								$scope.totalAmount = ($scope.subscriptionDetails.memberCount * perMemberAmount);
							}
					};
					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
					});

				});