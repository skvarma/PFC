/**
 * Created by skvarma on 2017-12-04.
 */
({
    calcFamilyContributionSummary : function(component){
        var contributionLst = component.get('v.annualContributions');
        var contributionType = component.get("v.contributionType");
        var familySummary = component.get("v.familySummary");
        var contributionLimitLst = component.get("v.annualLimits");
        var totalContribution = 0.0;
        var totalContributionLimit = 0.0;
        var contributionUsedPercent = "";
        //alert("Hello");

        familySummary.familyName = component.get("v.familyName");
        familySummary.fiscalYear = component.get("v.fiscalYear");
        familySummary.contributionType = component.get("v.contributionType");
        //console.log("contributionLst = " + component.get("v.annualContributions"));
        for(var counter in contributionLst){
            var contribution = contributionLst[counter];
            if (contribution.Contribution_Type__c == contributionType){
                totalContribution = totalContribution + contribution.Contribution_Amount__c;
            }
        }

        for(var counter in contributionLimitLst){
            var limit = contributionLimitLst[counter];
            if (contributionType == "RRSP"){
                totalContributionLimit = totalContributionLimit + limit.RRSP_Limit__c;
            } else if (contributionType == "TFSA"){
                totalContributionLimit = totalContributionLimit + limit.TFSA_Limit__c;
            }
        }
        familySummary.totalContribution = totalContribution;
        familySummary.totalContributionLimit = totalContributionLimit;

        if (totalContributionLimit != 0){
            familySummary.totalContributionLimitRemaining = totalContributionLimit - totalContribution;
            familySummary.contributionUsedPercent = " (" + ((totalContribution/totalContributionLimit)*100).toFixed(2) + "% used)";
        }

        component.set("v.familySummary", familySummary);


    },
})