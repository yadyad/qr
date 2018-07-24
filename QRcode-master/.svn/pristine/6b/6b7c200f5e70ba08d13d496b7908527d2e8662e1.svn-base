var app = angular.module('schoolNews', [ 'datatables' ]);
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
			var appElement = document.querySelector('[ng-app=schoolNews]');
			var $scope = angular.element(appElement).scope();
			$scope.loadAllData();
		}).error(function() {

		});
	}
} ]);
/* file upload end class */
app
		.controller(
				'schoolNewsCtrl',
				function($scope, $http, $filter, $window, fileUpload) {
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					var tempNews;
					$scope.schoolNewsList = null;
					$scope.schoolNewsDivModel = null;
					$scope.selected = [];
					$scope.gender = [];
					var rows_selected = [];
					var tempNewsList;
					$scope.Show = "New";
					var editIndex;

					// Method for show and hide the form
					$scope.hide = function() {

						if (document.getElementById('schoolnewsId').style.display == 'none') {
							document.getElementById('schoolnewsId').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('schoolnewsId').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Edit Function
					$scope.edit = function(schoolPOJO, index) {
						$scope.Show = "Hide";
						document.getElementById('schoolnewsId').style.display = 'block'
						editIndex = index;
						$scope.schoolNewsDivModel = schoolPOJO;

						$scope.imageEdit = {};
						$scope.imageEdit = schoolPOJO.newsImage;
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_length = $scope.schoolNewsDivModel.news.length;
						var text_remaining1 = text_max - text_length;
						$('#newsID').html(
								text_remaining1 + ' characters remaining');

						$('#newsDesc').html(text_max + ' characters remaining');
						var text_length = $scope.schoolNewsDivModel.description.length;
						var text_remaining1 = text_max - text_length;
						$('#newsDesc').html(
								text_remaining1 + ' characters remaining');

					}

					// Reset Function
					$scope.reset = function() {
						$scope.schoolNewsDivModel = {};
						angular.element("input[type='file']").val(null);
						$scope.imageEdit = '';
						$('#newsID').html('255 characters remaining');
						$('#newsDesc').html('255 characters remaining');
					};
					
					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						document.getElementById('schoolnewsId').style.display = 'none';
						var getSchoolList = "" + HOST_NAME
								+ "/schooladmin/news/newslistAll";
						// alert(getDropDownDept)
						$http.get(getSchoolList).then(function(response) {
							$scope.schoolNewsList = response.data;
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
							var deleteLink = "" + HOST_NAME
									+ "/schooladmin/news/newsdeleteItems/"
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
					$scope.deleteSchoolnews = function(newsId, index) {

						var deleteLink = "" + HOST_NAME
								+ "/schooladmin/news/newsdeleteSingleItem/"
								+ newsId + "";

						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.schoolNewsList.splice(index,
													1);
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

						var link = "" + HOST_NAME + "/schooladmin/news/post";
						// alert(JSON.stringify($scope.schoolDivModel))
						var tempStaffID = $scope.schoolNewsDivModel.newsId;
						// alert(tempStaffID)
						// alert(JSON.stringify($scope.schoolDivModel))

						$http
								.post(link, $scope.schoolNewsDivModel)
								.then(
										function(response) {
											;
											$scope.schoolNewsDivModel = response.data;
											if ($scope.schoolNewsDivModel.length == 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												$scope.schoolNewsList = {};
												var getSchoolList = ""
														+ HOST_NAME
														+ "/schooladmin/news/newslistAll";
												$http
														.get(getSchoolList)
														.then(
																function(
																		response) {
																	$scope.schoolNewsList = response.data;
																});
												$scope.reset();

											} else {
												/*
												 * if
												 * (angular.isNumber(tempStaffID)) {
												 * $scope.schoolNewsList.splice(
												 * editIndex, 1); }
												 * $scope.schoolNewsList
												 * .push($scope.schoolNewsDivModel);
												 */
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												// file upload start
												var file = $scope.myFile;
												console.log('file is ');

												var getDropDown = ""
														+ HOST_NAME
														+ "/schooladmin/news/insertImage";
												fileUpload.uploadFileToUrl(
														file, getDropDown);
												// file upload end
												$scope.imageEdit = {};
												/*
												 * $("#success").fadeIn(300)
												 * .delay(1500).fadeOut( 400);
												 */
												$scope.reset();
												// $scope.loadAllData();
											}
										});

					};

					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(

									function() {

										document.getElementById('schoolnewsId').style.display = 'none';
										var getSchoolList = ""
												+ HOST_NAME
												+ "/schooladmin/news/newslistAll";

										$http
												.get(getSchoolList)
												.then(
														function(response) {
															$scope.schoolNewsList = response.data;
															tempNewsList = $scope.schoolNewsList;

														});
										$scope.textFieldLegthValidation();
									});

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						$('#newsID').html(text_max + ' characters remaining');
						$('#newsDesc').html(text_max + ' characters remaining');
					

						$("#news")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#news')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#newsID')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#newsdesc")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#newsdesc')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#newsDesc')
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
						angular.forEach($scope.schoolNewsList, function(
								schoolNewsLi) {
							schoolNewsLi.selected = $scope.selectedAll;
						});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						var newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.schoolNewsList, function(
								selected) {
							if (!selected.selected) {
								newDataList.push(selected);
							} else {
								rows_selected.push(selected.newsId);
							}
						});

						$scope.deleteSelected();
						$scope.schoolNewsList = newDataList;
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