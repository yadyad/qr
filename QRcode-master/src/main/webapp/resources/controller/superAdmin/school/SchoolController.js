var app = angular.module('school', [ 'datatables' ]);

/* file upload start class */
app.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ]);
app.service('fileUpload', [ '$http', function($http) {
	this.uploadFileToUrl = function(file, uploadUrl) {
		var fd = new FormData();
		fd.append('file', file);
		// fd.append('tempSchoolID', tempSchoolID);
		$http.post(uploadUrl, fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function() {
			var appElement = document.querySelector('[ng-app=school]');
			var appScope = angular.element(appElement).scope();
			var controllerScope = appScope.$$childHead;
			controllerScope.loadAllData();
		}).error(function() {

		});
	}
} ]);
/* file upload end class */
app
		.controller(
				'schoolCtrl',
				function($scope, $http, $filter, $window, fileUpload) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.schoolModelList = null;
					$scope.schoolModel = null;
					$scope.managementModel = null;
					$scope.coutryList;
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "Create new school";
					// Edit Function
					$scope.edit = function(schoolPOJO, index) {
						$scope.Show = "Hide";
						document.getElementById('form-id').style.display = 'block';
						$scope.imageEdit = {};
						$scope.imageEdit = schoolPOJO.schoolLogo;
						editIndex = index;
						$scope.schoolModel = schoolPOJO;
						$scope.schoolModel.managementModel.managementID = $scope.schoolModel.managementModel.managementID
								.toString();
						/* $scope.schoolModel.schoolLogo= */
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_max_email = 254;
						var text_length = $scope.schoolModel.schoolName.length;
						var text_remaining1 = text_max - text_length;
						$('#sn')
								.html(text_remaining1 + ' characters remaining');

						$('#schooEmail').html(
								text_max_email + ' characters remaining');
						var text_length = $scope.schoolModel.email.length;
						var text_remaining1 = text_max_email - text_length;
						$('#schooEmail').html(
								text_remaining1 + ' characters remaining');

						$('#sd').html(text_max + ' characters remaining');
						var text_length = $scope.schoolModel.description.length;
						var text_remaining1 = text_max - text_length;
						$('#sd')
								.html(text_remaining1 + ' characters remaining');

						$('#ss').html(text_max + ' characters remaining');
						var text_length = $scope.schoolModel.syllabus.length;
						var text_remaining1 = text_max - text_length;
						$('#ss')
								.html(text_remaining1 + ' characters remaining');

						$('#sa').html(text_max + ' characters remaining');
						var text_length = $scope.schoolModel.address.length;
						var text_remaining1 = text_max - text_length;
						$('#sa')
								.html(text_remaining1 + ' characters remaining');

						$('#sst').html(text_max + ' characters remaining');
						var text_length = $scope.schoolModel.state.length;
						var text_remaining1 = text_max - text_length;
						$('#sst').html(
								text_remaining1 + ' characters remaining');

						$('#sdd').html(text_max + ' characters remaining');
						var text_length = $scope.schoolModel.district.length;
						var text_remaining1 = text_max - text_length;
						$('#sdd').html(
								text_remaining1 + ' characters remaining');

						$('#schooLoc').html(text_max + ' characters remaining');
						var text_length = $scope.schoolModel.location.length;
						var text_remaining1 = text_max - text_length;
						$('#schooLoc').html(
								text_remaining1 + ' characters remaining');

					}

					// Reset Function
					$scope.reset = function() {
						$scope.schoolModel = {};
						$scope.imageEdit = {};
						$('#sn').html('255 characters remaining');

						$('#sd').html('255 characters remaining');

						$('#ss').html('255 characters remaining');
						$('#sa').html('255 characters remaining');

						$('#sst').html('255 characters remaining');
						$('#sdd').html('255 characters remaining');
						$('#schooLoc').html('255 characters remaining');
						$('#schooEmail').html('254 characters remaining');
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
						document.getElementById('form-id').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/superadmin/school/bymanagement/all";
						$http
								.get(getLink)
								.then(
										function(response) {
											$scope.schoolModelList = response.data;
											$scope.managementModel = $scope.schoolModelList[0].managementModel;
										});

					};

					var getAllCountries = "http://services.groupkt.com/country/get/all";

					$http.get(getAllCountries).then(function(response) {
						$scope.coutryList = response.data;
					});

					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else {
							var deleteLink = "" + HOST_NAME
									+ "/superadmin/school/deleteItems/"
									+ rows_selected + "";
							if ($window.confirm("Are you sure want to delete?")) {
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
											} else {
												alert("Not deleted");
											}
										});
							}
						}
					};

					// TEXT FIELD LENGTH VALIDATION.....
					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_max_email = 254;
						$('#sn').html(text_max + ' characters remaining');
						$('#schooEmail').html(
								text_max_email + ' characters remaining');

						$('#sd').html(text_max + ' characters remaining');
						$('#ss').html(text_max + ' characters remaining');

						$('#sa').html(text_max + ' characters remaining');
						$('#sst').html(text_max + ' characters remaining');
						$('#sdd').html(text_max + ' characters remaining');
						$('#schooLoc').html(text_max + ' characters remaining');

						$("#schoolName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#schoolName')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#sn')
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

											$('#sd')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#syllabus")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#syllabus')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#ss')
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

											$('#sa')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#state")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#state').val().length;
											var text_remaining = text_max
													- text_length;

											$('#sst')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#district")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#district')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#sdd')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#location")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#location')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#schooLoc')
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

											$('#schooEmail')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}

					// Delete Function
					$scope.deleteSchool = function(schoolId, index) {
						var deleteLink = "" + HOST_NAME
								+ "/superadmin/school/deleteSingleItem/"
								+ schoolId + "";
						if ($window.confirm("Are you sure want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.schoolModelList.splice(
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

					$scope.hide = function() {
						if (document.getElementById('form-id').style.display == 'none') {
							document.getElementById('form-id').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('form-id').style.display = 'none';
							$scope.Show = "Create new school";
						}
					}
					/*
					 * $scope.show = function() {
					 * document.getElementById('form-id').style.display =
					 * 'block'; }
					 */
					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;
						var link = "" + HOST_NAME + "/superadmin/school/post";
						var tempSchoolID = $scope.schoolModel.schoolId;
						$http
								.post(link, $scope.schoolModel)
								.then(
										function(response) {
											$scope.schoolModel = response.data;
											if ($scope.schoolModel.schoolId == 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											} else {
												if (angular
														.isNumber(tempSchoolID)) {
													$scope.schoolModelList
															.splice(editIndex,
																	1);
												}
												$scope.schoolModelList
														.push($scope.schoolModel);
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												// file upload start
												var file = $scope.myFile;
												console.log('file is ');
												var getDropDown = ""
														+ HOST_NAME
														+ "/superadmin/school/insertImage";
												fileUpload.uploadFileToUrl(
														file, getDropDown);
												// file upload end
												$scope.imageEdit = {};
												$scope.reset();
											}
										});

					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(
							function() {
								$scope.loadAllData();
								// var getSchool = "" + HOST_NAME +
								// "/superadmin/school/listAll";
								var getDropDown = "" + HOST_NAME
										+ "/superadmin/management/dropDown";
								$http.get(getDropDown).then(function(response) {
									$scope.managementList = response.data;
								});

								$scope.textFieldLegthValidation();

							});
					// FOR SHOWING THE BROWSED IMAGES...
					function readURL(input) {
						if (input.files && input.files[0]) {
							var reader = new FileReader();
							reader.onload = function(e) {
								$('#blah').attr('src', e.target.result);
							}
							reader.readAsDataURL(input.files[0]);
						}
					}

					$("#imgInp").change(function() {
						readURL(this);
					});
				});