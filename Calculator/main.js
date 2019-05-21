/**
 * Created by Evgeniy on 17.05.2019.
 */
var doc = document;


var numbers = doc.querySelectorAll('.number'), // кнопки с числами
    operations = doc.querySelectorAll('.operation'), // кнопки с операциями
    clears = doc.querySelectorAll('.clear'), // очистка поля
    decimal = doc.getElementById('decimal'), // точка
    display = doc.getElementById('display'), // экран
    currentNumber = 0,
    newNumber = false,
    pendingOperation = '';


// обработчик событий клика по кнопке с числом
for (var i=0; i<numbers.length; i++){
     var number = numbers[i];
    number.addEventListener('click', function (e){
            numberPress(e.target.textContent);
    });
}

// обработчик событий клика по кнопке с операцией
for (var i=0; i<operations.length; i++){
    var operation = operations[i];
    operation.addEventListener('click',  function(e){
        operationPress(e.target.textContent);
       //console.log(e);
    });
}

// обработчик событий клика по кнопке с очисткой
for (var i=0; i<clears.length; i++){
    var clear = clears[i];
    clear.addEventListener('click',  function (e){
        clearPress(e.srcElement.id);
    });
}

// обработчик событий клика по кнопке точка
decimal.addEventListener('click', function(e){
    demical(e.target.textContent);
    //console.log('press button decimal');
    });


//нажата кнопка с числом
function numberPress (number){
    if(newNumber){
        display.value = number;
        newNumber = false;
    }else{
        display.value += number;
    }
    //console.log('press button' + number + '!');
    };

//нажата кнопка с операцией
function operationPress(oper){
    let localOperationMemory = display.value;

    if(newNumber && pendingOperation !== '='){
        display.value = currentNumber;
    }else{
        newNumber = true;
        if(pendingOperation === "+"){
            currentNumber += parseFloat(localOperationMemory);
        }else if(pendingOperation === "−") {
            currentNumber -= parseFloat(localOperationMemory);
        }else if(pendingOperation === "×") {
            currentNumber *= parseFloat(localOperationMemory);
        }else if(pendingOperation === "÷") {
            currentNumber /= parseFloat(localOperationMemory);
        }else{
            currentNumber = parseFloat(localOperationMemory);
        };
        pendingOperation = oper;
        display.value = currentNumber;
    }
    //console.log('press button operations '+ oper);
    }

function demical(argument){
    let localDemicalMemory = display.value;

    if(newNumber) {
        localDemicalMemory = '0.';
        newNumber = false;
    }else{
        if(localDemicalMemory.indexOf('.') === -1){
            localDemicalMemory += '.';
        };
    };
    display.value = localDemicalMemory;
};

//нажата кнопка очистки
function clearPress (id){
    if(id==='ce'){
        display.value = '0';
        newNumber = true;
    }else if(id === 'c'){
        display.value = '0';
        newNumber = true;
        currentNumber = 0;
        pendingOperation = '';
    }

    //console.log('press button ' + id);
}
