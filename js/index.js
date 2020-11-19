var usernameAvailable = false;
        
    //Displaying City from API after typing a zip code    
    $("#zip").on("change", function(){
            
            var currentZip = $("#zip").val();
            //alert(  $("#zip").val()  );
            $.ajax({
              method: "GET",
                 url: `https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip?zip=${currentZip}`,
            dataType: "json",
             success: function(result,status) {
                  
                  //alert(result.city);
                  $("#city").html(result.city);
                  $("#latitude").html(result.latitude);
                  $("#longitude").html(result.longitude);
                }
                
            });//ajax
        });//zip
        
        $("#state").on("change", function() {
            
            //alert($("#state").val());
            var selectedState = $("#state").val();
            $.ajax({
                method: "GET",
                   url: `https://itcdland.csumb.edu/~milara/ajax/countyList.php?state=${selectedState}`,
              dataType: "json",
               success: function(result,status) {
                    
                  //alert(result[0].county);
                  $("#county").html("<option> Select One </option>");
                  for (let i=0; i < result.length; i++){
                      $("#county").append("<option>" + result[i].county + "</option>");
                  }                  
                
                }
            });//ajax
        }); //state
        
        $("#username").change(function() {
            
            var uName = $("#username").val();
            //alert($("#username").val());
            $.ajax({
                method: "GET",
                   url: `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${uName}`,
              dataType: "json",
               success: function(result,status) {
                   
                            if(result.available){
                                $("#usernameError").html("Username is available!");
                                $("#usernameError").css("color", "green");
                                usernameAvailable = true;
                            }
                            else {
                                $("#usernameError").html("Username is unavailable!");
                                $("#usernameError").css("color", "red");
                                usernameAvailable = false;
                            }               
                        }
            });//ajax
        }); //username
        
       $("#signupForm").submit(function(event){
           
           //alert("submitting form...");
           if (!isFormValid()) {
             event.preventDefault();
           }
           
       });//signupForm
       
       function isFormValid(){
          var isValid = true;
          if (!usernameAvailable) {
              isValid = false;
          }
          
          if ($("#username").val().length == 0) {
              isValid = false;
              $("#usernameError").html("Username is required");
          }
          
         if ($("#password").val() != $("#passwordAgain").val()){
            $("#passwordAgainError").html("Password Mismatch!");
            isValid = false;
          }
          return isValid;
       }