/**
 * Created by skvarma on 2017-11-27.
 */
({
    doInit: function(component, event, helper){
        var action = component.get("c.getFamilyMembers");
        action.setParams({"familyName":component.get("v.familyName")});

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state == "SUCCESS"){
                component.set("v.familyMembers",response.getReturnValue());
            }
            else {
                console.log('Problem getting Family Members, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
})