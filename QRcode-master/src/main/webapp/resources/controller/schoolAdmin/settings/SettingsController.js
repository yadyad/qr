var app = angular.module('academic', [ 'datatables' ]);

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

app.controller('academicCtrl', function($scope, $http, $filter, $window,
		fileUpload) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.academicModel = null;
	$scope.feesStructureModel = null;
	$scope.feesStructureModelList = [];
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];

	// Method for show and hide the form
	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.academicModel = null;
	$scope.feesStructureModel = null;
	$scope.feeStructure = null;
	$scope.feesStructureModelList = [];
	$scope.academicModelList = [];
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	// Method for show and hide the form

	// Reset Function
	$scope.reset = function() {
		$scope.academicModel = {};
	};

	// Edit Function

	$scope.edit = function(academicPOJO, index) {
		editIndex = index;
		$scope.academicModel = academicPOJO;
	};

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		var getLink = "" + HOST_NAME + "/schooladmin/settings/all";
		$http.get(getLink).then(
				function(response) {

					$scope.academicModel = response.data;
					$scope.academicStartYear = response.data.academicStartYear;
					$scope.academicEndYear = response.data.academicEndYear
					var d = new Date($scope.academicStartYear);
					var datestring = d.getFullYear() + "-"
							+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
							+ ("0" + d.getDate()).slice(-2);
					// alert(datestring);
					$scope.academicModel.academicStartYear = datestring;

					var d = new Date($scope.academicEndYear);
					var datestring = d.getFullYear() + "-"
							+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
							+ ("0" + d.getDate()).slice(-2);
					// alert(datestring);
					$scope.academicModel.academicEndYear = datestring;

					var getFeesList = "" + HOST_NAME
							+ "/schooladmin/settings/allfees";
					$http.get(getFeesList).then(function(response) {
						$scope.feesStructureModelList = response.data;
					});
				});

		var getFeesList = "" + HOST_NAME + "/schooladmin/settings/allfees";
		$http.get(getFeesList).then(function(response) {
			$scope.feeStructure = response.data;
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

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
	});

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		var link = "" + HOST_NAME + "/schooladmin/settings/post";
		var settingsID = $scope.academicModel.academicID;
		var d = new Date($scope.academicModel.academicStartYear);
		var datestring = d.getFullYear() + "-"
				+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
				+ ("0" + d.getDate()).slice(-2);
		$scope.academicModel.academicStartYear = datestring;
		var d = new Date($scope.academicModel.academicEndYear);
		var datestring = d.getFullYear() + "-"
				+ ("0" + (d.getMonth() + 1)).slice(-2) + "-"
				+ ("0" + d.getDate()).slice(-2);
		$scope.academicModel.academicEndYear = datestring;
		$http.post(link, $scope.academicModel).then(function(response) {
			$scope.academicModel = response.data;

			// alert($scope.academicModel)
			/*
			 * if ($scope.academicModel.length == 0) {
			 * $("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
			 * $scope.reset(); } else { if (angular.isNumber(settingsID)) {
			 * $scope.academicModelList.splice(editIndex, 1); }
			 */
			$scope.academicModelList.push($scope.academicModel);
			$("#success").fadeIn(300).delay(1500).fadeOut(400);

			$scope.reset();
			$scope.loadAllData();

		});

	};

	// METHOD TO SUBMIT
	$scope.submitfees = function() {
		if($scope.myFile.type=="application/pdf"){
		$scope.submitted = true;
		var file = $scope.myFile;
		console.log('file is ');
		var getDropDown = "" + HOST_NAME
				+ "/schooladmin/settings/insertfeesStructure";
		fileUpload.uploadFileToUrl(file, getDropDown);

		var getFeesList = "" + HOST_NAME + "/schooladmin/settings/allfees";
		$http.get(getFeesList).then(function(response) {

			$scope.feesStructureModelList = response.data;

			if ($scope.feesStructureModelList.length == 0) {

				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				// $scope.reset();
			} else {

			
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.load();
				
			}
			// $scope.reset();

		});
		}else{
			$("#feespdf").fadeIn(300)
			.delay(1500).fadeOut(
					400);
		}
	};
	
	
	
	
	
	
	$scope.load = function(){
		alert("Are you sure???")
		var getFeesList = "" + HOST_NAME + "/schooladmin/settings/allfees";
		$http.get(getFeesList).then(function(response) {
			$scope.feeStructure = response.data;
		});
	}
	
	
	
	
	
});



/*
 * // METHOD TO SUBMIT $scope.submitfees = function() {
 * 
 * alert("Submit") $scope.submitted = true; var file = $scope.myFile;
 * console.log('file is '); var getDropDown = "" + HOST_NAME +
 * "/schooladmin/settings/insertfeesStructure"; fileUpload.uploadFileToUrl(file,
 * getDropDown);
 * 
 * var getFeesList = "" + HOST_NAME + "/schooladmin/settings/allfees";
 * $http.get(getFeesList).then(function(response) {
 * $scope.feesStructureModelList = response.data; });
 */

