
// ALL VARIBLES

// LIVE FORM VALIDATION MESSAGES FOR ALL FORM INPUT
// username live input message variable
const liveValidNameMessage = $('<span class="error" id="live_valid_name_message">Thanks, name field is valid</span>');
const liveInvalidNameMessage = $('<span class="error" id="live_invalid_name_message">Please enter a vilid name: letters only</span>');
// email live input message variable
const liveValidEmailMessage = $('<span class="error" id="live_valid_email_message">Thanks, email field is valid</span>');
const liveInvalidEmailMessage = $('<span class="error" id="live_invalid_email_message">Please enter a valid email</span>');
// credit card number live input message variable
const liveValidCreditNumberMessage = $('<span class="error" id="live_valid_card_message">Thanks, this is a valid card number</span>');
const liveInvalidCreditNumberMessage = $('<span class="error" id="live_invalid_card_message">Must be between (13 to 16 digits long)</span>');
// zipcode live input message
const liveValidZipcodeMessage = $('<span class="error" id="live_valid_zipcode_message">Thanks, is valid</span>');
const liveInvalidZipcodeMessage = $('<span class="error" id="live_invalid_zipcode_message">Not valid zipcode</span>');
// cvv live input message
const liveValidCvvCodeMessage = $('<span class="error" id="live_valid_cvv_message">Thanks, is valid</span>');
const liveInvalidCvvCodeMessage = $('<span class="error" id="live_invalid_cvv_message">Cvv code not valid</span>');

// ON SUBMIT VALIDATION CHECKBOX MESSAGE
const checkboxesvalidation = $('<span class="error_message" id="error_activities" style="color: red">Please check atleast one activity.</span>');

const $name = $('#name');
const $email = $('#mail');
const $cardNumber = $('#cc-num');
const $zipCodeNumber = $('#zip');
const $cvvCode = $('#cvv');

const allCheckedActivities = $(".activities");
const totalDivContainer = $("<div>Total Cost: $</div>");
allCheckedActivities.append(totalDivContainer);
let totalActivityCost = 0;

const paymentContainer = $('option[value="select method"]');
paymentContainer.css("display", "none"); //hide selected method on page load
const creditCard = document.querySelector('option[value="credit card"]');
const paypal = document.querySelector('option[value="paypal"]');
const bitcoin = document.querySelector('option[value="bitcoin"]');
const paymentMethod = document.getElementById('payment');

const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const button = document.getElementsByTagName('button')[0];


creditCard.selected = 'true';//credit card will be display intially
//These two paypal and bitcoin container will be hidden intially on page load
// $('#paypal').css("display", "none");
// $('#bitcoin').css("display", "none");

//Hiding info about paypal and bitcoin
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

let allElementItems = $("");
let date_and_time_attr = $("");
let dataCost = $("");
let targetedCheckedValue = $("");
let nameAttribute = $("");


$(document).ready(function(){
    $('#name').focus(); // set focus on the user name input on page load
    $('#other-title').hide() // hide the below input but show when javascript is disable 
    $('#color').hide(); // hide the color element initially on page load
    $('#design option:first').hide(); // hide the design element initially on page load
})

// The other job title field
$(document).ready(function(){
const $otherJob = $('#title');
$otherJob.on('change', function(e){
    if ($(e.target).val() === 'other'){
    $('#other-title').show();
    } else {
       $('#other-title').hide();
    }
 });
});


// This add Event Listener is use for changes in the payment methods
paymentMethod.addEventListener('change', () => {
    if (paypal.selected) {
      creditCardDiv.style.display = 'none';
      paypalDiv.style.display = 'block';
      bitcoinDiv.style.display = 'none';
    } else if (bitcoin.selected) {
      creditCardDiv.style.display = 'none';
      paypalDiv.style.display = 'none';
      bitcoinDiv.style.display = 'block';
    } else if (creditCard.selected) {
      creditCardDiv.style.display = 'block';
      paypalDiv.style.display = 'none';
      bitcoinDiv.style.display = 'none';
    }
  });
  
/* This change method will clear or erase any data that was previously enter 
   by the user into the drop down select payment option input. That is, when the user
   enter an information into the credit card inputs and decided to switch to
   the paypal or bitcoin section, all data that were previously into the credit card
   section will be clear or erase, this helps to prevent our credit section from hackers */
