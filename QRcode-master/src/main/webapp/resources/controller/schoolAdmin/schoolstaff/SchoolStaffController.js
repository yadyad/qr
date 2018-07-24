var app = angular.module('schoolStaff', [ 'datatables' ]);
app
		.controller(
				'schoolStaffCtrl',
				function($scope, $http, $filter, $window) {
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.schoolStaffList = null;
					$scope.schoolStaffModel = null;
					$scope.managementModel = null;
					$scope.schoolstaff = null;
					$scope.selected = [];
					$scope.gender = [];
					var rows_selected = [];
					$scope.Show = "New";
					var gender = [];

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('staff-form').style.display == 'none') {
							document.getElementById('staff-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('staff-form').style.display = 'none';
							$scope.Show = "New";
						}
					}
					// Method to check the registered phone
					$scope.checkPhone = function() {

						var checkPhone = "" + HOST_NAME
								+ "/schooladmin/schoolStaff/isPhoneRegistered/"
								+ $scope.schoolstaff.schoolStaffModel.phone
								+ "";

						$http
								.get(checkPhone)
								.then(
										function(response) {
											if (response.data) {
												if (angular
														.isNumber($scope.schoolstaff.schoolStaffModel.schoolStaffId)) {
												} else {
													$("#phone").fadeIn(300)
															.delay(1500)
															.fadeOut(400);
													$scope.schoolstaff.schoolStaffModel.phone = "";
												}
											} else {
											}
										});

					}

					// Edit Function
					$scope.edit = function(schoolPOJO, index) {
						$scope.Show = "Hide";
						document.getElementById('staff-form').style.display = 'block';
						editIndex = index;
						$scope.schoolstaff = schoolPOJO;
						$scope.schoolstaff.schoolStaffModel.departmentModel.rowId = $scope.schoolstaff.schoolStaffModel.departmentModel.rowId
								.toString();

						$scope.schoolstaff.schoolStaffModel.designationModel.rowId = $scope.schoolstaff.schoolStaffModel.designationModel.rowId
								.toString();
						$scope.schoolstaff.schoolStaffModel.categoryModel.rowId = $scope.schoolstaff.schoolStaffModel.categoryModel.rowId
								.toString();
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_length = $scope.schoolstaff.schoolStaffModel.firstName.length;
						var text_remaining1 = text_max - text_length;
						$('#ssf').html(
								text_remaining1 + ' characters remaining');

						$('#ssl').html(text_max + ' characters remaining');
						var text_length = $scope.schoolstaff.schoolStaffModel.lastName.length;
						var text_remaining1 = text_max - text_length;
						$('#ssl').html(
								text_remaining1 + ' characters remaining');

						$('#ssq').html(text_max + ' characters remaining');
						var text_length = $scope.schoolstaff.schoolStaffModel.qualification.length;
						var text_remaining1 = text_max - text_length;
						$('#ssq').html(
								text_remaining1 + ' characters remaining');

						$('#staffemail').html(
								text_max + ' characters remaining');
						var text_length = $scope.schoolstaff.schoolStaffModel.emailId.length;
						var text_remaining1 = text_max - text_length;
						$('#staffemail').html(
								text_remaining1 + ' characters remaining');
					}

					// Reset Function
					$scope.reset = function() {
						$scope.schoolstaff = {};
						$('#ssf').html('255 characters remaining');
						$('#ssl').html('255 characters remaining');
						$('#ssq').html('255 characters remaining');
						$('#staffemail').html('254 characters remaining');
					};
					// Check box selection
					$scope.singleSelect = function(schoolId) {
						// Get row ID
						var rowId = schoolId;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						document.getElementById('staff-form').style.display = 'none';
						var getSchool = "" + HOST_NAME
								+ "/schooladmin/schoolStaff/all";

						var getDropDownDesg = "" + HOST_NAME
								+ "/schooladmin/designation/dropDown";
						var getDropDownDept = "" + HOST_NAME
								+ "/schooladmin/department/dropDown";

						var getDropDownCat = "" + HOST_NAME
								+ "/schooladmin/category/dropDownCategory";

						$http.get(getSchool).then(function(response) {
							$scope.schoolStaffList = response.data;
						});

						$http.get(getDropDownDesg).then(function(response) {
							$scope.desgList = response.data;

						});

						$http.get(getDropDownDept).then(function(response) {
							$scope.deptList = response.data;

						});

						$http.get(getDropDownCat).then(function(response) {
							$scope.categoryList = response.data;

						});

					};
					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else if ($window
								.confirm("Are you sure want to delete?")) {
							var deleteLink = "" + HOST_NAME
									+ "/schooladmin/schoolStaff/deleteItems/"
									+ rows_selected + "";
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											/*
											 * $('#datatable-buttons')
											 * .DataTable().clear() .draw();
											 * $scope.loadAllData();
											 */
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});
						}
					};
					// Delete Function
					$scope.deleteSchoolStaffs = function(schoolId, index) {
						// alert("hiii" + schoolId);

						var deleteLink = "" + HOST_NAME
								+ "/schooladmin/schoolStaff/deleteSingleItem/"
								+ schoolId + "";

						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.schoolStaffList.splice(
													index, 1);
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

					// Method for make admin from the school staff
					$scope.makeAdmin = function(loginID, index) {
						editIndex = index;
						var makeAdminLink = "" + HOST_NAME
								+ "/schooladmin/schoolStaff/makeAdmin/"
								+ loginID + "";

						if ($window.confirm("Are you sure?")) {
							$http.get(makeAdminLink).then(
									function(response) {
										if (response) {
											$scope.schoolstaff = response.data;
											if (angular.isNumber(loginID)) {
												$scope.schoolStaffList.splice(
														editIndex, 1);
											}
											$scope.schoolStaffList
													.push($scope.schoolstaff);
											$scope.loadAllData();
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});
						}
					};

					// METHOD TO SUBMIT
					$scope.submit = function() {

						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/schooladmin/schoolStaff/post";
						var tempStaffID = $scope.schoolstaff.loginId;

						$http.post(link, $scope.schoolstaff).then(
								function(response) {
									$scope.schoolstaff = response.data;
									if ($scope.schoolstaff.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempStaffID)) {
											$scope.schoolStaffList.splice(
													editIndex, 1);
										}
										$scope.schoolStaffList
												.push($scope.schoolstaff);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
								});

					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
						$scope.textFieldLegthValidation();
					});

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_max_email = 254;
						$('#ssf').html(text_max + ' characters remaining');
						$('#ssl').html(text_max + ' characters remaining');
						$('#staffemail').html(
								text_max_email + ' characters remaining');
						$('#ssq').html(text_max + ' characters remaining');

						$("#firstName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#firstName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#ssf')
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

											$('#ssl')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#emailId")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#emailId')
													.val().length;
											var text_remaining = text_max_email
													- text_length;

											$('#staffemail')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#qualification")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $(
													'#qualification').val().length;
											var text_remaining = text_max
													- text_length;

											$('#ssq')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}

					// DELETE MULTIPLE ROWS
					$scope.checkAll = function() {
						if (!$scope.selectedAll) {
							$scope.selectedAll = true;
						} else {
							$scope.selectedAll = false;
						}
						angular.forEach($scope.schoolStaffList, function(
								loginModel) {
							loginModel.selected = $scope.selectedAll;
						});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						var newDataList = [];
						$scope.selectedAll = false;
						angular
								.forEach(
										$scope.schoolStaffList,
										function(selected) {
											if (!selected.selected) {
												newDataList.push(selected);
											} else {
												rows_selected
														.push(selected.schoolStaffModel.schoolStaffId);
											}
										});

						$scope.deleteSelected();
						$scope.schoolStaffList = newDataList;
						// }
					};

				});