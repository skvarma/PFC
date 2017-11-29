/**
 * Created by skvarma on 2017-11-29.
 */
({
    calcSummaryIncome: function(component){
                var action = component.get("c.getSummaryFYIncome");
                action.setParams({"incomeLst":component.get("v.familyIncome")})

                action.setCallback(this, function(response){
                    var state = response.getState();
                    if (state == "SUCCESS"){
                        component.set("v.summaryFamilyIncome",response.getReturnValue());
//                        this.setDisplayColumns(component);
                    }
                    else{
                        console.log('Problem getting Summary Family Income, response state: ' + state);
                    }
                });
                $A.enqueueAction(action);
    },

    setDisplayColumns: function(component){
        component.set('v.displayCols',[{label: 'Individual Name', fieldName: 'Individual_Name__c', type: 'text'},
                                       {label: 'Income Source', fieldName: 'Income_Source__c', type: 'text'},
                                       {label: 'Amount', fieldName: 'Amount__c', type: 'currency'}]);
    },
})