$("#payment").change(() =>{
      if (!$("option[value='credit card']").prop("selected")){
        $("#credit-card input").each((i, input) => { $(input).val("") && !$(input).val() > 0;})
        if ($(".credit-card .error").length !== 0){
          $(".credit-card .error").remove();
        }
      }
  });



 
 /* ##############  LIVE VALIDATION FOR ALL INPUTS (GREAT USERS EXPERIENCE) ############## */
$(document).ready(function(){
    // use keyup event on user name field
    $("#name").keyup(function(){
        if(validateName()){
            // if the user name is valid set the input text and border to red
            $("#name").before(liveValidNameMessage)
            $('#live_valid_name_message').css({"font-size":"1em", "color":"green"});
            $("#name").css("border", "2px solid green");
            liveInvalidNameMessage.css("display","none");
            liveValidNameMessage.css("display","block");
            return true;
        } else{
            // if the user name is not valid set the input text and border to red
            $("#name").before(liveInvalidNameMessage)
            $('#live_invalid_name_message').css({"font-size":"1em", "color":"red"});
            $("#name").css("border", "2px solid red");
            liveInvalidNameMessage.css("display","block");
            liveValidNameMessage.css("display","none"); 
            return false;  
        }
    });

    // use keyup event on email field
    $("#mail").keyup(function(){
        if(validateEmail()){
            // if the user email is valid set the input text and border to red
            $("#mail").before(liveValidEmailMessage)
            $('#live_valid_email_message').css({"font-size":"1em", "color":"green"});
            $("#mail").css("border", "2px solid green");
            liveInvalidEmailMessage.css("display","none");
            liveValidEmailMessage.css("display","block");
            return true;
        } else{
            // if the user email is not valid set the input text and border to red
            $("#mail").before(liveInvalidEmailMessage)
            $('#live_invalid_email_message').css({"font-size":"1em", "color":"red"});
            $("#mail").css("border", "2px solid red");
            liveInvalidEmailMessage.css("display","block");
            liveValidEmailMessage.css("display","none");
            return false;   
        }
    });

    // use keyup event on user credit card Number
    $("#cc-num").keyup(function(){
        if(validateCardNumber()){
            // if the user credit credit number is valid set the input text and border to red
            $("#cc-num").before(liveValidCreditNumberMessage)
            $('#live_valid_card_message').css({"font-size":"1em", "color":"green"});
            $("#cc-num").css("border", "2px solid green");
            liveInvalidCreditNumberMessage.css("display","none");
            liveValidCreditNumberMessage.css("display","block");
            return true;
        } else{
            // if the user credit card number is not valid set the input text and border to red
            $("#cc-num").before(liveInvalidCreditNumberMessage)
            $('#live_invalid_card_message').css({"font-size":"1em", "color":"red"});
            $("#cc-num").css("border", "2px solid red");
            liveInvalidCreditNumberMessage.css("display","block");
            liveValidCreditNumberMessage.css("display","none");
            return false;   
        }
    });

    // use keyup event on zip code field
    $("#zip").keyup(function(){
        if(validateZipCode()){
           // if the user zip code is valid set the input text and border to red
           $("#zip").before(liveValidZipcodeMessage)
           $('#live_valid_zipcode_message').css({"font-size":"1em", "color":"green"});
           $("#zip").css("border", "2px solid green");
           liveInvalidZipcodeMessage.css("display","none");
           liveValidZipcodeMessage.css("display","block");
           return true;
       } else{
           // if the user zip code is not valid set the input text and border to red
           $("#zip").before(liveInvalidZipcodeMessage)
           $('#live_invalid_zipcode_message').css({"font-size":"1em", "color":"red"});
           $("#zip").css("border", "2px solid red");
           liveInvalidZipcodeMessage.css("display","block");
           liveValidZipcodeMessage.css("display","none");
           return false;   
       }
    });

    // use keyup event on CVV field
    $("#cvv").keyup(function(){
        if(validateCvvCode()){
            // if the user cvv code is valid set the input text and border to red
           $("#cvv").before(liveValidCvvCodeMessage)
           $('#live_valid_cvv_message').css({"font-size":"1em", "color":"green"});
           $("#cvv").css("border", "2px solid green");
           liveInvalidCvvCodeMessage.css("display","none");
           liveValidCvvCodeMessage.css("display","block");
           return true;
       } else{
           // if the user cvv code is not valid set the input text and border to red
           $("#cvv").before(liveInvalidCvvCodeMessage)
           $('#live_invalid_cvv_message').css({"font-size":"1em", "color":"red"});
           $("#cvv").css("border", "2px solid red");
           liveInvalidCvvCodeMessage.css("display","block");
           liveValidCvvCodeMessage.css("display","none");
           return false;   
       }
    });

    
    // name validation function
    function validateName(){
        // get value from name input
        const name = $("#name").val();
        const regexName = /^[A-Za-z]+\s?([A-Za-z]+)?$/; 
        if(regexName.test(name)){
            return true;
        } else{
            return false;
        }
    }
    // email validation function
    function validateEmail(){
        // get value from email input
        const email = $("#mail").val();
        const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(regexEmail.test(email)){
            return true;
        } else{
            return false;
        }
    }
    // card number validation function
    function validateCardNumber(){
        // get value from card input
        const cardValue = $("#cc-num").val();
        const regexCardNumber = /^\d{13,16}$/;
        if(regexCardNumber.test(cardValue)){
            return true;
        } else{
            return false;
        }
    }
    // zip code validation function
    function validateZipCode(){
        // get zip code value
        const zipCodeValue = $("#zip").val();
        const regexZipCode = /^\d{5}$|^\d{5}-\d{4}$/;
        if(regexZipCode.test(zipCodeValue)){
            return true;
        } else{
            return false;
        }
    }
    // CVV code validation function
    function validateCvvCode(){
        // get cvv code value
        const cvvValue = $("#cvv").val();
        const regexCvvCode = /^[0-9]{3,3}$/;
        if(regexCvvCode.test(cvvValue)){
            return true;
        } else{
            return false;
        }
    }

});


