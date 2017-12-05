/**
 * Created by skvarma on 2017-12-04.
 */
({
    calcSummary : function(component, event, helper){

        var individualLst = component.get("v.familyMembers");
        var contributionLst = component.get("v.annualContributions");
        var limitsLst = component.get("v.annualLimits");

        if (individualLst.length > 0 && contributionLst.length > 0  && limitsLst.length > 0){

            // Calculate Summary for Family
            helper.calcFamilyContributionSummary(component);

            // Calculate Individual Summary
            helper.calcIndividualSummary(component);
        }
    },

    changeSectionState : function changeSectionState(component){
             component.set('v.isExpanded',!component.get('v.isExpanded'));
    },

})