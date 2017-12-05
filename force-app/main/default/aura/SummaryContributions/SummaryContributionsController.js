/**
 * Created by skvarma on 2017-12-04.
 */
({
    calcSummary : function(component, event, helper){

//        var individualLst = component.get("v.familyMembers");
//        var contributionLst = component.get("v.annualContributions");
//        var limitsLst = component.get("v.annualLimits");
//        var contributionType = component.get("v.contributionType");
//        var familyName = component.get("v.familyName");
//        var fiscalYear = component.get("v.fiscalYear");

        // Calculate Summary for Family
        helper.calcFamilyContributionSummary(component);

        // Calculate Individual Summary

//        for(var counter in individualLst){
//            // Calculate Individual Summary
//            //helper.calcSummary();
//        }
    },

    changeSectionState : function changeSectionState(component){
             component.set('v.isExpanded',!component.get('v.isExpanded'));
    },

})