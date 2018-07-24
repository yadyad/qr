//
// Updates "Select all" control in a data table
//
function updateDataTableSelectAllCtrl(table){
   var $table             = table.table().node();
   var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
   var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
   var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);

   // If none of the checkboxes are checked
   if($chkbox_checked.length === 0){
      chkbox_select_all.checked = false;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = false;
      }
      $("#btnreleasePrivilege").attr("disabled", "disabled"); 
      
      


   // If all of the checkboxes are checked
   } else if ($chkbox_checked.length === $chkbox_all.length){
      chkbox_select_all.checked = true;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = false;
      }
      $("#btnreleasePrivilege").removeAttr("disabled");
   // If some of the checkboxes are checked
   } else {
      chkbox_select_all.checked = true;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = true;
      }
      $("#btnreleasePrivilege").removeAttr("disabled");
   }
}

$(document).ready(function (){
   // Array holding selected row IDs
   var rows_selected = [];
   var table = $('#datatable-buttons').DataTable({
      'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             return '<input type="checkbox">';
         }
      },{
          'targets': 1,
          'searchable':false,
          'orderable':false,
          'className': 'dt-body-center',
          'render': function (data, type, full, meta){
              return '<input type="button" class="btn fa fa-edit ico-action" ng-click="reset()" value="Edit">    ';
          }
       }],
      'order': [1, 'asc'],
      'rowCallback': function(row, data, dataIndex){
         // Get row ID
         var rowId = data[0];

         // If row ID is in the list of selected row IDs
         if($.inArray(rowId, rows_selected) !== -1){
            $(row).find('input[type="checkbox"]').prop('checked', true);
            $(row).addClass('selected');
         }
      }
   });

   // Handle click on checkbox
   $('#datatable-buttons tbody').on('click', 'input[type="checkbox"]', function(e){
	   
	   alert("dddddddddddddddd")
   });
   
   $('#datatable-buttons tbody').on('click', 'input[type="button"]', function(e){
	     var $row = $(this).closest('tr');
	     
	      // Get row data
	      var data = table.row($row).data();
	      // Get row ID
	      var rowId = data[1];
//	      alert("edit"+rowId);
	      angular.element(document.getElementById('cntrlID')).scope().reset();
	      $("#userName").attr("disabled", "disabled"); 
	 
   });
  
   $("#btnDelete").click(function(){
	   
	   if (rows_selected.length === 0) {
		    alert("please select a row to delete");
		}else{
			 if(confirm("Are you sure you want to delete!")){
				   angular.element(document.getElementById('cntrlID')).scope().deleteItems(rows_selected);
			   }
		}
	   
	  
	  
   }); 
   
$("#btnGetIDS").click(function(){
	 
		   angular.element(document.getElementById('cntrlID')).scope().getIds(rows_selected);
		   table.$('input').removeAttr( 'checked' );
		   updateDataTableSelectAllCtrl(table);
		
	  
   }); 
// Button click function to get all the assigned privilege
$("#btnreleasePrivilege").attr("disabled", "disabled"); 

$("#btnShowPrivilege").click(function(){
	   
	   
	   angular.element(document.getElementById('cntrlID')).scope().showPrivilege();


});
$(".ico-action").click(function(){
	   alert("hhhh");
	   
//	   angular.element(document.getElementById('cntrlID')).scope().showPrivilege();


});
// Button click function to release assigned privilege
$("#btnreleasePrivilege").click(function(){
	   
	   
	   angular.element(document.getElementById('cntrlID')).scope().releasePrivilege(rows_selected);


});
   // Handle click on table cells with checkboxes

   // Handle click on "Select all" control
   $('thead input[name="select_all"]', table.table().container()).on('click', function(e){
      if(this.checked){
         $('tbody input[type="checkbox"]:not(:checked)', table.table().container()).trigger('click');
      } else {
         $('tbody input[type="checkbox"]:checked', table.table().container()).trigger('click');
      }
      // Prevent click event from propagating to parent
      e.stopPropagation();
   });

   // Handle table draw event
   table.on('draw', function(){
      // Update state of "Select all" control
      updateDataTableSelectAllCtrl(table);
   });
    
   // Handle form submission event 
   $('#frm-example').on('submit', function(e){
      var form = this;

      // Iterate over all selected checkboxes
      $.each(rows_selected, function(index, rowId){
         // Create a hidden element 
         $(form).append(
             $('<input>')
                .attr('type', 'hidden')
                .attr('name', 'id[]')
                .val(rowId)
         );
      });

      // FOR DEMONSTRATION ONLY     
      
      // Output form data to a console     
      $('#example-console').text($(form).serialize());
      console.log("Form submission", $(form).serialize());
       
      // Remove added elements
      $('input[name="id\[\]"]', form).remove();
       
      // Prevent actual form submission
      e.preventDefault();
   });
});
