var app = angular.module('management', [ 'datatables' ]);
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
		var succ;
		var fd = new FormData();
		fd.append('file', file);
		// fd.append('tempSchoolID', tempSchoolID);
		$http.post(uploadUrl, fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(response) {
			var appElement = document.querySelector('[ng-app=management]');
			var appScope = angular.element(appElement).scope();
			var controllerScope = appScope.$$childHead;
			controllerScope.loadAllData();

		}).error(function() {
		});
	}
} ]);
app
		.controller(
				'managementCtrl',
				function($scope, $http, $filter, $window, fileUpload) {

					// Global Declarations...
					var editIndex;

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.managementModel = null;
					$scope.managementModelList = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.coutryList;
					$scope.stateList;
					$scope.Show = "New";
					// $scope.phoneNumbmgmt = /^\+?\d{2}[- ]?\d{5}[- ]?\d{5}$/;
					$scope.onlyNumbers = /^\d+$/;

					// Reset Function
					$scope.reset = function() {
						$scope.managementModel = {};
						angular.element("input[type='file']").val(null);
						$scope.imageEdit = '';
						$('#mn').html('255 characters remaining');

						$('#mgmtemail').html('254 characters remaining');

						$('#mh').html('255 characters remaining');
						$('#st').html('255 characters remaining');

						$('#dt').html('255 characters remaining');
						$('#lc').html('255 characters remaining');
					};

					// $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('form-id').style.display == 'none') {
							document.getElementById('form-id').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('form-id').style.display = 'none';
							$scope.Show = "New";
						}
					}
					/*
					 * $scope.show = function() {
					 * document.getElementById('form-id').style.display =
					 * 'block'; }
					 */
					// //////////////////////////////////////////////
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

					// Method to check the registered phone
					$scope.checkPhone = function() {
						var checkPhone = "" + HOST_NAME
								+ "/superadmin/management/isPhoneRegistered/"
								+ $scope.managementModel.phone + "";
						$http
								.get(checkPhone)
								.then(
										function(response) {
											if (response.data) {
												if (angular
														.isNumber($scope.managementModel.managementID)) {
												} else {
													// alert("Allready
													// registered phone
													// number!");

													$("#alreadyPhone").fadeIn(
															300).delay(1500)
															.fadeOut(400);
													$scope.managementModel.phone = "";
												}
											}
										});

					}

					// Method to check the registered email
					$scope.checkEmail = function() {
						var checkEmail = "" + HOST_NAME
								+ "/superadmin/management/isEmailRegistered";

						// $scope.emailModel.emailID=$scope.managementModel.emailID;
						$http
								.post(checkEmail, $scope.managementModel)
								.then(
										function(response) {
											if (response.data) {

												if (angular
														.isNumber($scope.managementModel.managementID)) {
												} else {
													// alert("Allready
													// registered email!");
													$("#alreadyMail").fadeIn(
															300).delay(1500)
															.fadeOut(400)
													$scope.managementModel.emailID = "";
												}
											}
										});

					}

					// Edit Function

					$scope.edit = function(managementPOJO, index) {
						
						
						//if (type == 'undefined') {
							$scope.Show = "Hide";
							document.getElementById('form-id').style.display = 'block';
							editIndex = index;
							$scope.managementModel = managementPOJO;
							
							/* var str=managementModel.imageURL;
							 var lst = str.substr(str.lastIndexOf('/')+1);
//							 $scope.imageEdit = lst;
							 $scope.posterModel.fileUrl = lst;*/
							
							$scope.imageEdit = {};
							$scope.imageEdit = managementPOJO.imageURL;
						//}
						//alert($scope.myFile)
						$scope.Show = "Hide";
						document.getElementById('form-id').style.display = 'block';
						editIndex = index;
						$scope.managementModel = managementPOJO;
						
						/* var str=managementModel.imageURL;
						 var lst = str.substr(str.lastIndexOf('/')+1);
//						 $scope.imageEdit = lst;
						 $scope.posterModel.fileUrl = lst;*/
						
						$scope.imageEdit = {};
						$scope.imageEdit = managementPOJO.imageURL;
						
						
						
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.deleteSelected = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else {
							var deleteLink = "" + HOST_NAME
									+ "/superadmin/management/deleteItems/"
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
						var deleteLink = "" + HOST_NAME
								+ "/superadmin/management/deleteSingleItem/"
								+ managementID + "";
						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.managementModelList.splice(
													index, 1);
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});
						}

					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_max_email = 254;
						var text_length = $scope.managementModel.managementName.length;
						var text_remaining1 = text_max - text_length;
						$('#mn')
								.html(text_remaining1 + ' characters remaining');

						$('#mgmtemail').html(
								text_max_email + ' characters remaining');
						var text_length = $scope.managementModel.emailID.length;
						var text_remaining1 = text_max_email - text_length;
						$('#mgmtemail').html(
								text_remaining1 + ' characters remaining');

						$('#mh').html(text_max + ' characters remaining');
						var text_length = $scope.managementModel.managementHead.length;
						var text_remaining1 = text_max - text_length;
						$('#mh')
								.html(text_remaining1 + ' characters remaining');

						$('#st').html(text_max + ' characters remaining');
						var text_length = $scope.managementModel.state.length;
						var text_remaining1 = text_max - text_length;
						$('#st')
								.html(text_remaining1 + ' characters remaining');

						$('#lc').html(text_max + ' characters remaining');
						var text_length = $scope.managementModel.location.length;
						var text_remaining1 = text_max - text_length;
						$('#lc')
								.html(text_remaining1 + ' characters remaining');

					}

					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						document.getElementById('form-id').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/superadmin/management/all";
						$http.get(getLink).then(function(response) {
							$scope.managementModelList = response.data;
						});

						var getAllCountries = "http://services.groupkt.com/country/get/all";

						$http.get(getAllCountries).then(function(response) {
							$scope.coutryList = response.data;
						});
					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						$scope.loadAllData();
						$scope.textFieldLegthValidation();

					});

					// TEXT FIELD LENGTH VALIDATION.....
					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						var text_max_email = 254;
						$('#mn').html(text_max + ' characters remaining');
						$('#mgmtemail').html(
								text_max_email + ' characters remaining');

						$('#mh').html(text_max + ' characters remaining');
						$('#st').html(text_max + ' characters remaining');

						$('#dt').html(text_max + ' characters remaining');
						$('#lc').html(text_max + ' characters remaining');

						$("#managementName")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $(
													'#managementName').val().length;
											var text_remaining = text_max
													- text_length;

											$('#mn')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#managementHead")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $(
													'#managementHead').val().length;
											var text_remaining = text_max
													- text_length;

											$('#mh')
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

											$('#mgmtemail')
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

											$('#st')
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

											$('#dt')
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

											$('#lc')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}

					// METHOD TO SUBMIT	
					$scope.submit = function() {

					/*	if ($scope.myFile.type == "image/png"
								|| $scope.myFile.type == "image/jpg"
								|| $scope.myFile.type == "image/jpeg") {
*/
							$scope.submitted = true;
							var link = "" + HOST_NAME
									+ "/superadmin/management/post";
							var tempManagementID = $scope.managementModel.managementID;
							/* if($scope.checkSpaces()){ */
							$http
									.post(link, $scope.managementModel)
									.then(
											function(response) {
												$scope.managementModel = response.data;
												
												
												
												if ($scope.managementModel.length == 0) {
													$("#duplicate").fadeIn(300)
															.delay(1500)
															.fadeOut(400);
													$scope.managementModelList = {};
													var getLink = ""
															+ HOST_NAME
															+ "/superadmin/management/all";
													$http
															.get(getLink)
															.then(
																	function(
																			response) {
																		$scope.managementModelList = response.data;
																	});
													$scope.reset();
												} else {
													if (angular
															.isNumber(tempManagementID)) {
														$scope.managementModelList
																.splice(
																		editIndex,
																		1);
													}
													$scope.managementModelList
															.push($scope.managementModel);
													$("#success").fadeIn(300)
															.delay(1500)
															.fadeOut(400);
													var file = $scope.myFile;
													console.log('file is ');
													var fileUploadLink = ""
															+ HOST_NAME
															+ "/superadmin/management/insertImage";
													var s = fileUpload
															.uploadFileToUrl(
																	file,
																	fileUploadLink);
													// file upload end
													$scope.imageEdit = {};
													$scope.reset();
												}
												// }

											});
						/*} else {
							$("#imgFile").fadeIn(300).delay(1500).fadeOut(400);
							// $scope.imgreset();
						}*/
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