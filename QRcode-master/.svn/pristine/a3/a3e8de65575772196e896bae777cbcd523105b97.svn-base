var app = angular.module('subscription', [ 'datatables' ]);
app
		.controller(
				'subscriptionCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.subsciptionPlanModel = null;
					$scope.subsciptionPlanModelList = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('category-form').style.display == 'none') {
							document.getElementById('category-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('category-form').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Reset Function
					$scope.reset = function() {
						$scope.subsciptionPlanModel = {};
						$('#subs').html('50 characters remaining');
					};
					// Reset Function
					$scope.singleSelectCat = function(catID) {
						// Get row ID
						var rowId = catID;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};

					// Edit Function

					$scope.edit = function(subsciptionPlanModel, index) {
						$scope.Show = "Hide";
						document.getElementById('category-form').style.display = 'block';
						editIndex = index;
						$scope.subsciptionPlanModel = subsciptionPlanModel;
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_dep = 50;
						var text_length = $scope.subsciptionPlanModel.planName.length;
						var text_remaining1 = text_dep - text_length;
						$('#subs').html(
								text_remaining1 + ' characters remaining');

					}

					$scope.change = function(minCount) {
						if (!angular.isNumber(minCount)) {
							alert("Please enter minimum count first!")
							$scope.subsciptionPlanModel.memberCount = "";
						}
						{
							if ($scope.subsciptionPlanModel.minMemberCount > $scope.subsciptionPlanModel.memberCount) {
								alert("Maximum member count should be greater than minimum!")
								$scope.subsciptionPlanModel.memberCount = "";
							}
						}
					};

					// Delete Function
					$scope.deletePlan = function(planID, index) {
						var deleteLink = "" + HOST_NAME
								+ "/superadmin/subscription/delete/" + planID
								+ "";
						if ($window.confirm("Are you sure want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.subsciptionPlanModelList
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
						document.getElementById('category-form').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/superadmin/subscription/all";
						$http.get(getLink).then(function(response) {
							$scope.subsciptionPlanModelList = response.data;
						});
					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
						$scope.textFieldLegthValidation();
					});

					// / TEXT FIELD LENGTH VALIDATION.....

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_dep = 50;
						$('#subs').html(text_dep + ' characters remaining');

						$("#planName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#planName')
													.val().length;
											var text_remaining = text_dep
													- text_length;

											$('#subs')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}

					$scope.deleteSelectedPlans = function() {

						if ($window
								.confirm("Are you sure want to delete this subscription ?")) {
							var deleteLink = ""
									+ HOST_NAME
									+ "/superadmin/subscription/subscriptiondeleteItems/"
									+ rows_selected + "";
							$http
									.get(deleteLink)
									.then(
											function(response) {
												if (response) {
													$("#deleted").fadeIn(300)
															.delay(1500)
															.fadeOut(400);
													$scope.subsciptionPlanModelList = newDataList;
												} else {
													alert("Not deleted");
												}
											});
						}

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
										$scope.subsciptionPlanModelList,
										function(subsciptionPlanModelList1) {
											subsciptionPlanModelList1.selected = $scope.selectedAll;
										});
					};

					$scope.remove = function() {

						// if ($window.confirm("Are you sure want to delete?"))
						// {
						rows_selected = [];
						newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.subsciptionPlanModelList,
								function(selected) {
									if (!selected.selected) {
										newDataList.push(selected);
									} else {
										rows_selected.push(selected.newPlanId);
									}
								});

						if (rows_selected.length === 0) {

							alert("please select a row to delete");
						} else {
							$scope.deleteSelectedPlans();
						}

						/*
						 * $scope.deleteSelectedPlans();
						 * $scope.subsciptionPlanModelList = newDataList;
						 */
						// }
					};

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/superadmin/subscription/post";
						var tempSubID = $scope.subsciptionPlanModel.newPlanId;
						$http
								.post(link, $scope.subsciptionPlanModel)
								.then(
										function(response) {
											$scope.subsciptionPlanModel = response.data;
											if ($scope.subsciptionPlanModel.length == 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											} else {
												if (angular.isNumber(tempSubID)) {
													$scope.subsciptionPlanModelList
															.splice(editIndex,
																	1);
												}
												$scope.subsciptionPlanModelList
														.push($scope.subsciptionPlanModel);
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											}
										});

					};

				});