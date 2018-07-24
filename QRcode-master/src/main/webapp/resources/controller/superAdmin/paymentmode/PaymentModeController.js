var app = angular.module('paymentMode', [ 'datatables' ]);
app
		.controller(
				'paymentModeCtrl',
				function($scope, $http, $filter, $window) {

					// Global Declarations...
					var editIndex;
					var url = window.location.href;
					var arr = url.split("/");
					var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
					$scope.paymentModeModel = null;
					$scope.paymentModeModelList = null;
					$scope.answers = [];
					$scope.selected = [];
					var rows_selected = [];
					$scope.Show = "New";

					// Method for show and hide the form
					$scope.hide = function() {
						if (document.getElementById('payment-mode-form').style.display == 'none') {
							document.getElementById('payment-mode-form').style.display = 'block';
							$scope.Show = "Hide";
						} else {
							document.getElementById('payment-mode-form').style.display = 'none';
							$scope.Show = "New";
						}
					}

					// Reset Function
					$scope.reset = function() {
						$scope.paymentModeModel = {};
						$('#pm').html('50 characters remaining');
						$('#pd').html('255 characters remaining');
					};
					// Reset Function
					$scope.singleSelectPayment = function(payID) {
						// Get row ID
						var rowId = payID;
						if (rows_selected.indexOf(rowId) !== -1) {
							rows_selected.splice(rows_selected.indexOf(rowId),
									1);
						} else {
							rows_selected.push(rowId);
						}

					};

					// Edit Function

					$scope.edit = function(payModel, index) {
						$scope.Show = "Hide";
						document.getElementById('payment-mode-form').style.display = 'block';
						editIndex = index;
						$scope.paymentModeModel = payModel;
						$scope.textFieldLegthValidationOnEdit();
					};

					$scope.textFieldLegthValidationOnEdit = function() {

						var text_max = 255;
						var text_dep = 50;
						var text_length = $scope.paymentModeModel.paymentType.length;
						var text_remaining1 = text_dep - text_length;
						$('#pm')
								.html(text_remaining1 + ' characters remaining');

						$('#pd').html(text_max + ' characters remaining');
						var text_length = $scope.paymentModeModel.paymentDesc.length;
						var text_remaining1 = text_max - text_length;
						$('#pd')
								.html(text_remaining1 + ' characters remaining');

					}

					$scope.deleteSelectedPay = function() {

						if (rows_selected.length === 0) {
							alert("please select a row to delete");
						} else {
							var deleteLink = "" + HOST_NAME
									+ "/superadmin/paymentmode/paydeleteItems/"
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
												rows_selected = [];
											} else {
												alert("Not deleted");
											}
										});
							}
						}
					};

					// Delete Function
					$scope.deletePayment = function(paymentID, index) {
						var deleteLink = ""
								+ HOST_NAME
								+ "/superadmin/paymentmode/paydeleteSingleItem/"
								+ paymentID + "";
						if ($window.confirm("Are you sure want to delete?")) {
							$http.get(deleteLink).then(
									function(response) {
										if (response) {
											$scope.paymentModeModelList.splice(
													index, 1);
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
						document.getElementById('payment-mode-form').style.display = 'none';
						var getLink = "" + HOST_NAME
								+ "/superadmin/paymentmode/all";
						$http.get(getLink).then(function(response) {
							$scope.paymentModeModelList = response.data;
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
						var text_dep = 50;
						$('#pm').html(text_dep + ' characters remaining');
						$('#pd').html(text_max + ' characters remaining');

						$("#paymentType")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#paymentType')
													.val().length;
											var text_remaining = text_dep
													- text_length;

											$('#pm')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

						$("#paymentDesc")
								.bind(
										'propertychange change click keyup input paste',
										function(e) {
											var text_length = $('#paymentDesc')
													.val().length;
											var text_remaining = text_max
													- text_length;

											$('#pd')
													.html(
															text_remaining
																	+ ' characters remaining');
										});

					}

					// METHOD TO SUBMIT
					$scope.submit = function() {
						$scope.submitted = true;
						var link = "" + HOST_NAME
								+ "/superadmin/paymentmode/post";
						var tempPaymentID = $scope.paymentModeModel.paymentModeId;
						$http.post(link, $scope.paymentModeModel).then(
								function(response) {
									$scope.paymentModeModel = response.data;
									if ($scope.paymentModeModel.length == 0) {
										$("#duplicate").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									} else {
										if (angular.isNumber(tempPaymentID)) {
											$scope.paymentModeModelList.splice(
													editIndex, 1);
										}
										$scope.paymentModeModelList
												.push($scope.paymentModeModel);
										$("#success").fadeIn(300).delay(1500)
												.fadeOut(400);
										$scope.reset();
									}
								});

					};

				});