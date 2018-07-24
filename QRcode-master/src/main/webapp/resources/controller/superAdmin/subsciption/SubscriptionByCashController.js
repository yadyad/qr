var app = angular.module('subscriptionByCash', [ 'datatables' ]);
app
		.controller(
				'subscriptionByCashCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.superAdminSubscriptionModel = null;
					$scope.subsciptionPlanModelList = null;
					$scope.isSubscribedModel = null;
					$scope.planDetails = null;
					$scope.selectedPlan = null;
					$scope.inactive=false;
					$scope.currentPlanModel=null;
					var initialPayment = 0;
					$scope.planType = [ "Quarterly", "Yearly" ];
					$scope.paymentMode = [ "Cash", "Cheque" ];

					var isNew=false;
					$scope.addmemberModel;
					
					var existingStudentsCount = 0;

					$scope.changePlan = function() {
						var getLink = "" + HOST_NAME
								+ "/superadmin/subscription/select/"
								+ $scope.superAdminSubscriptionModel.planID;
						$http
								.get(getLink)
								.then(
										function(response) {
											$scope.selectedPlan = response.data;
											if ($scope.isSubscribedModel.subActivationID == 0) {
												initialPayment = $scope.selectedPlan.initialSetupPrie;
											} else {
												initialPayment = 0;
											}
										});

					}
	//////////////////METHOD TO CHECK NEW PLAN OR NOT//////////////////////////////////				
					$scope.isNewPlan=function(){
						$scope.inactive=false;
						$scope.superAdminSubscriptionModel={};
						isNew=true;
						var isNewLink = "" + HOST_NAME+ "/superadmin/subscription/activation/isnew/"+ isNew;
						$http.get(isNewLink).then(
								function(response) {});
					}
					
/////////////////////////////METHOD TO ADD MORE STUDENTS/////////////////////////////////////////					
					$scope.addMoreStudents=function(){
						isNew=false;
						var isNewLink = "" + HOST_NAME+ "/superadmin/subscription/activation/isnew/"+ isNew;
						$http.get(isNewLink).then(
								function(response) {});
						
						$scope.inactive=true;
						var getLink = "" + HOST_NAME
						+ "/superadmin/subscription/activation/addmorestudents";
						
										$http.get(getLink).then(
													function(response) {
														$scope.addmemberModel=response.data;
														$scope.selectedPlan=$scope.addmemberModel.subsciptionPlanModel;
//														alert($scope.addmemberModel.subscriptionType);
														$scope.superAdminSubscriptionModel.planID=$scope.addmemberModel.subsciptionPlanModel.newPlanId;
														$scope.superAdminSubscriptionModel.paymentPeriod=$scope.addmemberModel.subscriptionType;
														$scope.superAdminSubscriptionModel.startDate=$scope.addmemberModel.startDate;
													});
					}
					
//////////////////////////////////////////////////////////////////////////////////////					
					// Check the students count and amount calculation
					$scope.checkValidity = function(studentCount) {
						if (angular
								.isDefined($scope.superAdminSubscriptionModel.paymentPeriod)
								&& angular
										.isDefined($scope.superAdminSubscriptionModel.planID)) {

							if ((studentCount >= $scope.selectedPlan.minMemberCount)
									&& (studentCount <= $scope.selectedPlan.memberCount)) {
								if(existingStudentsCount<=$scope.superAdminSubscriptionModel.studentCount){
								if ($scope.superAdminSubscriptionModel.paymentPeriod == "Quarterly") {
									$scope.superAdminSubscriptionModel.amount = initialPayment
											+ ($scope.superAdminSubscriptionModel.studentCount
													* $scope.selectedPlan.quarterlyPrice * 3);
								} else {
									$scope.superAdminSubscriptionModel.amount = initialPayment
											+ ($scope.superAdminSubscriptionModel.studentCount
													* $scope.selectedPlan.yearlyPrice * 12);
								}
							}else{
								
								alert("Students count should be greater than "+existingStudentsCount);
									
								$scope.superAdminSubscriptionModel.studentCount = "";
							}
							
							} else {
								alert("Students count should be in between "
										+ $scope.selectedPlan.minMemberCount
										+ " and "
										+ $scope.selectedPlan.memberCount);
								$scope.superAdminSubscriptionModel.studentCount = "";
							}
						} else {
							alert("Pleases select plan and period!")
							$scope.superAdminSubscriptionModel.studentCount = "";
						}
					};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Reset Function
					$scope.reset = function() {
						$scope.superAdminSubscriptionModel = {};
					};

///////////////////////METHOD TO LOAD ALL DATAS ///////////////////////////////////////////////////////////
					$scope.loadAllData = function() {
						var getLink = "" + HOST_NAME
								+ "/superadmin/subscription/all";
						$http.get(getLink).then(function(response) {
							$scope.subsciptionPlanModelList = response.data;
						});

						var getPlanDetails = "" + HOST_NAME
								+ "/superadmin/subscription/all";
						$http.get(getPlanDetails).then(function(response) {
							$scope.planDetails = response.data;
						});

						var isSubscribed = ""
								+ HOST_NAME
								+ "/superadmin/subscription/activation/getcurrentsubscription";
						$http.get(isSubscribed).then(function(response) {
							$scope.isSubscribedModel = response.data;
						});

						var getStudentsCount = ""
								+ HOST_NAME
								+ "/superadmin/subscription/activation/getStudentsCount";
						$http.get(getStudentsCount).then(function(response) {
							existingStudentsCount = response.data;
						});
						
						var currentPlanDetails = ""
							+ HOST_NAME
							+ "/superadmin/subscription/activation/currentPlanDetails";
							$http.get(currentPlanDetails).then(function(response) {
								$scope.currentPlanModel=response.data;
							});
					
						
					};

/////////////////////////// ANGULAR READY FUNCTION///////////////////////////////////////////////////
					angular.element(document).ready(function() {
						$scope.loadAllData();
					});

/////////////////////////////////////METHOD TO SUBMIT/////////////////////////////////////////////////
					$scope.submit = function() {
						/*alert(JSON
								.stringify($scope.superAdminSubscriptionModel));*/
						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/superadmin/subscription/activation/post";
						$http.post(link, $scope.superAdminSubscriptionModel)
								.then(function(response) {
									$("#success").fadeIn(300).delay(1500).fadeOut(400);
									$scope.superAdminSubscriptionModel={};
								});

					};

				});