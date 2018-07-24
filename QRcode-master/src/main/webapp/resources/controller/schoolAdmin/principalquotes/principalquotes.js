var app = angular.module('principalquotes', [ 'datatables' ]);



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




app.controller('principalquotesCtrl', function($scope, $http, $filter, $window,fileUpload) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.principalquotesModel = null;
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.principalTitle = null;
	$scope.principalDesc = null;


	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		var getLink = "" + HOST_NAME + "/schooladmin/principalquotes/all";
		$http.get(getLink).then(function(response) {
			$scope.principalquotesModel = response.data;
			
			principalTitle = $scope.principalquotesModel.title;
			principalDesc = $scope.principalquotesModel.desc;
			
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
		var link = "" + HOST_NAME + "/schooladmin/principalquotes/post";
		var tempTaxID=$scope.principalquotesModel.principalQuoteID;
	
		$http.post(link, $scope.principalquotesModel).then(function(response) {
			$scope.principalquotesModel = response.data;
			
			if ($scope.principalquotesModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				//$scope.reset();
			} else {
				
				if (principalTitle == $scope.principalquotesModel.title && principalDesc == $scope.principalquotesModel.desc ) {
					
					alert("Are you sure you don't want any changes????")
					
				}
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				// file upload start
				var file = $scope.myFile;
				console.log('file is ');

				var getDropDown = "" + HOST_NAME
						+ "/schooladmin/principalquotes/insertPrincipalImage";
			//	alert(getDropDown);
				fileUpload.uploadFileToUrl(file, getDropDown);
				// file upload end
				$scope.imageEdit = {};
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				//$scope.reset();
			}
		});

	};
	
	
	

	// FOR SHOWING THE BROWSED IMAGES...
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#blahP').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#imgPrin").change(function() {
		readURL(this);
	});
});