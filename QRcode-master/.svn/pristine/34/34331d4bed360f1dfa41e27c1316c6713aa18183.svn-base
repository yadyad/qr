var app = angular.module('paymentRequest', [ 'datatables' ]);
app
		.controller(
				'paymentRequestController',
				function($scope, $http, $filter, $window) {
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.totalAmount;
					$scope.planType = [ "Quarterly", "Yearly" ];
					$scope.planTypeModel;
					$scope.memberCount;
					$scope.activeSubscription = null;
					$scope.planDetails = null;
					$scope.subscriptionDetails;
					var existingStudentCount = 0;
					$scope.taxModel;
					var initialCost = 0;
					var perMemberAmount;

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
											if ($scope.activeSubscription.subActivationID == 0) {
												initialCost = $scope.planDetails.initialSetupPrie;
											} else {
												initialCost = 0;
											}
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
					};
					$scope.reset = function() {
						$("#description").val("");
						$scope.subscriptionDetails = {};
						$scope.totalAmount = 0;
					}
					$scope.ss = function() {
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
						if ($scope.subscriptionDetails.planType == "Quarterly"
								|| $scope.subscriptionDetails.planType == "Yearly") {

							if (existingStudentCount <= $scope.planDetails.memberCount) {
								if (($scope.planDetails.memberCount >= $scope.subscriptionDetails.memberCount)
										&& ($scope.planDetails.minMemberCount <= $scope.subscriptionDetails.memberCount)) {
									if ($scope.taxModel.taxPercentage != 0) {
										$scope.totalAmount = ((initialCost + ($scope.subscriptionDetails.memberCount * perMemberAmount)))
												+ (initialCost + ($scope.subscriptionDetails.memberCount * perMemberAmount))
												* ($scope.taxModel.taxPercentage / 100);
									} else {
										$scope.totalAmount = (initialCost + ($scope.subscriptionDetails.memberCount * perMemberAmount));
									}
								} else {
									alert("Student count should be between  "
											+ $scope.planDetails.minMemberCount
											+ " and "
											+ $scope.planDetails.memberCount);
									$scope.totalAmount = "";
									$scope.subscriptionDetails.memberCount = "";
								}
							} else {
								alert("The student count should be greater than the existing count");
								$scope.totalAmount = "";
								$scope.subscriptionDetails.memberCount = "";
							}
						} else {
							alert("Please choose a payment mode");
							$scope.subscriptionDetails.memberCount = "";
						}
					};
					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
					});

				});
