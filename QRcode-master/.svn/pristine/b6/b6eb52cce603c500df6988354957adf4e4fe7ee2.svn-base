var app = angular.module('mom', [ 'datatables' ]);

/* file upload end class */
app
		.controller(
				'momCtrl',
				function($scope, $http, $filter, $window) {
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.selectedAll = false;
					$scope.currentMeetingModel;
					$scope.momDetails = null;
					var listLength = 0;
					$scope.principalMeetingTaskModel;
					$scope.principalMeetingTaskModelList;
					$scope.staffList;
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						/*$('.dob').daterangepicker({
							singleDatePicker : true,
							calender_style : "picker_4"
						});*/
						var staffListLink = ""
								+ HOST_NAME
								+ "/schooladmin/principalMeeting/mom/getMeetingStaffs";
						$http.get(staffListLink).then(function(response) {
							$scope.staffList = response.data;
						});

						var currentMeeting = ""
								+ HOST_NAME
								+ "/schooladmin/principalMeeting/mom/selectedMeeting";
						$http.get(currentMeeting).then(function(response) {
							$scope.currentMeetingModel = response.data;
						});

						var currentTasks = ""
								+ HOST_NAME
								+ "/schooladmin/principalMeeting/mom/currentTasks";
						$http
								.get(currentTasks)
								.then(
										function(response) {

											var newDataList1 = [];
											angular
													.forEach(
															response.data,
															function(taskModel) {
																taskModel.schoolStaffModel.schoolStaffId = taskModel.schoolStaffModel.schoolStaffId
																		.toString();
																newDataList1
																		.push(taskModel);
															});
											$scope.principalMeetingTaskModelList = newDataList1;
											listLength = $scope.principalMeetingTaskModelList.length;
											// MOMMMMMMMMMMMMMMMMM
											if (listLength == 0) {
												$scope.principalMeetingTaskModelList = [ {
													"taskName" : "",
													'schoolStaffModel' : "",
													'startDate' : "",
													'endDate' : "",
													'completionPercentage' : "0"
												} ];
											}

										});
						/*$('.dob').daterangepicker({
							singleDatePicker : true,
							calender_style : "picker_4"
						});*/
					};

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;
						var momlink = "" + HOST_NAME
								+ "/schooladmin/principalMeeting/mom/post";

						$http.post(momlink, $scope.currentMeetingModel).then(
								function(response) {

								});

						var taskLink = "" + HOST_NAME
								+ "/schooladmin/principalMeeting/mom/task/post";
						$http.post(taskLink,
								$scope.principalMeetingTaskModelList).then(
								function(response) {

									$("#success").fadeIn(300).delay(1500)
											.fadeOut(400);
								});

					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();

					});
					$scope.addNew = function(momDetail) {

						$scope.submitted = true;
						$scope.ddMMyyyy = $filter('date')(new Date(),
								'MM/dd/yyyy');
						$scope.principalMeetingTaskModelList.push({
							'taskName' : "",
							'schoolStaffModel' : "",
							'startDate' : $scope.ddMMyyyy,
							'endDate' : $scope.ddMMyyyy,
							'completionPercentage' : "0"
						});
					/*	$('.dob').daterangepicker({
							singleDatePicker : true,
							calender_style : "picker_4"
						});*/

					};

					$scope.remove = function() {
						var newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.principalMeetingTaskModelList,
								function(selected) {
									if (!selected.selected) {
										newDataList.push(selected);
									}
								});
						$scope.principalMeetingTaskModelList = newDataList;
					};

					$scope.dateValidation = function(checkDate) {
						var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
						var checkD = new Date(checkDate);
						var currentDate = new Date();
						var diffDays = Math
								.round((checkD.getTime() - currentDate
										.getTime())
										/ (oneDay));
						if ((currentDate.getHours() < 12 && diffDays == 0)
								|| (currentDate.getHours() > 12 && diffDays == -1)) {
							alert("Invalid Date"
									+ $scope.principalMeetingTaskModel.startDate);
							checkDate = "";
						}

					};

					$scope.checkAll = function() {
						if (!$scope.selectedAll) {
							$scope.selectedAll = false;
						} else {
							$scope.selectedAll = true;
						}
						angular
								.forEach(
										$scope.principalMeetingTaskModelList,
										function(principalMeetingTaskModel) {
											principalMeetingTaskModel.selected = $scope.selectedAll;
										});
					};
				});