var app = angular.module('managementPosition', [ 'datatables' ]);
app
		.controller(
				'managementPostionCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.managementPositionModel = null;
					$scope.managementPositionModelList = [];
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('mp-form').style.display == 'none') {
							document.getElementById('mp-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('mp-form').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Reset Function
					$scope.reset = function() {
						$scope.managementPositionModel = {};
						$('#mp').html('50 characters remaining');

						$('#md').html('255 characters remaining');
					};
					// Reset Function
					$scope.singleSelect = function(mgmtPId) {
						// Get row ID
						var rowId = mgmtPId;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};

					// Edit Function

					$scope.edit = function(mgmtModel, index) {
						$scope.Show = "Hide";
						document.getElementById('mp-form').style.display = 'block';
						editIndex = index;
						$scope.managementPositionModel = mgmtModel;
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_mp = 50;
						var text_length = $scope.managementPositionModel.position.length;
						var text_remaining1 = text_mp - text_length;
						$('#mp')
								.html(text_remaining1 + ' characters remaining');

						$('#md').html(text_max + ' characters remaining');
						var text_length = $scope.managementPositionModel.description.length;
						var text_remaining1 = text_max - text_length;
						$('#md')
								.html(text_remaining1 + ' characters remaining');
					}

					$scope.deleteSelected = function() {

						if ($window
								.confirm("Are you sure want to delete this management position?")) {
							var deleteLink = ""
									+ HOST_NAME
									+ "/superadmin/managementposition/deleteItems/"
									+ rows_selected + "";
							$http
									.get(deleteLink)
									.then(
											function(response) {
												if (response) {
													$("#deleted").fadeIn(300)
															.delay(1500)
															.fadeOut(400);
													$scope.managementPositionModelList = newDataList;
												} else {
													alert("Not deleted");
												}
											});
						}

					};

					// Delete Function
					$scope.deletemgmt = function(mgmtID, index) {
						var deleteLink = ""
								+ HOST_NAME
								+ "/superadmin/managementposition/deleteSingleItem/"
								+ mgmtID + "";
						if ($window.confirm("Are you sure want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.managementPositionModelList
													.splice(index, 1);
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});
						}

					};
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						document.getElementById('mp-form').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/superadmin/managementposition/all";
						$http.get(getLink).then(function(response) {
							$scope.managementPositionModelList = response.data;
						});
					};

					// DELETE MULTIPLE ROWS
					$scope.checkAll = function() {
						if (!$scope.selectedAll) {
							$scope.selectedAll = true;
						} else {
							$scope.selectedAll = false;
						}
						angular
								.forEach(
										$scope.managementPositionModelList,
										function(managementPositionModelList1) {
											managementPositionModelList1.selected = $scope.selectedAll;
										});
					};

					$scope.remove = function() {
					//	if ($window.confirm("Are you sure want to delete?")) {
						rows_selected = [];
						newDataList = [];
							$scope.selectedAll = false;
							angular.forEach($scope.managementPositionModelList,
									function(selected) {
										if (!selected.selected) {
											newDataList.push(selected);
										} else {
											rows_selected
													.push(selected.positionID);
										}
									});
							if (rows_selected.length === 0) {

								alert("please select a row to delete");
							} else {
								$scope.deleteSelected();
							}

							/*
							 * $scope.deleteSelected();
							 * $scope.managementPositionModelList = newDataList;
							 */
						//}
					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
						$scope.textFieldLegthValidation();
					});

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_mp = 50;
						$('#mp').html(text_mp + ' characters remaining');
						$('#md').html(text_max + ' characters remaining');

						$("#position")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#position')
													.val().length;
											var text_remaining = text_mp
													- text_length;

											$('#mp')
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

											$('#md')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}
					// METHOD TO SUBMIT
					$scope.submit = function() {

						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/superadmin/managementposition/post";
						var tempMgmtID = $scope.managementPositionModel.positionID;
						$http
								.post(link, $scope.managementPositionModel)
								.then(
										function(response) {
											$scope.managementPositionModel = response.data;
											if ($scope.managementPositionModel.length == 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											} else {
												if (angular
														.isNumber(tempMgmtID)) {
													$scope.managementPositionModelList
															.splice(editIndex,
																	1);
												}
												$scope.managementPositionModelList
														.push($scope.managementPositionModel);
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											}
										});

					};

				});