// ONSUBMIT VALIDATION ERROR MESSAGES FOR ALL INPUT FIELDS
// ON SUBMIT NAME INPUT VALIDATION FUNCTION
const nameInputValidationFun = () => {
    const $name = $('#name')
    if (($name).val().length === 0) {
        // checking of error when the length is greater than zero if there is an error
        if($('#error_name').length > 0) {
           return false;
        } else {
            // if the user name is not valid set the input text and border to red
            $("#name").before(liveInvalidNameMessage)
            $('#live_invalid_name_message').css({"font-size":"1em", "color":"red"});
            $("#name").css("border", "2px solid red");
            liveInvalidNameMessage.css("display","block");
            liveValidNameMessage.css("display","none"); 
            return false; 
        }
    } else {
        // remove all error when input is not empty
        $("#name").before(liveValidNameMessage)
            $('#live_valid_name_message').css({"font-size":"1em", "color":"green"});
            $("#name").css("border", "2px solid green");
            liveInvalidNameMessage.css("display","none");
            liveValidNameMessage.css("display","block");
            return true;
    }
}

// ON SUBMIT EMAIL INPUT VALIDATION FUNCTION
const emailInputValidationFun = () => {
    const $regexEmailExpresion = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // checking for valid email form the user
    const $isValidEmailExpresion = $regexEmailExpresion.test($email.val());
    if ($isValidEmailExpresion){
        // if the user email is valid set the input text and border to red
        $("#mail").before(liveValidEmailMessage)
        $('#live_valid_email_message').css({"font-size":"1em", "color":"green"});
        $("#mail").css("border", "2px solid green");
        liveInvalidEmailMessage.css("display","none");
        liveValidEmailMessage.css("display","block");
        return true;
    } else {
        // checking if there is an error from the user
        if($('#error_email').length > 0) 
        {   return false;
        } else {
            // if the user email is not valid set the input text and border to red
            $("#mail").before(liveInvalidEmailMessage)
            $('#live_invalid_email_message').css({"font-size":"1em", "color":"red"});
            $("#mail").css("border", "2px solid red");
            liveInvalidEmailMessage.css("display","block");
            liveValidEmailMessage.css("display","none");
            return false;
        }
    }

}

