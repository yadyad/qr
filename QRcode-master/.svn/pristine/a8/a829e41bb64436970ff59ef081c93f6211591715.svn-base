var app = angular.module('designation', [ 'datatables' ]);
app
		.controller(
				'designationCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.designationModel = null;
					$scope.designationModelList = null;
					$scope.designation = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('design-form').style.display == 'none') {
							document.getElementById('design-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('design-form').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Reset Function
					$scope.reset = function() {
						$scope.designationModel = {};
						$('#desc').html('50 characters remaining');
						$('#desgdesc').html('255 characters remaining');
					};
					// Reset Function
					$scope.singleSelect = function(desigId) {
						// Get row ID
						var rowId = desigId;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};

					// Edit Function

					$scope.edit = function(desgnModel, index) {
						$scope.Show = "Hide";
						document.getElementById('design-form').style.display = 'block';
						editIndex = index;
						$scope.designationModel = desgnModel;

						$scope.designationModel.departmentModel.rowId = $scope.designationModel.departmentModel.rowId
								.toString();
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_dep = 50;
						var text_length = $scope.designationModel.designation.length;
						var text_remaining1 = text_dep - text_length;
						$('#desc').html(
								text_remaining1 + ' characters remaining');

						$('#desgdesc').html(text_max + ' characters remaining');
						var text_length = $scope.designationModel.description.length;
						var text_remaining1 = text_max - text_length;
						$('#desgdesc').html(
								text_remaining1 + ' characters remaining');

					}

					$scope.deleteSelected = function() {

						if ($window.confirm("Are you sure want to delete this designation?")) {
							var deleteLink = "" + HOST_NAME
									+ "/superadmin/designation/deleteItems/" + rows_selected
									+ "";
							$http.get(deleteLink).then(function(response) {
								if (response) {
									$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
									$scope.designationModelList = newDataList;
								} else {
									alert("Not deleted");
								}
							});
						}
						
						
						
					};

					// Delete Function
					$scope.deleteDept = function(desgId, index) {
						var deleteLink = "" + HOST_NAME
								+ "/superadmin/designation/deleteSingleItem/"
								+ desgId + "";
						if ($window.confirm("Are you sure want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.designationModelList.splice(
													index, 1);
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});
						}

					};
					// Method to all data to the angular datatable
					/*
					 * $scope.loadAllData = function() { alert("hi"); };
					 */
					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(
									function() {
										document.getElementById('design-form').style.display = 'none';
										var getLink = "" + HOST_NAME
												+ "/superadmin/designation/all";
										$http
												.get(getLink)
												.then(
														function(response) {
															$scope.designationModelList = response.data;

														});
										$scope.textFieldLegthValidation();
									});

					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						document.getElementById('design-form').style.display = 'none';
						var getDesgnation = "" + HOST_NAME
								+ "/superadmin/designation/all";
						var getDropDown = "" + HOST_NAME
								+ "/superadmin/department/dropDown";
						$http.get(getDropDown).then(function(response) {
							$scope.deptList = response.data;

						});
						$http.get(getDesgnation).then(function(response) {
							$scope.designation = response.data;

						});

					};

					// / TEXT FIELD LENGTH VALIDATION.....

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_dep = 50;
						$('#desc').html(text_dep + ' characters remaining');
						$('#desgdesc').html(text_max + ' characters remaining');

						$("#designation")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#designation')
													.val().length;
											var text_remaining = text_dep
													- text_length;

											$('#desc')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#description")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#description')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#desgdesc')
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
						angular
								.forEach(
										$scope.designationModelList,
										function(designationModelList1) {
											designationModelList1.selected = $scope.selectedAll;
										});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						rows_selected = [];
						newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.designationModelList, function(
								selected) {
							if (!selected.selected) {
								newDataList.push(selected);
							} else {
								rows_selected.push(selected.rowId);
							}
						});
						if (rows_selected.length === 0) {

							alert("please select a row to delete");
						} else {
							$scope.deleteSelected();
						}
						// alert("ROWS" + rows_selected)

						// $scope.designationModelList = newDataList;
						// }
					};

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/superadmin/designation/post";
						var tempDesgID = $scope.designationModel.rowId;
						$http.post(link, $scope.designationModel).then(
								function(response) {
									$scope.designationModel = response.data;
									if ($scope.designationModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempDesgID)) {
											$scope.designationModelList.splice(
													editIndex, 1);
										}
										$scope.designationModelList
												.push($scope.designationModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
								});

					};

					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(
									function() {
										document.getElementById('design-form').style.display = 'none';
										var getDesgnation = "" + HOST_NAME
												+ "/superadmin/designation/all";
										var getDropDown = ""
												+ HOST_NAME
												+ "/superadmin/department/dropDown";

										$http
												.get(getDropDown)
												.then(
														function(response) {
															$scope.deptList = response.data;

														});
										$http
												.get(getDesgnation)
												.then(
														function(response) {
															$scope.designation = response.data;

														});

									});

				});