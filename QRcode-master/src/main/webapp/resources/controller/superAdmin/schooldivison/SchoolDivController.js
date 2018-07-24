var app = angular.module('schoolDivision', [ 'datatables' ]);
app
		.controller(
				'schoolDivCtrl',
				function($scope, $http, $filter, $window) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.schoolDivList = null;
					$scope.schoolDivModel = null;
					$scope.selected = [];
					$scope.gender = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('schooldivId').style.display == 'none') {
							document.getElementById('schooldivId').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('schooldivId').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Edit Function
					$scope.edit = function(schoolPOJO, index) {
						$scope.Show = "Hide";
						document.getElementById('schooldivId').style.display = 'block';
						editIndex = index;
						$scope.schoolDivModel = schoolPOJO;
						$scope.schoolDivModel.schoolStaffModel.schoolStaffId = $scope.schoolDivModel.schoolStaffModel.schoolStaffId
								.toString();
						$scope.schoolDivModel.coschoolStaffModel.schoolStaffId = $scope.schoolDivModel.coschoolStaffModel.schoolStaffId
								.toString();
						$scope.schoolDivModel.schoolModel.schoolId = $scope.schoolDivModel.schoolModel.schoolId
								.toString();
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 50;
						var text_length = $scope.schoolDivModel.division.length;
						var text_remaining1 = text_max - text_length;
						$('#schoolDiv').html(
								text_remaining1 + ' characters remaining');

					}

					// Reset Function
					$scope.reset = function() {
						$scope.schoolDivModel = {};
						$('#schoolDiv').html('50 characters remaining');
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

						document.getElementById('schooldivId').style.display = 'none';
						var getSchoolList = "" + HOST_NAME
								+ "/superadmin/schoolDivison/divisionlistAll";
						var getSchool = "" + HOST_NAME
								+ "/superadmin/schoolDivison/dropDown";

						var getDropDownTeach = "" + HOST_NAME
								+ "/superadmin/schoolDivison/dropDowntecher";
						var getDropDownCoteach = "" + HOST_NAME
								+ "/superadmin/schoolDivison/dropDowntecherco";

						$http.get(getSchoolList).then(function(response) {
							$scope.divisionList = response.data;

						});

						$http.get(getSchool).then(function(response) {
							$scope.divList = response.data;

						});

						$http.get(getDropDownTeach).then(function(response) {
							$scope.teacherList = response.data;

						});

						$http.get(getDropDownCoteach).then(function(response) {
							$scope.schoolDivcoTeachList = response.data;

						});

					};
					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else {
							var deleteLink = ""
									+ HOST_NAME
									+ "/superadmin/schoolDivison/divisiondeleteItems/"
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
					$scope.deleteSchoolDiv = function(schoolId, index) {
						// alert("hiii" + schoolId);

						var deleteLink = ""
								+ HOST_NAME
								+ "/superadmin/schoolDivison/divisiondeleteSingleItem/"
								+ schoolId + "";

						if ($window.confirm("Are you sure want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.divisionList
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

					// DELETE MULTIPLE ROWS
					$scope.checkAll = function() {
						if (!$scope.selectedAll) {
							$scope.selectedAll = true;
						} else {
							$scope.selectedAll = false;
						}
						angular.forEach($scope.divisionList, function(
								schoolDivList) {
							schoolDivList.selected = $scope.selectedAll;
						});
					};

					$scope.remove = function() {
						if ($window.confirm("Are you sure want to delete?")) {
							var newDataList = [];
							$scope.selectedAll = false;
							angular.forEach($scope.divisionList, function(
									selected) {
								if (!selected.selected) {
									newDataList.push(selected);
								} else {
									rows_selected.push(selected.schoolDivId);
								}
							});
							$scope.deleteSelected();
							$scope.divisionList = newDataList;
						}
					};

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/superadmin/schoolDivison/post";
						// alert(JSON.stringify($scope.schoolDivModel))
						var tempStaffID = $scope.schoolDivModel.schoolDivId;
						// alert(tempStaffID)
						// alert(JSON.stringify($scope.schoolDivModel))
						$http.post(link, $scope.schoolDivModel).then(
								function(response) {
									$scope.schoolDivModel = response.data;
									if ($scope.schoolDivModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempStaffID)) {
											$scope.divisionList.splice(
													editIndex, 1);
										}
										$scope.divisionList
												.push($scope.schoolDivModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
								});

					};

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 50;
						$('#schoolDiv')
								.html(text_max + ' characters remaining');

						$("#division")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#division')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#schoolDiv')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
						$scope.textFieldLegthValidation();

					});

				});