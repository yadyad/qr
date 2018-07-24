var app = angular.module('attendance', [ 'datatables' ]);
app
		.controller(
				'attendanceCtrl',
				function($scope, $http, $filter, $window) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.divisonList = null;
					$scope.studentList = null;
					$scope.schoolNewsDivModel = null;
					$scope.divisionID;
					// Method for show and hide the form
					$scope.hide = function() {
						document.getElementById('schoolnewsId').style.display = 'none';
					}
					$scope.show = function() {
						document.getElementById('schoolnewsId').style.display = 'block';
					}

			
					$scope.getStudents=function(divID){
						var getStudentList = "" + HOST_NAME
						+ "/schooladmin/attendance/studentsList/"+divID;
				$http.get(getStudentList).then(function(response) {
					$scope.studentList = response.data;
				});
					}
					
					
					$scope.abscentStatus=function(abscentStatus){
						if(abscentStatus==2){
							document.getElementById('lateid').style.display = 'block';
						}else{
							document.getElementById('lateid').style.display = 'none';
						}
					}
					
					
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						var givisonList = "" + HOST_NAME
								+ "/schooladmin/attendance/divisionlist";
						$http.get(givisonList).then(function(response) {
							$scope.divisonList = response.data;
						});

						

					};
					
			
				

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/schooladmin/news/post";
						// alert(JSON.stringify($scope.schoolDivModel))
						var tempStaffID = $scope.schoolNewsDivModel.newsId;
						// alert(tempStaffID)
						// alert(JSON.stringify($scope.schoolDivModel))
						$http.post(link, $scope.schoolNewsDivModel).then(
								function(response) {
;									$scope.schoolNewsDivModel = response.data;
									if ($scope.schoolNewsDivModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempStaffID)) {
											$scope.schoolNewsList.splice(
													editIndex, 1);
										}
										$scope.schoolNewsList
												.push($scope.schoolNewsDivModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										
										var getDropDown = ""
												+ HOST_NAME
												+ "/schooladmin/news/insertImage";
										// file upload end
										$scope.imageEdit = {};
										$("#success").fadeIn(300)
												.delay(1500).fadeOut(
														400);
										$scope.reset();
									}
								});

					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
					});
				});