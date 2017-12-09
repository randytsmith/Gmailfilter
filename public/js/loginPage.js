$(document).ready(function(){
  $("#main").submit(function(event){
    event.preventDefault();
    console.log(window.location.href);
    $.post("/login",
    {
      email: $("#email").val(),
      password: $("#password").val()
    },
    function(data, status){
       console.log(data.status);
       if( data.status == 'success'){
         console.log(data.email);
         if (typeof(Storage) !== "undefined") {
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", data.role);
          } else {
            console.log("Sorry, your browser does not support Web Storage...");
          }
         window.location.href = "./filter.html";
       } else {
          alert("Invalid address or wrong password");
       }
     }
   );
  });
});
