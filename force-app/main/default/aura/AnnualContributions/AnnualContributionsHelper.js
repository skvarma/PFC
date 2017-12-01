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
                            //this.(component);
                        }
                        else{
                            console.log('Problem getting Annual Limits, response state: ' + state);
                        }
                    });
                    $A.enqueueAction(action);
        },

        getFamilyMembers: function(component){
                            var action = component.get("c.getFamilyMembers");
                            action.setParams({"familyName":component.get("v.familyName")});

                            action.setCallback(this, function(response){
                                var state = response.getState();
                                if (state == "SUCCESS"){
                                    component.set("v.familyMembers",response.getReturnValue());
                                }
                                else{
                                    console.log('Problem getting Family Members, response state: ' + state);
                                }
                            });
                            $A.enqueueAction(action);
        },

        getAnnualContributions: function(component){
            var action = component.get("c.getAnnualContributions");
            action.setParams({"familyName":component.get("v.familyName"),
                              "fiscalYear":component.get("v.fiscalYear")});

            action.setCallback(this, function(response){
            var state = response.getState();
            if (state == "SUCCESS"){
                component.set("v.annualContributions",response.getReturnValue());
                    //helper.getLimits(component);
                }
                else {
                    console.log('Problem getting Annual Contributions, response state: ' + state);
                }
            });
            $A.enqueueAction(action);
        },
})