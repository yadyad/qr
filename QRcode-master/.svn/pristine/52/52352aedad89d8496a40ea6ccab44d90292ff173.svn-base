var app = angular.module('managementMember', [ 'datatables' ]);
app
		.controller(
				'managementMemberCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.managementMemberModel = null;
					$scope.managementMemberModelList = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Reset Function
					$scope.reset = function() {
						$scope.managementMemberModel = {};
						$('#mmf').html('255 characters remaining');

						$('#mml').html('255 characters remaining');

						$('#mgmtmemberemail').html('254 characters remaining');

					};

					$scope.hide = function() {
						if (document.getElementById('demo').style.display == 'none') {
							document.getElementById('demo').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('demo').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Method to check the registered phone
					$scope.checkPhoneMember = function() {

						var checkPhone = ""
								+ HOST_NAME
								+ "/superadmin/managementmember/alreadyMemberPhone/"
								+ $scope.managementMemberModel.phone + "";

						$http
								.get(checkPhone)
								.then(
										function(response) {
											if (response.data) {
												if (angular
														.isNumber($scope.managementMemberModel.managementMemberID)) {
												} else {
													alert("Allready registered phone number!");
													$scope.managementMemberModel.phone = "";
												}
											}
										});

					}

					// Method to check the registered email
					$scope.checkEmail = function() {

						var checkEmail = ""
								+ HOST_NAME
								+ "/superadmin/managementmember/isEmailRegistered/"
								+ $scope.managementMemberModel.email + "";

						$http
								.get(checkEmail)
								.then(
										function(response) {
											if (response.data) {
												if (angular
														.isNumber($scope.managementMemberModel.managementMemberID)) {
												} else {
													alert("Allready registered email!");
													$scope.managementMemberModel.email = "";
												}
											}
										});

					}

					// Check box selection
					// Reset Function
					$scope.singleSelect = function(managID) {
						// Get row ID
						var rowId = managID;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};

					// Edit Function

					$scope.edit = function(managementPOJO, index) {

						$scope.Show = "Hide";
						document.getElementById('demo').style.display = 'block';
						editIndex = index;
						$scope.managementMemberModel = managementPOJO;
						$scope.managementMemberModel.managementModel.managementID = $scope.managementMemberModel.managementModel.managementID
								.toString();
						$scope.managementMemberModel.managementPositionModel.positionID = $scope.managementMemberModel.managementPositionModel.positionID
								.toString();
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_max_email = 254;
						var text_length = $scope.managementMemberModel.firstName.length;
						var text_remaining1 = text_max - text_length;
						$('#mmf').html(
								text_remaining1 + ' characters remaining');

						$('#mml')
								.html(text_max_email + ' characters remaining');
						var text_length = managementMemberModel.lastName.length;
						var text_remaining1 = text_max - text_length;
						$('#mml').html(
								text_remaining1 + ' characters remaining');

						$('#mgmtmemberemail').html(
								text_max + ' characters remaining');
						var text_length = $scope.managementMemberModel.email.length;
						var text_remaining1 = text_max_email - text_length;
						$('#mgmtmemberemail').html(
								text_remaining1 + ' characters remaining');

					}

					// Method to delete the selected items
					$scope.deleteSelected = function() {
						// alert("hai")
						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else {
							var deleteLink = ""
									+ HOST_NAME
									+ "/superadmin/managementmember/deleteItems/"
									+ rows_selected + "";
							if ($window.confirm("Are you sure?")) {
								$http.get(deleteLink).then(
										function(response) {
											if (response) {
												$('#datatable-buttons')
														.DataTable().clear()
														.draw();
												$scope.loadAllData();
												$("#deleted").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												rows_selected = [];
											} else {
												alert("Not deleted");
											}
										});
							}
						}
					};

					// Delete Function
					$scope.deleteMnagement = function(managementID, index) {
						var deleteLink = ""
								+ HOST_NAME
								+ "/superadmin/managementmember/deleteSingleItem/"
								+ managementID + "";
						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.managementMemberModelList
													.splice(editIndex, 1);
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
											rows_selected = [];
										} else {
											alert("Not deleted");
										}
									});
						} else {
							$scope.Message = "You clicked NO.";
						}

					};
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {

						document.getElementById('demo').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/superadmin/managementmember/all";
						$http.get(getLink).then(function(response) {
							$scope.managementMemberModelList = response.data;
						});
						var getManagementPosition = "" + HOST_NAME
								+ "/superadmin/managementposition/dropDown";
						$http
								.get(getManagementPosition)
								.then(
										function(response) {
											$scope.managementPositionMap = response.data;
										});
						var getCurrentManagement = ""
								+ HOST_NAME
								+ "/superadmin/managementmember/currentManagement";
						$http.get(getCurrentManagement).then(
								function(response) {
									$scope.currentManagement = response.data;
								});
					};

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_email_max = 254;

						$('#mgmtmemberemail').html(
								text_email_max + ' characters remaining');

						$('#email').keyup(
								function() {
									var text_length = $('#email').val().length;
									var text_remaining = text_email_max
											- text_length;

									$('#mgmtmemberemail').html(
											text_remaining
													+ ' characters remaining');
								});

						$('#mmf').html(text_max + ' characters remaining');

						$('#firstName')
								.keyup(
										function() {
											var text_length = $('#firstName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#mmf')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$('#mml').html(text_max + ' characters remaining');

						$('#lastName')
								.keyup(
										function() {
											var text_length = $('#lastName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#mml')
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

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/superadmin/managementmember/post";
						var tempManagementID = $scope.managementMemberModel.managementMemberID;
						$http
								.post(link, $scope.managementMemberModel)
								.then(
										function(response) {
											$scope.managementMemberModel = response.data;

											/*
											 * if($scope.managementMemberModel.phone
											 * === null){ alert("Please fill all
											 * mandatory field in the required
											 * format")
											 * $scope.managementMemberModel.phone =
											 * ""; return false; }
											 */

											if ($scope.managementMemberModel.length == 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											} else {
												if (angular
														.isNumber(tempManagementID)) {
													$scope.managementMemberModelList
															.splice(editIndex,
																	1);
												}
												$scope.managementMemberModelList
														.push($scope.managementMemberModel);
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											}
										});

					};

				});