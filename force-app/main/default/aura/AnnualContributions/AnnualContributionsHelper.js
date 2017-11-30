/**
 * Created by skvarma on 2017-11-29.
 */
({
        getLimits: function(component){
                    var action = component.get("c.getAnnualLimits");
                    action.setParams({"familyName":component.get("v.familyName"),
                                      "fiscalYear":component.get("v.fiscalYear")});

                    action.setCallback(this, function(response){
                        var state = response.getState();
                        if (state == "SUCCESS"){
                            component.set("v.annualLimits",response.getReturnValue());
    //                        this.setDisplayColumns(component);
                        }
                        else{
                            console.log('Problem getting Annual Limits, response state: ' + state);
                        }
                    });
                    $A.enqueueAction(action);
        },
})