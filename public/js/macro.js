$(document).ready(function(){


    $(".body-info").addClass("hidden");
    $(".pa-factor").addClass("hidden");
    $(".submit").addClass("hidden");

    var goal = 0;
    var goalStr = "";

    $("#bf-goal").on("click", function(){
        $(this).removeClass("inactive");
        $(".gm-goal").addClass("inactive");
        $(".mw-goal").addClass("inactive");
        goalStr = $(this).attr("value");
        if (goal !=1){
            goal = 1;
        }
        console.log(goalStr);
    });

   
    $("#gm-goal").on("click", function(){
        $(this).removeClass("inactive");
        $(".bf-goal").addClass("inactive");
        $(".mw-goal").addClass("inactive");
        goalStr = $(this).attr("value");
        if (goal !=2){
            goal = 2;
        }
        console.log(goalStr);
    });

    $("#mw-goal").on("click", function(){
        $(this).removeClass("inactive");
        $(".gm-goal").addClass("inactive");
        $(".bf-goal").addClass("inactive");
        goalStr = $(this).attr("value");
        if (goal !=3){
            goal = 3;
        }
        console.log(goalStr);
    });


    //calculate maintenance calories need: weight, height, age, activity, gender
    function calcCals (kg, pa, age, ht, gender){
        if (gender == "male"){
            return Math.round(((kg*10)+(ht*6.25)-(5*age)+5)*pa)
        } else {
            return Math.round(((kg*10)+(ht*6.25)-(5*age)-161)*pa);
        }
    }

    //calculate macro breakdown
    function calcMacros(goal, maintenanceCals, wt){
        var recCals = 0;
        var protein = 0;
        var carbs = 0;
        var fats = 0;
        var recommended = {};

        switch(goal){
            case 1:
                //Lose body fat -- 
                //20% below main cals, fats 25%, protein 1g/pound, 
                recCals = maintenanceCals - (maintenanceCals*0.2);
                protein = (wt * 1.0);
                fats = ((recCals * 0.25)/9);
                carbs = (recCals - (protein*4) - (fats*9))/4;
                break;
            case 2:
                //Gain muscle -- 
                //10% above main cals, fats 20%, protein 1g/pound, 
                recCals = maintenanceCals + (maintenanceCals*0.1);
                protein = (wt * 1.0);
                fats = ((recCals * 0.20)/9);
                carbs = (recCals - (protein*4) - (fats*9))/4;
                break;
            case 3:
                //Maintain weight-- 
                //maintenance cals, fats 25%, protein 1.2g/pound, 
                recCals = maintenanceCals;
                protein = (wt * 1.0);
                fats = ((recCals * 0.25)/9);
                carbs = (recCals - (protein*4) - (fats*9))/4;
                break;
        }
        
        recommended = {
            recCals: Math.round(recCals),
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fats: Math.round(fats)
        }
        console.log(recommended);
    }

    $("#submit").on('click touchstart', function(event){
        event.preventDefault();
        var pa = parseFloat($("input[name='pa']:checked").val());
        var meal_count = parseInt($("input[id='meal-count']").val());
        
            var wt = $("#weight").val();
            var kg = Math.round(wt/2.2);
            var age = parseInt($("#age").val());
            var gender = $("input[name='gender']:checked").val();
            var feet = parseFloat($("#feet").val());
            var inches = parseFloat($("#inches").val());
            var ht = Math.round(((feet*12)+inches)*2.54);
            
            
            var maintenanceCals = calcCals(kg, pa, age, ht, gender);
            console.log("maintenance cals", maintenanceCals);
            
            calcMacros(goal, maintenanceCals, wt);


     
    });


});