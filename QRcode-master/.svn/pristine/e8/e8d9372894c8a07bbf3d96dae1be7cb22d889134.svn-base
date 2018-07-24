var app = angular.module('myClass', [ 'datatables' ]);
app
		.controller(
				'myClassCtrl',
				function($scope, $http, $filter, $window) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.myClassList = null;
					$scope.myClassModel = null;
					$scope.schoolClassList = null;
					$scope.schoolStaffList = null;
					$scope.schoolSubjectList = null;
					$scope.selected = [];
					$scope.gender = [];
					var rows_selected = [];
					$scope.Show="Show";

					// Method for show and hide the form
					$scope.hide = function() {
						if(document.getElementById('myclass').style.display=='none'){
							document.getElementById('myclass').style.display='block';
							$scope.Show="Hide";
						}else{
							document.getElementById('myclass').style.display='none';
							$scope.Show="Show";
						}
					}
				/*	$scope.show = function() {
						document.getElementById('myclass').style.display = 'block';
					}*/

					// Method to check the myclass
					$scope.checkExist = function() {
						
						var checkExist = "" + HOST_NAME
								+ "/schooladmin/myclass/isSubjectExist/"
								+ $scope.myClassModel.subjectModel.subjectId + "/ "+ $scope.myClassModel.schoolDivModel.schoolDivId + " " ;
								
						
						$http
								.get(checkExist)
								.then(
										function(response) {
											
											if (response.data) {
											
												if (angular
														.isNumber($scope.myClassModel.subjectModel.subjectId)) {
													
												} else {
													
													$("#subjectAllocation").fadeIn(300)
													.delay(1500).fadeOut(
															400);
													//alert("Already allocated this subject to another staff!");
													$scope.myClassModel.subjectModel.subjectId = "";
													
												}
											}
										});

					}
					
					// Edit Function
					$scope.edit = function(myClass, index) {
						$scope.Show="Hide";
						document.getElementById('myclass').style.display='block';
						editIndex = index;
						$scope.myClassModel = myClass;
						$scope.myClassModel.schoolStaffModel.schoolStaffId = $scope.myClassModel.schoolStaffModel.schoolStaffId
								.toString();
						$scope.myClassModel.schoolDivModel.schoolDivId = $scope.myClassModel.schoolDivModel.schoolDivId
								.toString();
						$scope.myClassModel.subjectModel.subjectId = 	$scope.myClassModel.subjectModel.subjectId
								.toString();
					};

					// Reset Function
					$scope.reset = function() {
						$scope.myClassModel = {};
					};
					// Check box selection
					$scope.singleSelect = function(myClassId) {
						// Get row ID
						var rowId = myClassId;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {

						
						document.getElementById('myclass').style.display = 'none';
						var getMyClassList = "" + HOST_NAME
								+ "/schooladmin/myclass/all";
						
						
						var getStaff = "" + HOST_NAME
								+ "/schooladmin/myclass/getStaff";
						
						var getClass = "" + HOST_NAME
						+ "/schooladmin/myclass/getClass";

						var getSubject = "" + HOST_NAME
								+ "/schooladmin/myclass/getSubject";
						
						$http.get(getClass).then(function(response) {
							$scope.schoolClassList = response.data;

						});
						
						$http.get(getMyClassList).then(function(response) {
							$scope.myClassList = response.data;
						

						});
						

						$http.get(getStaff).then(function(response) {
							$scope.schoolStaffList = response.data;

						});

						$http.get(getSubject).then(function(response) {
							$scope.schoolSubjectList = response.data;

						});


					};
					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else {
							var deleteLink = ""
									+ HOST_NAME
									+ "/schooladmin/myclass/myClassdeleteItems/"
									+ rows_selected + "";
								$http.get(deleteLink).then(
										function(response) {
											if (response) {
												/*$('#datatable-buttons')
														.DataTable().clear()
														.draw();
												$scope.loadAllData();*/
												$("#deleted").fadeIn(300)
														.delay(1500).fadeOut(
																400);
											} else {
												alert("Not deleted");
											}
										});
						}
					};
					// Delete Function
					$scope.deleteMyclass = function(schoolId, index) {

						var deleteLink = ""
								+ HOST_NAME
								+ "/schooladmin/myclass/myClassdeleteSingleItem/"
								+ schoolId + "";

						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.myClassList
													.splice(index, 1);
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});
						} else {
							$scope.Message = "You clicked NO.";
						}

					};

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/schooladmin/myclass/post";
						var tempMyClassID = $scope.myClassModel.myClassId;
						
						$http.post(link, $scope.myClassModel).then(
								function(response) {
									$scope.myClassModel = response.data;
									if ($scope.myClassModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										
										if (angular.isNumber(tempMyClassID)) {
											$scope.myClassList.splice(
													editIndex, 1);
										}
										$scope.myClassList
												.push($scope.myClassModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
								});

					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(
					function() {
						$scope.loadAllData();
					});
					
					//DELETE MULTIPLE ROWS
				    $scope.checkAll = function () {
				        if (!$scope.selectedAll) {
				            $scope.selectedAll = true;
				        } else {
				            $scope.selectedAll = false;
				        }
				        angular.forEach($scope.myClassList, function(myClass) {
				        	myClass.selected = $scope.selectedAll;
				        });
				    };  

				    
				    $scope.remove = function(){
				    	if ($window.confirm("Are you sure want to delete?")) { 
				        var newDataList=[];
				        $scope.selectedAll = false;
				        angular.forEach($scope.myClassList, function(selected){
				            if(!selected.selected){
				                newDataList.push(selected);
				            }else{
				            	rows_selected.push(selected.myClassId);
				            }
				        }); 
				        
				        $scope.deleteSelected();
				        $scope.myClassList = newDataList;
				    	}
				    };

				});