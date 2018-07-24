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
		}).error(function() {

		});
	}
} ]);
/* file upload end class */
app.controller('specialdaysCtrl', function($scope, $http, $filter, $window,
		fileUpload) {

	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.specialDaysList = null;
	$scope.specialDaysModel = null;
	$scope.selected = [];
	$scope.gender = [];
	var rows_selected = [];

	// Method for show and hide the form
	$scope.hide = function() {
		document.getElementById('specialdays-form').style.display = 'none';
	}
	$scope.show = function() {
		document.getElementById('specialdays-form').style.display = 'block';
	}

	// Edit Function
	$scope.edit = function(specialDaysPOJO, index) {
		 document.getElementById('specialdays-form').style.display = 'block';
		
			
		$scope.imageEdit = {};
		$scope.imageEdit = specialDaysPOJO.imageUrl;
		editIndex = index;
		$scope.specialDaysModel = specialDaysPOJO;
		 var d = new Date($scope.specialDaysModel.eventDate);
			var datestring = ("0" + (d.getMonth() + 1)).slice(-2)
					+ "/" + ("0" + d.getDate()).slice(-2) + "/"
					+ d.getFullYear();
			$scope.specialDaysModel.eventDate = datestring;
		
	};

	// Reset Function
	$scope.reset = function() {
		$scope.specialDaysModel = {};
	};
	// Check box selection
	$scope.singleSelect = function(specialDaysId) {
		// Get row ID
		var spclId = specialDaysId;
		if (rows_selected.indexOf(spclId) !== -1) {
			rows_selected.splice(rows_selected.indexOf(spclId), 1);
		} else {
			rows_selected.push(spclId);
		}

	};
	
	
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {

		var getSpclList = "" + HOST_NAME + "/superadmin/specialdays/listAll";
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
		} else {
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/specialdays/spcldeleteItems/" + rows_selected
					+ "";
			if ($window.confirm("Are you sure you want to delete?")) {
				$http.get(deleteLink).then(function(response) {
					if (response) {
						$('#datatable-buttons').DataTable().clear().draw();
						$scope.loadAllData();
						$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
					} else {
						alert("Not deleted");
					}
				});
			}
		}
	};
	// Delete Function
	$scope.deleteSpclSingle = function(spclId, index) {

		var deleteLink = "" + HOST_NAME
				+ "/superadmin/specialdays/spcldeleteSingleItem/" + spclId + "";

		if ($window.confirm("Are you sure you want to delete?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.specialDaysList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
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

		var link = "" + HOST_NAME + "/superadmin/specialdays/post";
		var tempSpclID = $scope.specialDaysModel.specialDayId;
		var d = new Date($scope.specialDaysModel.eventDate);
		var datestring = d.getFullYear() + "-"
				+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
				+ ("0" + d.getDate()).slice(-2);
		$scope.specialDaysModel.eventDate = datestring;
		$http.post(link, $scope.specialDaysModel).then(
				function(response) {
					$scope.specialDaysModel = response.data;
					if ($scope.specialDaysModel.length == 0) {
						$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
						$scope.reset();
					} else {
						if (angular.isNumber(tempSpclID)) {
							$scope.specialDaysList.splice(editIndex, 1);
						}
						$scope.specialDaysList.push($scope.specialDaysModel);
						$("#success").fadeIn(300).delay(1500).fadeOut(400);
						// file upload start
						var file = $scope.myFile;
						console.log('file is ');

						var getDropDown = "" + HOST_NAME
								+ "/superadmin/specialdays/insertSpclDayImage";
					//	alert(getDropDown);
						fileUpload.uploadFileToUrl(file, getDropDown);
						// file upload end
						$scope.imageEdit = {};
						$("#success").fadeIn(300).delay(1500).fadeOut(400);
						$scope.reset();
					}
				});

	};

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		 document.getElementById('specialdays-form1').style.display = 'none';
		
		$scope.loadAllData();
	});

});