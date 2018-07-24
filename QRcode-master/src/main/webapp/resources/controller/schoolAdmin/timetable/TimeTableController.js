var app = angular.module('timetable', [ 'datatables' ]);
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
			
		}).error(function() {
		});
	}
} ]);
/* file upload end class */
app
		.controller(
				'timetableCtrl',
				function($scope, $http, $filter, $window, fileUpload) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.timeTableList = [];
					$scope.timeTableModel = null;
					$scope.divisionList = [];
					$scope.selected = [];
					$scope.gender = [];
					var rows_selected = [];
					$scope.filename;
					$scope.Show = "Show";
					
					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('schoolnewsId').style.display == 'none') {
							document.getElementById('schoolnewsId').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('schoolnewsId').style.display = 'none';
							$scope.Show = "Show";
						}
					}
					/*
					 * $scope.show = function() {
					 * document.getElementById('schoolnewsId').style.display =
					 * 'block'; }
					 */

					// Edit Function
					$scope.edit = function(timeTable, index) {

						$scope.Show = "Hide";
						document.getElementById('schoolnewsId').style.display = 'block';
						editIndex = index;
						$scope.timeTableModel = timeTable;
						$scope.timeTableModel.schoolDivModel.schoolDivId = $scope.timeTableModel.schoolDivModel.schoolDivId
								.toString();
						$scope.imageEdit = {};
						$scope.imageEdit = timeTable.imageURL;

					};

					// Reset Function
					$scope.reset = function() {
						$scope.timeTableModel = {};
						angular.element("input[type='file']").val(null);
						$scope.imageEdit = '';

					};
					// Check box selection
					$scope.singleSelect = function(schoolId) {
						// Get row ID
						var NewsId = schoolId;
						if (rows_selected.indexOf(NewsId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(NewsId),
									1);
						} else {
							rows_selected.push(NewsId);
						}

					};

					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						document.getElementById('schoolnewsId').style.display = 'none';
						var getDropDownDivision = "" + HOST_NAME
								+ "/schooladmin/schoolDivison/divdropDown";

						$http.get(getDropDownDivision).then(function(response) {
							$scope.divisionList = response.data;

						});
						var getSchoolList = "" + HOST_NAME
								+ "/schooladmin/timetable/timetableList";

						$http.get(getSchoolList).then(function(response) {
							$scope.timeTableList = response.data;

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
						} else {
							var deleteLink = "" + HOST_NAME
									+ "/schooladmin/timetable/timetabledeleteItems/"
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
											} else {
												alert("Not deleted");
											}
										});
							}
						}
					};
					// Delete Function
					$scope.deleteTimeTable = function(timeTableID, index) {

						var deleteLink = "" + HOST_NAME
								+ "/schooladmin/timetable/deleteTimeTable/"
								+ timeTableID + "";
						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.timeTableList.splice(index,
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

					
					
					
					// DELETE MULTIPLE ROWS
					$scope.checkAll = function() {
						if (!$scope.selectedAll) {
							$scope.selectedAll = true;
						} else {
							$scope.selectedAll = false;
						}
						angular
								.forEach(
										$scope.timeTableList,
										function(timeTableList1) {
											timeTableList1.selected = $scope.selectedAll;
										});
					};

					$scope.remove = function() {
						//if ($window.confirm("Are you sure want to delete?")) {
							var newDataList = [];
							$scope.selectedAll = false;
							angular.forEach($scope.timeTableList,
									function(selected) {
										if (!selected.selected) {
											newDataList.push(selected);
										} else {
											rows_selected.push(selected.timeTableID);
										}
									});

							$scope.deleteSelected();
							$scope.timeTableList = newDataList;
						//}
					};
					
					
					
					// METHOD TO SUBMIT
					$scope.submit = function() {
						if($scope.myFile.type=="application/pdf"){
						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/schooladmin/timetable/post";
						var timeTableID = $scope.timeTableModel.timeTableID;
						$http
								.post(link, $scope.timeTableModel)
								.then(
										function(response) {
											$scope.timeTableModel = response.data;
											/*var x=response.data.imageURL;
											alert(x)*/
											if ($scope.timeTableModel.length === 0) {
												$("#duplicate").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												// $scope.imageEdit = {};
												$scope.reset();
												// $scope.loadAllData();
											} else {
												if (angular
														.isNumber(timeTableID)) {

													$scope.timeTableList
															.splice(editIndex,
																	1);
												}

												$scope.timeTableList
														.push($scope.timeTableModel);
												//alert(JSON.stringify($scope.timeTableModel.imageURL))
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);
												// file upload start
												var file = $scope.myFile;
												console.log('file is ' +file);
												
												var getDropDown = ""
														+ HOST_NAME
														+ "/schooladmin/timetable/insertImage";
												fileUpload.uploadFileToUrl(
														file, getDropDown);
												//alert(JSON.stringify($scope.timeTableModel.imageURL))
												// file upload end
												$scope.imageEdit = {};
												$("#success").fadeIn(300)
														.delay(1500).fadeOut(
																400);

												$scope.reset();
											}
										});
						}else{
							
							$("#pdf").fadeIn(300)
							.delay(1500).fadeOut(
									400);
							//alert("Choose a valid file!")
						}
					};

					// ANGULAR READY FUNCTION
					angular.element(document).ready(function() {
						// alert("hai")
						$scope.loadAllData();

					});

					/*
					 * // ANGULAR READY FUNCTION
					 * angular.element(document).ready(
					 * 
					 * function() {
					 * 
					 * 
					 * var getDropDownDivision = "" + HOST_NAME +
					 * "/schooladmin/schoolDivison/divdropDown";
					 * 
					 * $http .get(getDropDownDivision) .then( function(response) {
					 * $scope.divisionList = response.data;
					 * 
					 * });
					 * 
					 * document.getElementById('schoolnewsId').style.display =
					 * 'none'; var getSchoolList = "" + HOST_NAME +
					 * "/schooladmin/timetable/timetableList";
					 * 
					 * $http .get(getSchoolList) .then( function(response) {
					 * $scope.timeTableList = response.data;
					 * 
					 * });
					 * 
					 * 
					 * });
					 */

					/*// FILE UPLOAD VLAIDATIOON
					$scope.uploadValidation = function(timeTableModel) {
						//alert($scope.timeTableModel)
						
						 * alert(timeTableModel) var myString =
						 * timeTableModel.imageURL;
						 * alert(myString.substring(myString.lastIndexOf("/")+1))
						 * $scope.extension="pdf";
						 

						var uploadExt = "" + HOST_NAME
								+ "/schooladmin/timetable/fileValidation";

						$http.post(uploadExt).then(function(response) {
							
							$scope.timeTableModel = response.data;
							alert(response.data)
							// $scope.extension= response.data;
							// alert(JSON.stringify($scope.extension))
						});
					}*/

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