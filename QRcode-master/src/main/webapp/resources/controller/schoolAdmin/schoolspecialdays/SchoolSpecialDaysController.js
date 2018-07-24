var app = angular.module('specialdays', [ 'datatables' ]);

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
			var appElement = document.querySelector('[ng-app=specialdays]');
			var $scope = angular.element(appElement).scope();
			$scope.loadAllData();
		}).error(function() {

		});
	}
} ]);
/* file upload end class */
app
		.controller(
				'specialdaysCtrl',
				function($scope, $http, $filter, $window, fileUpload) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.specialDaysList = null;
					$scope.specialDaysModel = null;
					$scope.selected = [];
					$scope.Show = "New";
					$scope.gender = [];
					var rows_selected = [];

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('specialdays-form1').style.display == 'none') {
							document.getElementById('specialdays-form1').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('specialdays-form1').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Edit Function
					$scope.edit = function(specialDaysPOJO, index) {
						$scope.Show = "Hide";
						document.getElementById('specialdays-form1').style.display = 'block';
						editIndex = index;
						$scope.specialDaysModel = specialDaysPOJO;
						$scope.imageEdit = {};
						$scope.imageEdit = specialDaysPOJO.imageUrl;

						var d = new Date($scope.specialDaysModel.eventDate);
						var datestring = ("0" + (d.getMonth() + 1)).slice(-2)
								+ "/" + ("0" + d.getDate()).slice(-2) + "/"
								+ d.getFullYear();
						$scope.specialDaysModel.eventDate = datestring;
						$scope.textFieldLegthValidationOnEdit();
					};
					
					
					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_length = $scope.specialDaysModel.eventName.length;
						var text_remaining1 = text_max - text_length;
						$('#eventID').html(text_remaining1 + ' characters remaining');

						$('#eventDesc').html(text_max + ' characters remaining');
						var text_length = $scope.specialDaysModel.eventDesc.length;
						var text_remaining1 = text_max - text_length;
						$('#eventDesc').html(text_remaining1 + ' characters remaining');

					}

					// Reset Function
					$scope.reset = function() {
						$scope.specialDaysModel = {};
						angular.element("input[type='file']").val(null);
						$scope.imageEdit = '';
						$('#eventID').html('255 characters remaining');
						$('#eventDesc').html('255 characters remaining');

					};
					// Check box selection
					$scope.singleSelect = function(specialDaysId) {
						// Get row ID
						var spclId = specialDaysId;
						if (rows_selected.indexOf(spclId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(spclId),
									1);
						} else {
							rows_selected.push(spclId);
						}

					};

					// Method to all data to the angular datatable
					$scope.loadAllData = function() {

						var getSpclList = "" + HOST_NAME
								+ "/schooladmin/specialdays/listAll";
						$http.get(getSpclList).then(function(response) {
							$scope.specialDaysList = response.data;

						});
					};

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
							}).error(function() {

							});
						}
					} ]);
					/* file upload end class */

					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else if ($window
								.confirm("Are you sure want to delete?")) {
							var deleteLink = ""
									+ HOST_NAME
									+ "/schooladmin/specialdays/spcldeleteItems/"
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
					// Delete Function
					$scope.deleteSpclSingle = function(spclId, index) {

						var deleteLink = ""
								+ HOST_NAME
								+ "/schooladmin/specialdays/spcldeleteSingleItem/"
								+ spclId + "";

						if ($window.confirm("Are you sure you want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.specialDaysList.splice(
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

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;

						var link = "" + HOST_NAME
								+ "/schooladmin/specialdays/post";
						var tempSpclID = $scope.specialDaysModel.specialDayId;
						var d = new Date($scope.specialDaysModel.eventDate);
						var datestring = d.getFullYear() + "-"
								+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
								+ ("0" + d.getDate()).slice(-2);
						$scope.specialDaysModel.eventDate = datestring;
						$http
								.post(link, $scope.specialDaysModel)
								.then(
										function(response) {
											$scope.specialDaysModel = response.data;
											if ($scope.specialDaysModel.length == 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											} else {
												if (angular
														.isNumber(tempSpclID)) {
													$scope.specialDaysList
															.splice(editIndex,
																	1);
												}
												$scope.specialDaysList
														.push($scope.specialDaysModel);
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												// file upload start
												var file = $scope.myFile;
												console.log('file is ');

												var getDropDown = ""
														+ HOST_NAME
														+ "/schooladmin/specialdays/insertSpclDayImage";
												// alert(getDropDown);
												fileUpload.uploadFileToUrl(
														file, getDropDown);
												// file upload end
												$scope.imageEdit = {};
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.reset();
											}
										});

					};

					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(
									function() {
										document
												.getElementById('specialdays-form1').style.display = 'none';
										$scope.loadAllData();
										$scope.textFieldLegthValidation();
									});

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						$('#eventID').html(text_max + ' characters remaining');
						$('#eventDesc').html(text_max + ' characters remaining');

						$("#eventName").bind(
								'propertychange change click keyup input paste',
								function(e) {
									var text_length = $('#eventName').val().length;
									var text_remaining = text_max - text_length;

									$('#eventID')
											.html(text_remaining + ' characters remaining');
								});

						$("#eventDescs").bind(
								'propertychange change click keyup input paste',
								function(e) {
									var text_length = $('#eventDescs').val().length;
									var text_remaining = text_max - text_length;

									$('#eventDesc').html(
											text_remaining + ' characters remaining');
								});

					}

					// DELETE MULTIPLE ROWS
					$scope.checkAll = function() {
						if (!$scope.selectedAll) {
							$scope.selectedAll = true;
						} else {
							$scope.selectedAll = false;
						}
						angular.forEach($scope.specialDaysList, function(
								specialDays) {
							specialDays.selected = $scope.selectedAll;
						});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						var newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.specialDaysList, function(
								selected) {
							if (!selected.selected) {
								newDataList.push(selected);
							} else {
								rows_selected.push(selected.specialDayId);
							}
						});

						$scope.deleteSelected();
						$scope.specialDaysList = newDataList;
						// }
					};

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