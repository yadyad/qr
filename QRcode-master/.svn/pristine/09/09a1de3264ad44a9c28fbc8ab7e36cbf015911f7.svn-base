var app = angular.module('complaintBox', [ 'datatables' ]);


app
		.controller(
				'complaintBoxCtrl',
				function($scope, $http, $filter, $window) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];

					$scope.complaintList=null;

					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(

									function() {
										var getComplaintList = ""
												+ HOST_NAME
												+ "/schooladmin/complaintview/listAll";
										$http
												.get(getComplaintList)
												.then(
														function(response) {
															$scope.complaintList = response.data;
														});
									});

				});