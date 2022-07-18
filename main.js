document.getElementById("save-button").addEventListener("click", ()=>{
  console.log(1)
  var inputValue = document.getElementById("textarea").value;

  chrome.storage.local.set({"memo1": inputValue}, function(){ });

});

document.getElementById("load-button").addEventListener("click", ()=>{

  chrome.storage.local.get("memo1", function(result){

    document.getElementById("textarea").value = result.memo1;

  });

});
