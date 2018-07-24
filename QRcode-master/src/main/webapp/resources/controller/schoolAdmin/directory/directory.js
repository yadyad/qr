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
		}).error(function() {

		});
	}
} ]);
/* file upload end class */
app.controller('schoolNewsCtrl', function($scope, $http, $filter, $window,
		fileUpload) {

	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.schoolNewsList = null;
	$scope.schoolNewsDivModel = null;
	$scope.selected = [];
	$scope.gender = [];
	var rows_selected = [];
	$scope.fileList;
	$scope.folderList;
	$scope.back;
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		// = 'none';
		var getSchoolList = "" + HOST_NAME
				+ "/schooladmin/directory/alldirectory";
		// alert(getDropDownDept)
		$http.get(getSchoolList).then(function(response) {

			$scope.schoolNewsList = response.data;
			$scope.fileList = $scope.schoolNewsList.fileList;

			$scope.folderList = $scope.schoolNewsList.folderList;
//			 alert(JSON.stringify($scope.fileList));
		});

	};

	$scope.folderview = function(folder1) {
		document.getElementById('backID').style.display = 'block';
		$scope.folderList = folder1;
		var getSchoolList = "" + HOST_NAME
				+ "/schooladmin/directory/subdirectory";
		// alert(getDropDownDept)
		$http.post(getSchoolList, $scope.folderList).then(function(response) {
			$scope.schoolNewsList = response.data;
			$scope.fileList = $scope.schoolNewsList.fileList;
			$scope.folderList = $scope.schoolNewsList.folderList;
			// alert(JSON.stringify($scope.fileList));
		});
	}

	$scope.deleteFile = function(fileName) {
		if ($window.confirm("Are you sure?")) {
			$scope.folderList = fileName;
			var getFileName = "" + HOST_NAME
					+ "/schooladmin/directory/deleteFile";
			// alert(getDropDownDept)
			$http.post(getFileName, $scope.folderList).then(function(response) {
				$scope.schoolNewsList = response.data;
				$scope.fileList = $scope.schoolNewsList.fileList;
				$scope.folderList = $scope.schoolNewsList.folderList;
				// alert(JSON.stringify($scope.fileList));
			});
		}
	}

	$scope.backFolder = function() {
		document.getElementById('backID').style.display = 'none';
		var backTOParent = "" + HOST_NAME
				+ "/schooladmin/directory/backdirectory";
		$http.get(backTOParent).then(function(response) {
			$scope.schoolNewsList = response.data;
			$scope.fileList = $scope.schoolNewsList.fileList;
			$scope.folderList = $scope.schoolNewsList.folderList;
			// alert(JSON.stringify($scope.fileList));
		});
	}
	angular.element(document).ready(function() {
		$scope.loadAllData();
	});

});