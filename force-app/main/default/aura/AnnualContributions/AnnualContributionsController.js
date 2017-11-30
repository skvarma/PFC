/**
 * Created by skvarma on 2017-11-29.
 */
({
    doInit: function(component, event, helper){

            //helper.setDisplayColumns(component);
            var action = component.get("c.getAnnualContributions");
            action.setParams({"familyName":component.get("v.familyName"),
                              "fiscalYear":component.get("v.fiscalYear")});


            action.setCallback(this, function(response){
                var state = response.getState();
                if (state == "SUCCESS"){
                    component.set("v.annualContributions",response.getReturnValue());
                    helper.getLimits(component);
                }
                else {
                    console.log('Problem getting Annual Contributions, response state: ' + state);
                }
            });
            $A.enqueueAction(action);
        },
})