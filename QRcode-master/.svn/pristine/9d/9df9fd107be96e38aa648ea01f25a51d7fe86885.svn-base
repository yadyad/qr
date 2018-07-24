var app = angular.module('student', [ 'datatables' ]);

app
		.controller(
				'studentCtrl',
				function($scope, $http, $filter, $window) {
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.studentList = null;
					$scope.studentModel = null;
					$scope.divisionList = null;
					$scope.selected = [];
					$scope.gender = [];
					$scope.Show="Show";
					var rows_selected = [];
					var gender = [];
					$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

					// Method for show and hide the form
					$scope.hide = function() {
						if(document.getElementById('student-form').style.display=='none'){
							document.getElementById('student-form').style.display='block';
							$scope.Show="Hide";
						}else{
							document.getElementById('student-form').style.display='none';
							$scope.Show="Show";
						}
					}
					// Method to check the enrollment number
					$scope.checkEnrollment = function() {
						var checkEnrollment = "" + HOST_NAME
								+ "/schooladmin/student/isEnrollmentNum/"
								+ $scope.studentModel.enrollmentNumber + "";
						$http
								.get(checkEnrollment)
								.then(
										function(response) {
											if (response.data) {
												if (angular
														.isNumber($scope.studentModel.enrollmentNumber)) {
												} else {
													alert("Allready registered Enrollment number!");
													$scope.studentModel.enrollmentNumber = "";
												}
											}
										});
					}

					// Edit Function
					$scope.edit = function(studentPOJO, index) {
						$scope.Show="Hide";
						document.getElementById('student-form').style.display = 'block';
						editIndex = index;
						$scope.studentModel = studentPOJO;
						var d = new Date($scope.studentModel.dob);
						var datestring = ("0" + (d.getMonth() + 1)).slice(-2)
								+ "/" + ("0" + d.getDate()).slice(-2) + "/"
								+ d.getFullYear();
						$scope.studentModel.dob = datestring;
						$scope.studentModel.schoolDivModel.schoolDivId = $scope.studentModel.schoolDivModel.schoolDivId
								.toString();

						$scope.studentModel.bloodGroup = $scope.studentModel.bloodGroup
								.toString();
						$scope.textFieldLegthValidationOnEdit();

					};
					
					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_max_email = 254;
						var text_length = $scope.studentModel.firstName.length;
						var text_remaining1 = text_max - text_length;
						$('#studF').html(
								text_remaining1 + ' characters remaining');

						$('#studL').html(text_max + ' characters remaining');
						var text_length = $scope.studentModel.lastName.length;
						var text_remaining1 = text_max - text_length;
						$('#studL').html(
								text_remaining1 + ' characters remaining');

						$('#studFather').html(
								text_max + ' characters remaining');
						var text_length = $scope.studentModel.fatherName.length;
						var text_remaining1 = text_max - text_length;
						$('#studFather').html(
								text_remaining1 + ' characters remaining');

						$('#studE').html(text_max + ' characters remaining');
						var text_length = $scope.studentModel.enrollmentNumber.length;
						var text_remaining1 = text_max - text_length;
						$('#studE').html(
								text_remaining1 + ' characters remaining');

						$('#studnetdemail').html(
								text_max + ' characters remaining');
						var text_length = $scope.studentModel.email.length;
						var text_remaining1 = text_max - text_length;
						$('#studnetdemail').html(
								text_remaining1 + ' characters remaining');
					}

					// Reset Function
					$scope.reset = function() {
						$scope.studentModel = {};
						$('#studF').html('255 characters remaining');
						$('#studL').html('255 characters remaining');
						$('#studFather').html('255 characters remaining');
						$('#studnetdemail').html('254 characters remaining');
						$('#studE').html('255 characters remaining');
					};
					// Check box selection
					$scope.singleSelect = function(studentId) {
						// Get row ID
						var rowId = studentId;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};

					
					

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_max_email = 254;
						$('#studF').html(text_max + ' characters remaining');
						$('#studL').html(text_max + ' characters remaining');
						$('#studnetdemail').html(
								text_max_email + ' characters remaining');
						$('#studFather').html(
								text_max + ' characters remaining');
						$('#studE').html(text_max + ' characters remaining');

						$("#firstName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#firstName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#studF')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#lastName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#lastName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#studL')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#fatherName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#fatherName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#studFather')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#enrollmentNumber")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $(
													'#enrollmentNumber').val().length;
											var text_remaining = text_max
													- text_length;

											$('#studE')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#email")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#email').val().length;
											var text_remaining = text_max
													- text_length;

											$('#studnetdemail')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}
					
					
					
					
					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else  if ($window
								.confirm("Are you sure want to delete?")){
							var deleteLink = "" + HOST_NAME
									+ "/schooladmin/student/deleteItems/"
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
					$scope.deleteStudent = function(studentId, index) {
						// alert("hiii" + schoolId);

						var deleteLink = "" + HOST_NAME
								+ "/schooladmin/student/deleteSingleItem/"
								+ studentId + "";

						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink)
									.then(
											function(response) {
												if (response) {
													$scope.studentList.splice(
															index, 1);
													$("#deleted").fadeIn(300)
															.delay(1500)
															.fadeOut(400);
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

						var link = "" + HOST_NAME + "/schooladmin/student/post";
						var tempStudentID = $scope.studentModel.studentId;
						// alert(tempStudentID)
						var d = new Date($scope.studentModel.dob);
						var datestring = d.getFullYear() + "-"
								+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
								+ ("0" + d.getDate()).slice(-2);
						// alert(datestring);
						$scope.studentModel.dob = datestring;
						// alert(JSON.stringify($scope.studentModel));
						$http.post(link, $scope.studentModel).then(
								function(response) {
									$scope.studentModel = response.data;
									if($scope.studentModel.firstName!="Limit exceed"){
									if ($scope.studentModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempStudentID)) {
											$scope.studentList.splice(
													editIndex, 1);
										}
										$scope.studentList
												.push($scope.studentModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
									}else{
										$scope.reset();
										$("#limitExceed").fadeIn(300).delay(1500)
										.fadeOut(400);
									}
								});

					};

					// ANGULAR READY FUNCTION

					angular
							.element(document)
							.ready(
									function() {
										$scope.hide();
									
										var getStudent = "" + HOST_NAME
												+ "/schooladmin/student/all";

										var getDropDownDivision = ""
												+ HOST_NAME
												+ "/schooladmin/schoolDivison/divdropDown";

										// alert(getDropDownDept)
										/*
										 * var standard =
										 * $scope.studentModel.schoolDivModel.standard;
										 */
										$scope.textFieldLegthValidation();
										var getBloodGroups = ""
												+ HOST_NAME
												+ "/schooladmin/student/dropDownBloodGroup";

										$http
												.get(getBloodGroups)
												.then(
														function(response) {
															$scope.bloodGroupsList = response.data;

														});

										$http
												.get(getStudent)
												.then(
														function(response) {
															$scope.studentList = response.data;

														});

										$http
												.get(getDropDownDivision)
												.then(
														function(response) {
															$scope.divisionList = response.data;

														});

									});
					
					//DELETE MULTIPLE ROWS
				    $scope.checkAll = function () {
				        if (!$scope.selectedAll) {
				            $scope.selectedAll = true;
				        } else {
				            $scope.selectedAll = false;
				        }
				        angular.forEach($scope.studentList, function(studentList1) {
				        	studentList1.selected = $scope.selectedAll;
				        });
				    };  

				    
				    $scope.remove = function(){
				    	//if ($window.confirm("Are you sure want to delete?")) { 
				        var newDataList=[];
				        $scope.selectedAll = false;
				        angular.forEach($scope.studentList, function(selected){
				            if(!selected.selected){
				                newDataList.push(selected);
				            }else{
				            	rows_selected.push(selected.studentId);
				            }
				        }); 
				        
				        $scope.deleteSelected();
				        $scope.studentList = newDataList;
				    	//}
				    };

				});