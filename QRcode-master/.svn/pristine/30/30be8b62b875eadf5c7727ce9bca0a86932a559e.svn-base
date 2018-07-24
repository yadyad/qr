var app = angular.module('driverDetails', [ 'datatables' ]);
app
		.controller(
				'driverDetailsCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.driverRouteModel = null;
					$scope.driverRouteModelList = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];

					$scope.Show = "New";
					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('driver-form').style.display == 'none') {
							document.getElementById('driver-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('driver-form').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Reset Function
					$scope.reset = function() {

						$scope.driverRouteModel = {};
						$('#fr').html('255 characters remaining');
						$('#tr').html('255 characters remaining');
						$('#rd').html('255 characters remaining');

					};

					// Edit Function

					$scope.edit = function(driver, index) {
						$scope.Show = "Hide";
						document.getElementById('driver-form').style.display = 'block';
						editIndex = index;
						$scope.driverRouteModel = driver;
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_length = $scope.driverRouteModel.routeFrom.length;
						var text_remaining1 = text_max - text_length;
						$('#fr')
								.html(text_remaining1 + ' characters remaining');

						$('#tr').html(text_max + ' characters remaining');
						var text_length = $scope.driverRouteModel.routeTo.length;
						var text_remaining1 = text_max - text_length;
						$('#tr')
								.html(text_remaining1 + ' characters remaining');

						$('#rd').html(text_max + ' characters remaining');
						var text_length = $scope.driverRouteModel.routeDesc.length;
						var text_remaining1 = text_max - text_length;
						$('#rd')
								.html(text_remaining1 + ' characters remaining');

					}

					$scope.deleteDriver = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else if ($window
								.confirm("Are you sure want to delete?")) {
							var deleteLink = ""
									+ HOST_NAME
									+ "/schooladmin/driverroutes/driverdeleteItems/"
									+ rows_selected + "";
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
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

						document.getElementById('driver-form').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/schooladmin/driverroutes/all";
						$http.get(getLink).then(function(response) {
							$scope.driverRouteModelList = response.data;
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
						$('#fr').html(text_max + ' characters remaining');
						$('#tr').html(text_max + ' characters remaining');
						$('#rd').html(text_max + ' characters remaining');

						$("#routeFrom")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#routeFrom')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#fr')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#routeTo")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#routeTo')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#tr')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#routeDesc")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#routeDesc')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#rd')
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
										$scope.driverRouteModelList,
										function(driverRouteModelList1) {
											driverRouteModelList1.selected = $scope.selectedAll;
										});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						var newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.driverRouteModelList, function(
								selected) {
							if (!selected.selected) {
								newDataList.push(selected);
							} else {
								rows_selected.push(selected.rowId);
							}
						});

						$scope.deleteDriver();
						$scope.driverRouteModelList = newDataList;
						// }
					};
					// same routes checking
					$scope.checkSameRoutes = function() {
						if ($scope.driverRouteModel.routeFrom == $scope.driverRouteModel.routeTo) {

							$("#routes").fadeIn(300).delay(1500).fadeOut(400);
							// alert("Routes can't be same");
							$scope.driverRouteModel.routeTo = "";
						}
					}

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/schooladmin/driverroutes/post";
						var tempDeptID = $scope.driverRouteModel.driverRouteID;
						$http.post(link, $scope.driverRouteModel).then(
								function(response) {
									$scope.driverRouteModel = response.data;

									if ($scope.driverRouteModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempDeptID)) {
											$scope.driverRouteModelList.splice(
													editIndex, 1);
										}
										$scope.driverRouteModelList
												.push($scope.driverRouteModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
								});

					};

				});