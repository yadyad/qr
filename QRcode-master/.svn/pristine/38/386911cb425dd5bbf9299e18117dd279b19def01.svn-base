var app = angular.module('newPlan', [ 'datatables' ]);
app.controller('newPlanCtrl', function($scope, $http, $filter, $window) {

	// Global Declarations...
	var editIndex;
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.planCreationModel = null;
	$scope.planCreationModelList = null;
	$scope.answers = [];
	$scope.selected = [];
	var rows_selected = [];
	$scope.Show="New";
	
	// Method for show and hide the form
	$scope.hide = function() {
		if(document.getElementById('newPlan-form').style.display=='none'){
			document.getElementById('newPlan-form').style.display='block';
			$scope.Show="Hide";
		}else{
			document.getElementById('newPlan-form').style.display='none';
			$scope.Show="New";
		}
	}
	
	
	// Reset Function
	$scope.reset = function() {
		$scope.planCreationModel = {};
		$('#pc').html('50 characters remaining');
	};
	// Reset Function
	$scope.singleSelectPlan = function(planID) {
		// Get row ID
		var rowId = planID;
		if (rows_selected.indexOf(rowId) !== -1) {
			rows_selected.splice(rows_selected.indexOf(rowId), 1);
		} else {
			rows_selected.push(rowId);
		}

	};

	// Edit Function

	$scope.edit = function(planModel, index) {
		$scope.Show="Hide";
		document.getElementById('newPlan-form').style.display = 'block';
		editIndex = index;
		$scope.planCreationModel = planModel;
		$scope.textFieldLegthValidationOnEdit();
	};

	$scope.textFieldLegthValidationOnEdit = function() {

		var text_dep = 50;
		var text_length = $scope.planCreationModel.planName.length;
		var text_remaining1 = text_dep - text_length;
		$('#pc').html(text_remaining1 + ' characters remaining');


	}
	
	$scope.deleteSelectedPlan = function() {
		
		if (rows_selected.length === 0) {
			alert("please select a row to delete");
		} else {
			var deleteLink = "" + HOST_NAME
					+ "/superadmin/newPlan/newPlandeleteItems/" + rows_selected
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

	
	//DELETE MULTIPLE ROWS
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.planCreationModelList, function(planCreationModelList1) {
        	planCreationModelList1.selected = $scope.selectedAll;
        });
    };  

    
    $scope.remove = function(){
    	if ($window.confirm("Are you sure want to delete?")) {
        var newDataList=[];
        $scope.selectedAll = false;
        angular.forEach($scope.planCreationModelList, function(selected){
            if(!selected.selected){
                newDataList.push(selected);
            }else{
            	rows_selected.push(selected.newPlanId);
            }
        }); 
        
        $scope.deleteSelectedPlan();
        $scope.planCreationModelList = newDataList;
    	}
    };
	
	
	// Delete Function
	$scope.deletePlan = function(planID, index) {
		var deleteLink = "" + HOST_NAME
				+ "/superadmin/newPlan/plandeleteSingleItem/" + planID
				+ "";
		if ($window.confirm("Are you sure want to delete?")) {
			$http.get(deleteLink).then(function(response) {
				if (response) {
					$scope.planCreationModelList.splice(index, 1);
					$("#deleted").fadeIn(300).delay(1500).fadeOut(400);
				} else {
					alert("Not deleted");
				}
			});
		}

	};
	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		document.getElementById('newPlan-form').style.display = 'none';
		var getLink = "" + HOST_NAME + "/superadmin/newPlan/all";
		$http.get(getLink).then(function(response) {
			$scope.planCreationModelList = response.data;
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
		$('#pc').html(text_dep + ' characters remaining');

		$("#planName").bind('propertychange change click keyup input paste',
				function(e) {
					var text_length = $('#planName').val().length;
					var text_remaining = text_dep - text_length;

					$('#pc').html(text_remaining + ' characters remaining');
				});


	}

	// METHOD TO SUBMIT
	$scope.submit = function() {
		$scope.submitted = true;
		var link = "" + HOST_NAME + "/superadmin/newPlan/post";
		var tempPlanID=$scope.planCreationModel.newPlanId;
		$http.post(link, $scope.planCreationModel).then(function(response) {
			$scope.planCreationModel = response.data;
			if ($scope.planCreationModel.length == 0) {
				$("#duplicate").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			} else {
				if (angular.isNumber(tempPlanID)) {
					 $scope.planCreationModelList.splice(editIndex, 1);
				} 
				$scope.planCreationModelList.push($scope.planCreationModel);
				$("#success").fadeIn(300).delay(1500).fadeOut(400);
				$scope.reset();
			}
		});

	};

});