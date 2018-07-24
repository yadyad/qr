var app = angular.module('driverProfile', [ 'datatables' ]);
app
		.controller(
				'driverProfileCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.driverDetailsModel = null;
					$scope.driverDetailsModelList = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('driver-profile-form').style.display == 'none') {
							document.getElementById('driver-profile-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('driver-profile-form').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Reset Function
					$scope.reset = function() {

						$scope.driverDetailsModel = {};
						$('#dn').html('255 characters remaining');
						$('#de').html('254 characters remaining');
						$('#fr').html('255 characters remaining');
						$('#lno').html('255 characters remaining');
						$('#rd').html('254 characters remaining');

					};

					// Edit Function

					$scope.edit = function(driverProfile, index) {
						$scope.Show = "Hide";
						document.getElementById('driver-profile-form').style.display = 'block';
						editIndex = index;
						$scope.driverDetailsModel = driverProfile;
						$scope.driverDetailsModel.driverRoutesModel.driverRouteID = $scope.driverDetailsModel.driverRoutesModel.driverRouteID
								.toString();
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_max_email = 255;
						var text_length = $scope.driverDetailsModel.driverName.length;
						var text_remaining1 = text_max - text_length;
						$('#dn')
								.html(text_remaining1 + ' characters remaining');

						$('#de').html(text_max + ' characters remaining');
						var text_length = $scope.driverDetailsModel.email.length;
						var text_remaining1 = text_max_email - text_length;
						$('#de')
								.html(text_remaining1 + ' characters remaining');

						$('#fr').html(text_max + ' characters remaining');
						var text_length = $scope.driverDetailsModel.busNumber.length;
						var text_remaining1 = text_max - text_length;
						$('#fr')
								.html(text_remaining1 + ' characters remaining');

						$('#lno').html(text_max + ' characters remaining');
						var text_length = $scope.driverDetailsModel.licenseNumber.length;
						var text_remaining1 = text_max - text_length;
						$('#lno').html(
								text_remaining1 + ' characters remaining');

						$('#rd').html(text_max + ' characters remaining');
						var text_length = $scope.driverDetailsModel.address.length;
						var text_remaining1 = text_max - text_length;
						$('#rd')
								.html(text_remaining1 + ' characters remaining');

					}

					$scope.deleteDriverProfile = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else if ($window
								.confirm("Are you sure want to delete?")) {
							var deleteLink = ""
									+ HOST_NAME
									+ "/schooladmin/driverdetails/driverdetailsdeleteItems/"
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

					$scope.load = function() {
						var getLink = "" + HOST_NAME
								+ "/schooladmin/driverdetails/all";
						$http.get(getLink).then(function(response) {
							$scope.driverDetailsModelList = response.data;
						});
						var getRoutes = "" + HOST_NAME
								+ "/schooladmin/driverdetails/dropDownRoute";
						$http.get(getRoutes).then(function(response) {
							$scope.driverRouteList = response.data;
						});
					}

					// Method to all data to the angular datatable
					$scope.loadAllData = function() {

						document.getElementById('driver-profile-form').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/schooladmin/driverdetails/all";
						$http.get(getLink).then(function(response) {
							$scope.driverDetailsModelList = response.data;
						});
						var getRoutes = "" + HOST_NAME
								+ "/schooladmin/driverdetails/dropDownRoute";
						$http.get(getRoutes).then(function(response) {
							$scope.driverRouteList = response.data;
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
						$('#dn').html(text_max + ' characters remaining');
						$('#de').html(text_max_email + ' characters remaining');
						$('#fr').html(text_max + ' characters remaining');
						$('#lno').html(text_max + ' characters remaining');

						$('#rd').html(text_max + ' characters remaining');

						$("#driverName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#driverName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#dn')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#email")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#email').val().length;
											var text_remaining = text_max_email
													- text_length;

											$('#de')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#busNumber")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#busNumber')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#fr')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#licenseNumber")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#licenseNumber').val().length;
											var text_remaining = text_max
													- text_length;

											$('#lno')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#address")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#address')
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
										$scope.driverDetailsModelList,
										function(driverDetailsModelList1) {
											driverDetailsModelList1.selected = $scope.selectedAll;
										});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						var newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.driverDetailsModelList,
								function(selected) {
									if (!selected.selected) {
										newDataList.push(selected);
									} else {
										rows_selected.push(selected.driverID);
									}
								});

						$scope.deleteDriverProfile();
						$scope.driverDetailsModelList = newDataList;
						// }
					};

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/schooladmin/driverdetails/post";
						var tempDeptID = $scope.driverDetailsModel.driverID;
						$http
								.post(link, $scope.driverDetailsModel)
								.then(
										function(response) {
											$scope.driverDetailsModel = response.data;

											if ($scope.driverDetailsModel.length === 0) {

												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
												$scope.load();

											} else {
												if (angular
														.isNumber(tempDeptID)) {
													$scope.driverDetailsModelList
															.splice(editIndex,
																	1);
												}
												$scope.driverDetailsModelList
														.push($scope.driverDetailsModel);
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											}
										});

					};

				});