// ON SUBMIT ACTIVITIES CHECKED BOXES VALIDATION FUNCTION
const activitiesValidationFun = () => {
    let $numChecked = 0;
    let $checkbox = $('.activities input[type="checkbox"]');
    const $legend = $('.activities legend');
    //loops through checkbox items to check for 'checked' property
    for (i = 0; i < $checkbox.length; i ++){ 
        if ($checkbox.eq(i).prop('checked')) {
            $numChecked = $numChecked + 1;
        } 
    }
    if ($numChecked < 1){
        if($('#error_activities').length > 0) 
        {   return false;
        } else { 
            $legend.after(checkboxesvalidation);
            return false;
        }
    } else {
        $('#error_activities').css({"display":"none"}); 
        return true;
    }
}


//ON SUBMIT CREDIT CARD  VALIDATION FUNCTION
const creditCardValidationFun = () => {
        const $regexCardExpression = /^\d{13,16}$/; 
        // check if the credit card number is valid(bewteen 13 and 16 digits)
        const $isValidCardExpression = $regexCardExpression.test($cardNumber.val());
        if ($cardNumber.val().length > 0 && $isValidCardExpression == true){
            // if the user credit credit number is valid set the input text and border to red
            $("#cc-num").before(liveValidCreditNumberMessage)
            $('#live_valid_card_message').css({"font-size":"1em", "color":"green"});
            $("#cc-num").css("border", "2px solid green");
            liveInvalidCreditNumberMessage.css("display","none");
            liveValidCreditNumberMessage.css("display","block");
            return true;
        } else {
            if($('#error_credit_card').length > 0) 
            {   return false;
            } else {
            // if the user credit card number is not valid set the input text and border to red
            $("#cc-num").before(liveInvalidCreditNumberMessage)
            $('#live_invalid_card_message').css({"font-size":"1em", "color":"red"});
            $("#cc-num").css("border", "2px solid red");
            liveInvalidCreditNumberMessage.css("display","block");
            liveValidCreditNumberMessage.css("display","none");
            return false;
            }
        }
    }

    // ON SUBMIT ZIPCODE INPUT VALIDATION FUNCTION
    const zipcodeValidationFun = () =>{
        const $regexZipCodeExpreesion = /^\d{5}$|^\d{5}-\d{4}$/;
        // checking for valid zipcode from user 
        const $isValidZipCode = $regexZipCodeExpreesion.test($zipCodeNumber.val());
        // if there is a valid input do not dispaly an error message 
        if ($zipCodeNumber.val().length > 0 && $isValidZipCode == true){
            // if the user zip code is valid set the input text and border to red
            $("#zip").before(liveValidZipcodeMessage)
            $('#live_valid_zipcode_message').css({"font-size":"1em", "color":"green"});
            $("#zip").css("border", "2px solid green");
            liveInvalidZipcodeMessage.css("display","none");
            liveValidZipcodeMessage.css("display","block");
            return true;
            // else, display an error message
        } else {
            if($('#error_zipcode').length > 0)
            {   return false;
            } else {
            // if the user zip code is not valid set the input text and border to red
           $("#zip").before(liveInvalidZipcodeMessage)
           $('#live_invalid_zipcode_message').css({"font-size":"1em", "color":"red"});
           $("#zip").css("border", "2px solid red");
           liveInvalidZipcodeMessage.css("display","block");
           liveValidZipcodeMessage.css("display","none");
           return false; 
            }
        }
    }

   // ON SUBMIT CVV INPUT VALIDATION FUNCTION
    const cvvCodeValidationFun = () => {
        const $regexCvvCodeExpreesion = /^[0-9]{3,3}$/;
        // checking if the cvv code is valid
        const $isValidCvvExpression = $regexCvvCodeExpreesion.test($cvvCode.val());
        if ($cvvCode.val().length > 0 && $isValidCvvExpression == true){
             // if the user cvv code is valid set the input text and border to red
           $("#cvv").before(liveValidCvvCodeMessage)
           $('#live_valid_cvv_message').css({"font-size":"1em", "color":"green"});
           $("#cvv").css("border", "2px solid green");
           liveInvalidCvvCodeMessage.css("display","none");
           liveValidCvvCodeMessage.css("display","block");
           return true;
        } else {
            if($('#error_cvvcode').length > 0)
            {   return false;
            } else {
            // if the user cvv code is not valid set the input text and border to red
           $("#cvv").before(liveInvalidCvvCodeMessage)
           $('#live_invalid_cvv_message').css({"font-size":"1em", "color":"red"});
           $("#cvv").css("border", "2px solid red");
           liveInvalidCvvCodeMessage.css("display","block");
           liveValidCvvCodeMessage.css("display","none");
           return false; 
            }
        }
    }


