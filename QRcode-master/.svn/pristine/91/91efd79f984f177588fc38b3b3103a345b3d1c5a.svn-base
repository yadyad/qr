var app = angular.module('announcements', [ 'datatables' ]);
app
		.controller(
				'announcementsCtrl',
				function($scope, $http, $filter, $window) {
				//	var announcementsModel={};
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.announcementsModel = null;
					// Method for show and hide the form

					// Reset Function
					$scope.reset = function() {
						$scope.announcementsModel = {};
					};

					// MSG SENDING SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/schooladmin/announcements/post";
						$http.post(link, $scope.announcementsModel).then(
								function(response) {
								/*	$scope.announcementsModel = response.data;*/
										$scope.reset();
										$("#success").fadeIn(300)
										.delay(1500).fadeOut(
												400);
										// file upload end
								});

					};
					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						
						
						
						
					});
					
					
					
					$scope.msgSelect = function(type){
						document.getElementById('msg').style.display = 'block';
					}
					
					//	EMAIL SENDING SUBMIT
					$scope.submitEmail = function(){
						
						$scope.submitted = true;
						
						var link = "" + HOST_NAME
								+ "/schooladmin/announcements/postemail";
						$http.post(link, $scope.announcementsModel).then(
								function(response) {
									//$scope.announcementsModel = response.data;
										$scope.reset();
										$("#success").fadeIn(300)
										.delay(1500).fadeOut(
												400);
										// file upload end
								});
						
					}
				});