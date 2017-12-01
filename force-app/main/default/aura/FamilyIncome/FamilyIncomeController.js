/**
 * Created by skvarma on 2017-11-29.
 */
({
    doInit: function(component, event, helper){

            helper.setDisplayColumns(component);
            var action = component.get("c.getFamilyFYIncome");
            action.setParams({"familyName":component.get("v.familyName"),
                              "fiscalYear":component.get("v.fiscalYear")});


            action.setCallback(this, function(response){
                var state = response.getState();
                if (state == "SUCCESS"){
                    component.set("v.familyIncome",response.getReturnValue());
                    helper.calcSummaryIncome2(component);
                }
                else {
                    console.log('Problem getting Family Income, response state: ' + state);
                }
            });
            $A.enqueueAction(action);
        },

    changeSectionState : function changeSectionState(component){
             component.set('v.isExpanded',!component.get('v.isExpanded'));
    },

})