/* ############## ACTIVITIES / CHECKBOX SECTION ############## */
allCheckedActivities.change(function(event){
    targetedCheckedValue = $(event.target);
    // geting all attribute as data-day-and-time
    date_and_time_attr = targetedCheckedValue.attr('data-day-and-time');
    //parsing the input clicked to an integer value when click
    dataCost = parseInt(targetedCheckedValue.attr('data-cost').slice(-3));
    // checking if a checkedbox property is check
    if (targetedCheckedValue.prop('checked')) {
        totalActivityCost += dataCost;
    } else
        totalActivityCost -= dataCost;
    $('.activities div').html('<div>Total Cost: $' + totalActivityCost + '</div>');
    // looping over all items and checking if a single item is checked by the name attribute
    allElementItems = $('.activities input');
    for (let i = 0; i <= allElementItems.length; i++) {
        nameAttribute = targetedCheckedValue.attr('name');
        if (targetedCheckedValue.prop('checked')) {  
            // checking for both attributes on each item
            if (date_and_time_attr === $(allElementItems[i]).attr('data-day-and-time') && 
                nameAttribute != $(allElementItems[i]).attr('name')) { 
               //if attributes matched, matching items disabled
                $(allElementItems[i]).attr('disabled', true); 
            }
        } else {
              // if not, remove disabled from from item
            if (date_and_time_attr === $(allElementItems[i]).attr('data-day-and-time') && 
                nameAttribute != $(allElementItems[i]).attr('name')) {
                $(allElementItems[i]).removeAttr('disabled');
            }
        }
    }
})


/* #################### T.SHIRT SECTION #################### */
$('#design').on('change', function(){
    if ($('#design option:selected').val() == "js puns"){
        $('#color').show();
        $('#color option[value="cornflowerblue"]').show().attr('selected', 'selected');
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();
        $('#color option[value="tomato"]').hide().attr('selected', false);
        $('#color option[value="steelblue"]').hide();
        $('#color option[value="dimgrey"]').hide();

    }else if ($('#design option:selected').val() == 'heart js'){
        $('#color').show();
        $('#color option[value="cornflowerblue"]').hide().attr('selected', false);
        $('#color option[value="darkslategrey"]').hide();
        $('#color option[value="gold"]').hide();
        $('#color option[value="tomato"]').show().attr('selected', true);
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();
    }
});

// SUBMIT HANDLER ON BUTTON - CHECKS IF ALL THE VALIDATIONS FUNCTION RETURNS TRUE ON SUBMIT FORM
button.addEventListener('click', (event) => {
    if (creditCard.selected) {
       nameInputValidationFun() 
       emailInputValidationFun() 
       activitiesValidationFun()
       creditCardValidationFun() 
       zipcodeValidationFun()
       cvvCodeValidationFun() 
    if (!nameInputValidationFun()  || !emailInputValidationFun() || !activitiesValidationFun() || 
        !creditCardValidationFun() || !zipcodeValidationFun() || !cvvCodeValidationFun()) {
        event.preventDefault();
    }
   } else if (!creditCard.selected) {
        nameInputValidationFun() 
        emailInputValidationFun() 
        activitiesValidationFun()
        if (!nameInputValidationFun() || !emailInputValidationFun() || !activitiesValidationFun()) {
        event.preventDefault();
    } 
   } else {
        nameInputValidationFun() 
        emailInputValidationFun() 
        activitiesValidationFun()
        if (nameInputValidationFun() || emailInputValidationFun() || activitiesValidationFun()) {
        event.preventDefault();
    }  
  }
});

