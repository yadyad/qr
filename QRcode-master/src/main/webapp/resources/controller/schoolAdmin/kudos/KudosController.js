var app = angular.module('kudos', [ 'datatables' ]);

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
app.controller('kudosCtrl', function($scope, $http, $filter, $window,
		fileUpload) {

	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.kudosList = null;
	$scope.kudosModel = null;
	$scope.studentList = null;
	$scope.selected = [];
	$scope.gender = [];
	$scope.Show = "New";
	var rows_selected = [];

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
	$scope.edit = function(kudosPOJO, index) {
		$scope.Show = "Hide";
		document.getElementById('kudosId').style.display = 'block';
		editIndex = index;
		$scope.kudosModel = kudosPOJO;
		$scope.imageEdit = {};
		$scope.imageEdit = kudosPOJO.imageUrl;
		$scope.textFieldLegthValidationOnEdit();

	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_max = 255;
		var text_length = $scope.kudosModel.kudos.length;
		var text_remaining1 = text_max - text_length;
		$('#kudosID').html(text_remaining1 + ' characters remaining');

		$('#kudosDe').html(text_max + ' characters remaining');
		var text_length = $scope.kudosModel.kudosDesc.length;
		var text_remaining1 = text_max - text_length;
		$('#kudosDe').html(text_remaining1 + ' characters remaining');

	}

	
	
	
	// Reset Function
	$scope.reset = function() {
		$scope.kudosModel = {};
		angular.element("input[type='file']").val(null);
		$scope.imageEdit = '';
		$('#kudosID').html('255 characters remaining');
		$('#kudosDe').html('255 characters remaining');
	};

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		var getKudosList = "" + HOST_NAME + "/schooladmin/kudos/kudoslistAll";
		$http.get(getKudosList).then(function(response) {
			$scope.kudosList = response.data;

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
					+ "/schooladmin/kudos/kudosdeleteItems/" + rows_selected
					+ "";
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}
	};

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;

		var link = "" + HOST_NAME + "/schooladmin/kudos/post";
		// alert(JSON.stringify($scope.schoolDivModel))
		var tempKudosID = $scope.kudosModel.kudosId;

		// alert(tempStaffID)
		// alert(JSON.stringify($scope.schoolDivModel))
		$http.post(link, $scope.kudosModel).then(
				function(response) {
					$scope.kudosModel = response.data;
					if ($scope.kudosModel.length == 0) {
						$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
						$scope.reset();
					} else {
						if (angular.isNumber(tempKudosID)) {
							$scope.kudosList.splice(editIndex, 1);
						}
						$scope.kudosList.push($scope.kudosModel);
						$("#success").fadeIn(300).delay(1500).fadeOut(400);
						// file upload start
						var file = $scope.myFile;
						console.log('file is ');

						var getDropDown = "" + HOST_NAME
								+ "/schooladmin/kudos/insertKudosImage";
						// alert(getDropDown);
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
		document.getElementById('kudosId').style.display = 'none';
		$scope.loadAllData();
		$scope.textFieldLegthValidation();
	});

	// / TEXT FIELD LENGTH VALIDATION.....

	$scope.textFieldLegthValidation = function() {
		var text_max = 255;
		$('#kudosID').html(text_max + ' characters remaining');
		$('#kudosDe').html(text_max + ' characters remaining');

		$("#kudos").bind(
				'propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#kudos').val().length;
					var text_remaining = text_max - text_length;

					$('#kudosID')
							.html(text_remaining + ' characters remaining');
				});

		$("#kudosDesc").bind(
				'propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#kudosDesc').val().length;
					var text_remaining = text_max - text_length;

					$('#kudosDe').html(
							text_remaining + ' characters remaining');
				});

	}

	// DELETE MULTIPLE ROWS
	$scope.checkAll = function() {
		if (!$scope.selectedAll) {
			$scope.selectedAll = true;
		} else {
			$scope.selectedAll = false;
		}
		angular.forEach($scope.kudosList, function(kudosList1) {
			kudosList1.selected = $scope.selectedAll;
		});
	};

	$scope.remove = function() {
		// if ($window.confirm("Are you sure want to delete?")) {
		var newDataList = [];
		$scope.selectedAll = false;
		angular.forEach($scope.kudosList, function(selected) {
			if (!selected.selected) {
				newDataList.push(selected);
			} else {
				rows_selected.push(selected.kudosId);
			}
		});

		$scope.deleteSelected();
		$scope.kudosList = newDataList;
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