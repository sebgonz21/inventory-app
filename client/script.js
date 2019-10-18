document.addEventListener("DOMContentLoaded", function(){
    
    $('.alert').hide();

});

const addItem = function(){

    var item = {
        barcode: document.getElementById('add_barcode').value,
        name: document.getElementById('add_name').value,
        quantity: document.getElementById('add_quantity').value
    };
    
    if(!item.barcode){
        alert('could not add item');
        return;
    }

    var client=new XMLHttpRequest();
    client.open("post","/api/addItem");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            clearInputs(['add_barcode','add_name','add_quantity']);
            
            $(".alert-success").fadeTo(3000, 500).fadeOut(500, function(){
                $(".alert-success").fadeOut(500);
            });
            
        }
    }; 
    client.send(JSON.stringify(item));

};

const addResult = function(item){
    
    var template = document.getElementById('result_template').innerHTML;
    var currElement = '';
    var resultStr = '';

    for(var id in item){
        currElement = template.replace(/\{input_id\}/g,id); 
        var title = id.charAt(0).toUpperCase() + id.slice(1)
        currElement = currElement.replace(/\{Title\}/,title);
        currElement = currElement.replace(/style="display:none"/g,'');
        resultStr += currElement;
    }
  
    clearResults();
    var result = document.getElementById('result');
    result.innerHTML = resultStr;
    
    for(var id in item){
        var element = item[id];
        document.getElementById(id).value = Object.values(element)[0];
    }
    
};

const clearResults = function(){
    document.getElementById('result').innerHTML = '';
};

const getItem = function(){

    var barcode = document.getElementById('lookup_barcode').value;

    if(!barcode){
        alert('Could not find item');
        clearResults();
        return;
    }
    console.log('searching ' + barcode);
    var client=new XMLHttpRequest();
    client.open("get","/api/getItem/"+barcode);

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            
            if(this.response === '' || this.response === null){
                alert('Could not find item');
                clearResults();
                return;
            }
          
            var item = JSON.parse(this.responseText);
          
            addResult(item);
        }
    }; 
    client.send();
};



