var app = angular.module('planHistory', [ 'datatables' ]);
app.controller('planHistoryController', function($scope, $http, $filter,
		$window) {
	var url = window.location.href;
	var arr = url.split("/");
	var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];
	$scope.SubscriptionPlanActivationModel = null;
	$scope.PlanModelList = null;
	$scope.schoolModel = null;
	$scope.SubsciptionPlanModel = null;
	$scope.usedSize;
	$scope.totalSpace;

	// Method to all data to the angular datatable
	$scope.loadAllData = function() {
		
		var getPlanDetails = "" + HOST_NAME
				+ "/schooladmin/payment/paymentdetails";
		$http.get(getPlanDetails).then(function(response) {
			$scope.PlanModelList = response.data;
		});
		
		var getUsedSpace = "" + HOST_NAME
		+ "/schooladmin/usedspace";
		$http.get(getUsedSpace).then(function(response) {
			$scope.usedSize=response.data;
		});
		
		var quotaList = "" + HOST_NAME
		+ "/schooladmin/quota/all";
		$http.get(quotaList).then(function(response) {
			$scope.quotaList=response.data;
		});
	};

	// ANGULAR READY FUNCTION
	angular.element(document).ready(function() {
		$scope.loadAllData();
		var url = window.location.href;
		var arr = url.split("/");
		var HOST_NAME = arr[0] + "//" + arr[2] + "/" + arr[3];

		var jsonBom = JSON.parse($('#planId').val());
		var usedSpace=JSON.parse($('#usedID').val())
		$scope.totalSpace=jsonBom;
		var used;
		var unused;
		if (jsonBom == 0) {
			jsonBom = JSON.parse(0.0);
			used = JSON.parse(0.0);
			unused = JSON.parse(0.0);
		} else {
			used = JSON.parse(usedSpace);
			unused =JSON.parse(jsonBom);
		}

		
		 Highcharts.setOptions({
		     colors: ['#338f8c', '#333']});
		
		Highcharts
				.chart(
						'container',
						{

							chart : {
								plotBackgroundColor : null,
								plotBorderWidth : null,
								plotShadow : false,
								type : 'pie'
							},
							title : {
								text : 'Space Usage'     
							},
							tooltip : {
								pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
							},
							plotOptions : {
								pie : {
									allowPointSelect : true,
									cursor : 'pointer',
									dataLabels : {
										enabled : true,
										format : '<b>{point.name}</b>: {point.percentage:.1f} %',
										style : {
											color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
													|| 'black'
										}
									}
								}
							},

							series : [ {
								name : 'Brands',
								colorByPoint : true,
								data : [ {
									name : 'Used',
									y : used,
									sliced : true,
									selected : true
								}, {
									name : 'Unused',
									y : unused,
									sliced : true,
									selected : true
								} ]
							} ]
						});
	});

});

