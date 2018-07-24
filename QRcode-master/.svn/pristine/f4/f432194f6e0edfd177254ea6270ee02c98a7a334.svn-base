var app = angular.module('meeting', [ 'datatables' ]);

/* file upload end class */
app
		.controller(
				'meetingCtrl',
				function($scope, $http, $filter, $window) {

					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.meetingList = null;
					$scope.meetingModel = null;
					$scope.studentList = null;
					$scope.meetingTypeMap = null;
					$scope.divisionList = null;
					$scope.selected = [];
					$scope.gender = [];
					$scope.Show = "New";
					$scope.checked = "ss";
					var meeting_selected = [];
					var staff_selected = [];
					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('kudosId').style.display == 'none') {
							document.getElementById('kudosId').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('kudosId').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Edit Function
					$scope.edit = function(meetingPOJO, index) {
						$scope.Show = "Hide";
						document.getElementById('kudosId').style.display = 'block';
						editIndex = index;
						$scope.meetingModel = meetingPOJO;
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_length = $scope.meetingModel.purpose.length;
						var text_remaining1 = text_max - text_length;
						$('#mID').html(
								text_remaining1 + ' characters remaining');

						$('#mvID').html(text_max + ' characters remaining');
						var text_length = $scope.meetingModel.venue.length;
						var text_remaining1 = text_max - text_length;
						$('#mvID').html(
								text_remaining1 + ' characters remaining');

					}

					// Reset Function
					$scope.reset = function() {
						$scope.meetingModel = {};
						$('#mID').html('255 characters remaining');
						$('#mvID').html('255 characters remaining');
					};
					// Check box selection
					$scope.selectStaffs = function(staffID) {
						// Get row ID

						var staffid = staffID;
						if (staff_selected.indexOf(staffid) !== -1) {
							staff_selected.splice(staff_selected
									.indexOf(staffid), 1);
						} else {
							staff_selected.push(staffid);
						}
					};

					$scope.singleSelect = function(memberID) {
						// Get row ID

						var memberid = memberID;
						if (meeting_selected.indexOf(memberid) !== -1) {
							meeting_selected.splice(meeting_selected
									.indexOf(memberid), 1);
						} else {
							meeting_selected.push(memberid);
						}

					};
					// Check box selection
					$scope.studentSelect = function(studentID) {
						// Get row ID
						var kuId = kudosId;
						if (rows_selected.indexOf(kuId) !== -1) {
							rows_selected
									.splice(rows_selected.indexOf(kuId), 1);
						} else {
							rows_selected.push(kuId);
						}

					};

					// Method to all data to the angular datatable
					$scope.loadAllData = function() {
						var meetingTypeLink = "" + HOST_NAME
								+ "/schooladmin/meeting/meetingTypes";
						$http.get(meetingTypeLink).then(function(response) {
							$scope.meetingTypeMap = response.data;
						});

						var divisionListLink = "" + HOST_NAME
								+ "/schooladmin/schoolDivison/divisionlistAll";
						$http.get(divisionListLink).then(function(response) {
							$scope.divisionList = response.data;
						});

						var meetingListLink = "" + HOST_NAME
								+ "/schooladmin/meeting/meetingList";
						$http.get(meetingListLink).then(function(response) {
							$scope.meetingList = response.data;
						});

					};

					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (meeting_selected.length === 0) {

							alert("please select a row to delete");
						} else if ($window
								.confirm("Are you sure want to delete?")) {
							var deleteLink = ""
									+ HOST_NAME
									+ "/schooladmin/meeting/deleteSelectedMeetings/"
									+ meeting_selected + "";

							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$('#datatable-buttons').DataTable()
													.clear().draw();
											$scope.loadAllData();
											$("#deleted").fadeIn(300).delay(
													1500).fadeOut(400);
										} else {
											alert("Not deleted");
										}
									});

						}
					};
					// Delete Function
					$scope.deleteKudosSingle = function(newsId, index) {

						var deleteLink = "" + HOST_NAME
								+ "/schooladmin/kudos/kudosdeleteSingleItem/"
								+ newsId + "";

						if ($window.confirm("Are you sure?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.kudosList.splice(index, 1);
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

						var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
						var firstDate = new Date(2008, 01, 12);
						var secondDate = new Date(2008, 01, 22);

						var diffDays = Math.round(Math
								.abs((firstDate.getTime() - secondDate
										.getTime())
										/ (oneDay)));

						var meetingTime = $scope.meetingModel.meetingTime
								.split(":");
						var meetingHours = meetingTime[0]
						var minuts = meetingTime[1].split(" ");
						if (minuts[1] == 'PM') {
							meetingHours = meetingHours + 12;
						}

						var meetingMinuts = minuts[0];
						var currentDate = new Date();
						var currentHours = currentDate.getHours();

						var meetingDate = new Date(
								$scope.meetingModel.meetingDate);

						var diffDays = Math
								.round((meetingDate.getTime() - currentDate
										.getTime())
										/ (oneDay));
						if (diffDays < 0) {

							$("#validDate").fadeIn(300).delay(1500)
									.fadeOut(400);
							// alert("Please select a valid date")
						} else {

							if (staff_selected.length === 0) {

								$("#participants").fadeIn(300).delay(1500)
										.fadeOut(400);
								// alert("please select meeting participants");
							} else {
								if (diffDays >= 0) {
									if ((diffDays == 0 && currentHours > meetingHours)) {
										$("#ValidTime").fadeIn(300).delay(1500)
												.fadeOut(400);
										// alert("Please Select a valid Time!")
									} else {

										var slectedStaffs = ""
												+ HOST_NAME
												+ "/schooladmin/meeting/selectedDivisions/"
												+ staff_selected + "";
										$http.get(slectedStaffs).then(
												function(response) {

												});
										$scope.submitted = true;
										var d = new Date(
												$scope.meetingModel.meetingDate);
										var datestring = d.getFullYear()
												+ "-"
												+ ("0" + (d.getMonth() + 1))
														.slice(-2) + "-"
												+ ("0" + d.getDate()).slice(-2);
										// alert(datestring);
										$scope.meetingModel.meetingDate = datestring;
										var link = "" + HOST_NAME
												+ "/schooladmin/meeting/post";
										var tempKudosID = $scope.meetingModel.meetingID;

										$http
												.post(link, $scope.meetingModel)
												.then(
														function(response) {
															$scope.meetingModel = response.data;
															if ($scope.meetingModel.meetingID == 0) {
																$("#duplicate")
																		.fadeIn(
																				300)
																		.delay(
																				1500)
																		.fadeOut(
																				400);
																$scope.reset();
															} else {
																if (angular
																		.isNumber(tempKudosID)) {
																	// $scope.meetingList.splice(editIndex,
																	// 1);
																}
																// $scope.meetingList.push($scope.meetingModel);
																$("#success")
																		.fadeIn(
																				300)
																		.delay(
																				1500)
																		.fadeOut(
																				400);
																// file upload
																// start

															}
															$scope
																	.loadAllData();
															$scope.reset();
														});
									}
								}
							}
						}
					};

					/*
					 * $scope.meetingAvailCheck = function() {
					 * 
					 * alert("haiii chec") var checkMeetingAvail = "" +
					 * HOST_NAME + "/schooladmin/meeting/alreadyMeeting/" +
					 * $scope.meetingModel.meetingDate +"/ "+
					 * $scope.meetingModel.meetingTime +"/"+ staff_selected +" ";
					 * 
					 * alert(checkMeetingAvail); $http .get(checkMeetingAvail)
					 * .then( function(response) { if (response.data) {
					 * alert("HAIAIAIAI") if (angular
					 * .isNumber($scope.meetingModel.meetingRequestID)) { } else {
					 * alert("Already registered phone number!");
					 * $scope.meetingModel = ""; } } else { } }); }
					 */

					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(
									function() {
										document.getElementById('kudosId').style.display = 'none';
										$scope.loadAllData();
										$scope.textFieldLegthValidation();
									});

					// / TEXT FIELD LENGTH VALIDATION.....

					$scope.textFieldLegthValidation = function() {
						var text_max = 255;
						$('#mID').html(text_max + ' characters remaining');
						$('#mvID').html(text_max + ' characters remaining');

						$("#purpose")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#purpose')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#mID')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#venue")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#venue').val().length;
											var text_remaining = text_max
													- text_length;

											$('#mvID')
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
						angular.forEach($scope.meetingList, function(
								meetingModel) {
							meetingModel.selected = $scope.selectedAll;
						});
					};

					$scope.remove = function() {
						// if ($window.confirm("Are you sure want to delete?"))
						// {
						var newDataList = [];
						$scope.selectedAll = false;
						angular.forEach($scope.meetingList, function(selected) {
							if (!selected.selected) {
								newDataList.push(selected);
							} else {
								meeting_selected
										.push(selected.meetingRequestID);
							}
						});

						$scope.deleteSelected();
						$scope.meetingList = newDataList;
						// }
					};

				});