

const clearInputs = function(inputArr){

    for(var i = 0;i < inputArr.length; i++){
        document.getElementById(inputArr[i]).value = '';
    }
};

const openModal = function(modal_id){

    if(modal_id === 'lookupModal'){
        clearInputs(['lookup_barcode']);
        clearResults();
    }
    
};


