
$(document).ready(function(){
  var name = localStorage.getItem("role");
  var email = localStorage.getItem("email");
  $(".hello").text("Hi, "+ name);
  if(name=="Admin") {
    $("#admin").addClass("col-sm-8");
  }
  else {
    $(".col-sm-4").remove();
  }

  $.post("/watching",
    {
      email : email
    },
    function(data){
       var len1 = data.incoming.length;
       for (i = 0; i < len1; i++ ){
         $("#incoming").append(data.incoming[i]+"<br>");
       };
       var len2 = data.forwarding.string.length;
       for (i = 0; i < len2; i++ ){
         var tstring = data.forwarding.string[i];
         var taddress = data.forwarding.address[i];
         var text = "<br>If \"" + tstring + "\" appears in the body of message, forwarded to " + taddress;
         $("#forwarding").append(text);
         };

       }
    );

  $("#doSettings").hide();

  $("#form1").submit(function(event){
    $.post("/addWatching",
    {
      email : email,
      filter : $("#email1").val(),
    },
    function(data){
       if( data.result == 'success'){
         alert("Successfully added");
         var txt1 = $("#email1").val();
         $("#incoming").append(txt1+"<br>");
       }
       else {
         alert("That address already exist");
       }
      }
    );

      event.preventDefault();
  });

  $("#form2").submit(function(event){
    var txt1 = $("#string").val();
    var txt2 = $("#email2").val();
    var txt = "<br>If \"" + txt1 + "\" appears in the body of message, forwarded to " + txt2;
    $.post("/forwarding",
      {
        email: email,
        string: txt1,
        forwarding: txt2
      },
      function(data){
        if (data.result=="success"){
          $("#forwarding").append(txt);
          alert("Successfully added.");
        }
        else{
          alert("That forwarding string already exists.")
        }
      });
      event.preventDefault();
  });

  var userinfo = new Array();

  $("#settings").click(function(){
    $(this).hide();
    $("#doSettings").show();
    $.get("/allUsers", function(data){
      console.log("users:", data);
      len = data.length;
      for (i = 0 ; i < len ; i++ ){
        userinfo[i] = data[i].email;
        $("#userlist").append("<div id=user"+i+">"+ data[i].email+"<button class = 'remove btn-danger'>Delete</button><br></div>");
      }
    })
  });

  $(document).on("click", ".remove", function(){
    $("button:parent").hide();
  });

  //  change admin settings
  $("#form3").submit(function(event){
    var nemail = $("#nemail").val();
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    console.log(nemail, password1, password2);
    if (password1 != password2){
      alert("Passwords do not match");
    }
    else{
      $.post("/adminSetting",
        {
          email: nemail,
          password: password1
        },
        function(data, status){
          if (err) throw err;
        }
      )
    }
    event.preventDefault();
  });


  // change user settings
  $("#form4").submit(function(event){
    var temail = $("#temail").val();
    var tpassword1 = $("#tpassword1").val();
    var tpassword2 = $("#tpassword2").val();
    console.log(temail, tpassword1, tpassword2);
    if (tpassword1 != tpassword2){
      alert("Passwords do not match");
    }
    else{
      $.post("/userSetting",
        {
          email: temail,
          password: tpassword1,
        },
        function(err, data){
          if (err) throw err;
          if (data.result == success){
            alert("Successfully added!");
          }
          else{
            alert("That account already exist.");
          }
        }
      )
    }
    event.preventDefault();
  });

  $("#closeSettings").click(function(){
    $("#doSettings").hide();
    $("#settings").show();
  })
});
