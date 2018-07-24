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
					$scope.meetingTypeMap = null;
					$scope.divisionList = null;
					$scope.subjectList = null;
					$scope.Show="New";
					var meeting_selected = [];
					var staff_selected = [];
					var subject_selected = [];
					 $scope.meetingType;
					// Method for show and hide the form
					$scope.hide = function() {
						if(document.getElementById('kudosId').style.display=='none'){
							document.getElementById('kudosId').style.display='block';
							$scope.Show="Hide";
						}else{
							document.getElementById('kudosId').style.display='none';
							$scope.Show="New";
						}
					}
					
					$scope.getmeetingType=function(meetingType){
						if(meetingType=="Teaching"){
							$scope.meetingType="T";
							document.getElementById('category').style.display = 'block';
							document.getElementById('category1').style.display = 'block';
						}else{
							document.getElementById('category').style.display = 'none';
							document.getElementById('category1').style.display = 'none';
							$scope.meetingType="N";
						}
					
					}


					// Reset Function
					$scope.reset = function() {
						$scope.meetingModel = {};
						$('#mpmpID').html('255 characters remaining');
						$('#mvpID').html('255 characters remaining');
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
					
					$scope.selectSubjects= function(subjectID) {
						// Get row ID

						var subjectID = subjectID;
						if (subject_selected.indexOf(subjectID) !== -1) {
							subject_selected.splice(subject_selected
									.indexOf(subjectID), 1);
						} else {
							subject_selected.push(subjectID);
						}
						alert(subject_selected);
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
								+ "/schooladmin/principalmeeting/meetingTypes";
						$http.get(meetingTypeLink).then(function(response) {
							$scope.meetingTypeMap = response.data;
						});
						
						var divisionListLink = "" + HOST_NAME
						+ "/schooladmin/schoolDivison/divisionlistAll";
							$http.get(divisionListLink).then(function(response) {
									$scope.divisionList = response.data;
								});
						
						var meetingListLink = "" + HOST_NAME
								+ "/schooladmin/principalmeeting/meetingList";
						$http.get(meetingListLink).then(function(response) {
							$scope.meetingList = response.data;
						});
						
						var subjectLink = "" + HOST_NAME
						+ "/android/subject/all";
						$http.get(subjectLink).then(function(response) {
							$scope.subjectList = response.data;
						});

					};

					/* file upload end class */

					// METHOD FOR DELETE MULTIPLE ROWS
					$scope.deleteSelected = function() {

						if (meeting_selected.length === 0) {
							alert("please select a row to delete");
						} else if ($window.confirm("Are you sure want to delete?"))  {
							var deleteLink = ""
									+ HOST_NAME
									+ "/schooladmin/principalmeeting/deleteSelectedMeetings/"
									+ meeting_selected + "";
								$http.get(deleteLink).then(
										function(response) {
											if (response) {
											/*	$('#datatable-buttons')
														.DataTable().clear()
														.draw();
												$scope.loadAllData();*/
												$("#deleted").fadeIn(300)
														.delay(1500).fadeOut(
																400);
											} else {
												alert("Not deleted");
											}
										});
						}
					
					};
				
					// METHOD TO SUBMIT
					$scope.submit = function() {
						
						var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
						var firstDate = new Date(2008,01,12);
						var secondDate = new Date(2008,01,22);

						var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
						
						
						var meetingTime = $scope.meetingModel.meetingTime
								.split(":");
						var meetingHours = meetingTime[0]
						var minuts = meetingTime[1].split(" ");
						if (minuts[1] == 'PM') {
							meetingHours = meetingHours + 12;
						} 
						
						var meetingMinuts=minuts[0];
						var currentDate = new Date();
						var currentHours = currentDate.getHours();
						
						var meetingDate=new Date($scope.meetingModel.meetingDate);
						
						var diffDays = Math.round((meetingDate.getTime() - currentDate.getTime())/(oneDay));
						if (diffDays<0) {
							alert("Please select a valid date")
						} else {

							if ((staff_selected.length ==0 && subject_selected.length==0) && $scope.meetingType=="T" ) {
								alert("please select subject or division!");
							} else {
								if(diffDays>=0){
									if((diffDays==0 && currentHours>meetingHours)){
										alert("Please Select a valid Time!")
									}else{
							
								var slectedStaffs = "" + HOST_NAME
										+ "/schooladmin/principalmeeting/selectedDivisions/"
										+ staff_selected + "";
								$http.get(slectedStaffs).then(
										function(response) {

										});
								
								var selectedSubjects = "" + HOST_NAME
								+ "/schooladmin/principalmeeting/selectedSubjects/"
								+ subject_selected + "";
										$http.get(selectedSubjects).then(
								function(response) {

								});
								$scope.submitted = true;
								var d = new Date(
										$scope.meetingModel.meetingDate);
								var datestring = d.getFullYear() + "-"
										+ ("0" + (d.getMonth() + 1)).slice(-2)
										+ "-" + ("0" + d.getDate()).slice(-2);
								// alert(datestring);
								$scope.meetingModel.meetingDate = datestring;
								var link = "" + HOST_NAME
										+ "/schooladmin/principalmeeting/post";
								var tempKudosID = $scope.meetingModel.meetingID;

								$http
										.post(link, $scope.meetingModel)
										.then(
												function(response) {
													$scope.meetingModel = response.data;
													if ($scope.meetingModel.meetingID == 0) {
														$("#duplicate").fadeIn(
																300)
																.delay(1500)
																.fadeOut(400);
														$scope.reset();
													} else {
														if (angular
																.isNumber(tempKudosID)) {
															// $scope.meetingList.splice(editIndex,
															// 1);
														}
														// $scope.meetingList.push($scope.meetingModel);
														$("#success").fadeIn(
																300)
																.delay(1500)
																.fadeOut(400);
														// file upload start

													}
													$scope.loadAllData();
													$scope.reset();
												});
									}
								}
							}
						}
					};

					// ANGULAR READY FUNCTION
					angular
							.element(document)
							.ready(
									function() {
										document.getElementById('kudosId').style.display = 'none';
										$scope.loadAllData();
										$scope.textFieldLegthValidation();
									});
					
					
					
					$scope.textFieldLegthValidation=function(){
						   var text_max = 255;
						    $('#mpmpID').html(text_max + ' characters remaining');

						    $('#purposIDe').keyup(function() {
						        var text_length = $('#purposIDe').val().length;
						        var text_remaining = text_max - text_length;

						        $('#mpmpID').html(text_remaining + ' characters remaining');
						    });
						    
						    $('#mvpID').html(text_max + ' characters remaining');

						    $('#venue').keyup(function() {
						        var text_length = $('#venue').val().length;
						        var text_remaining = text_max - text_length;

						        $('#mvpID').html(text_remaining + ' characters remaining');
						    });
					}
					
					
					//DELETE MULTIPLE ROWS
				    $scope.checkAll = function () {
				        if (!$scope.selectedAll) {
				            $scope.selectedAll = true;
				        } else {
				            $scope.selectedAll = false;
				        }
				        angular.forEach($scope.meetingList, function(meetingModel) {
				        	meetingModel.selected = $scope.selectedAll;
				        });
				    };  

				    
				    $scope.remove = function(){
				    	//if ($window.confirm("Are you sure want to delete?")) { 
				        var newDataList=[];
				        $scope.selectedAll = false;
				        angular.forEach($scope.meetingList, function(selected){
				            if(!selected.selected){
				                newDataList.push(selected);
				            }else{
				            	meeting_selected.push(selected.meetingRequestID);
				            }
				        }); 
				        
				        $scope.deleteSelected();
				        $scope.meetingList = newDataList;
				    	//}
				    };

				});