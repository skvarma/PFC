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
        var totalContributionLimitRemaining = 0.0;
        var contributionUsedPercent = "";

        familySummary.familyName = component.get("v.familyName");
        familySummary.fiscalYear = component.get("v.fiscalYear");
        familySummary.contributionType = component.get("v.contributionType");

        totalContribution = this.getContributionSummary(contributionType, contributionLst);
        totalContributionLimit = this.getContributionLimit(contributionType, contributionLimitLst);
        //totalContributionLimitRemaining
        familySummary.totalContribution = totalContribution;
        familySummary.totalContributionLimit = totalContributionLimit;
        familySummary.totalContributionLimitRemaining = this.getContributionRemaining(totalContribution, totalContributionLimit);
        familySummary.contributionUsedPercent = this.getContributionPercentUsed(totalContribution, totalContributionLimit);

        component.set("v.familySummary", familySummary);
    },

    calcIndividualSummary: function(component){
        var individualLst = component.get("v.familyMembers");
        var contributionLst = component.get('v.annualContributions');
        var contributionType = component.get("v.contributionType");
        var indiidualSummLst = [];//component.get("v.individualSummaryLst");
        var contributionLimitLst = component.get("v.annualLimits");
        var totalContribution = 0.0;
        var totalContributionLimit = 0.0;
        var totalContributionLimitRemaining = 0.0;
        var contributionUsedPercent = "";
        var individualContributionMap = new Map();
        var individualLimitMap = new Map();


        for(var indCount in individualLst){
            var individual = individualLst[indCount];
            individualContributionMap.set(individual.Id, new Array());
            individualLimitMap.set(individual.Id, new Array());
        }

        // Creating Contribution Map with one entry per Individual
        for (var counter in contributionLst){
            var contribution = contributionLst[counter];
            //var indContributionLst = individualContributionMap.get(contribution.Individual__c);
            individualContributionMap.get(contribution.Individual__c).push(contribution);
            //individualContributionMap.set(contribution.Individual__c, indContributionLst);
        }
        console.log("Contribution Map size = " +  individualContributionMap.size);

        // Creating Limit Map with one entry per Individual
        for (var counter in contributionLimitLst){
            var limit = contributionLimitLst[counter];
            individualLimitMap.get(limit.Individual__c).push(limit);
        }
        console.log("Limit Map size = " +  individualLimitMap.size);

        // Iterating over Individual to Create individual Summary
        for(var indCount in individualLst){
            var indSummary = new Object();
            var individual = individualLst[indCount];
            var indContributionLst = individualContributionMap.get(individual.Id);
            var indLimitLst = individualLimitMap.get(individual.Id);
            console.log("Name = " + individual.Name);
            console.log("indContributionLst = " + indContributionLst.length);
            console.log("indLimitLst = " + indLimitLst.length);
            indSummary.individualName = individual.Name;
            totalContribution = this.getContributionSummary(contributionType, indContributionLst);
            totalContributionLimit = this.getContributionLimit(contributionType, indLimitLst);
            //totalContributionLimitRemaining
            indSummary.totalContribution = totalContribution;
            indSummary.totalContributionLimit = totalContributionLimit;
            indSummary.totalContributionLimitRemaining = this.getContributionRemaining(totalContribution, totalContributionLimit);
            indSummary.contributionUsedPercent = this.getContributionPercentUsed(totalContribution, totalContributionLimit);
            //indSummary.

            indiidualSummLst.push(indSummary);
        }
        component.set("v.individualSummaryLst", indiidualSummLst);


        //for (var [key, valueLst] of individualContributionMap) {
          //console.log(key + ' goes ' );//+ value.Contribution_Type__c);

          //for (var value in valueLst)
          //  console.log(valueLst[value].Contribution_Type__c);
        //}
        //familySummary.familyName = component.get("v.familyName");
        //familySummary.fiscalYear = component.get("v.fiscalYear");
        //familySummary.contributionType = component.get("v.contributionType");
    },

    getContributionSummary : function(contributionType, contributionLst){
        var totalContribution = 0.0;
        for(var counter in contributionLst){
            var contribution = contributionLst[counter];
            if (contribution.Contribution_Type__c == contributionType){
                totalContribution = totalContribution + contribution.Contribution_Amount__c;
            }
        }
        return totalContribution;
    },

    getContributionLimit : function(contributionType, contributionLimitLst){
         var totalContributionLimit = 0.0;
         for(var counter in contributionLimitLst){
            var limit = contributionLimitLst[counter];
            if (contributionType == "RRSP"){
                totalContributionLimit = totalContributionLimit + limit.RRSP_Limit__c;
            } else if (contributionType == "TFSA"){
                totalContributionLimit = totalContributionLimit + limit.TFSA_Limit__c;
            }
         }
         return totalContributionLimit;
    },


    getContributionPercentUsed : function(totalContribution, totalContributionLimit){
        var contributionUsedPercent = "";
        if (totalContributionLimit != 0){
            contributionUsedPercent = " (" + ((totalContribution/totalContributionLimit)*100).toFixed(2) + "% used)";
        }
        return contributionUsedPercent;
    },

    getContributionRemaining : function(totalContribution, totalContributionLimit){
        var contributionRemaining = 0.0;
        if (totalContributionLimit != 0){
            contributionRemaining = totalContributionLimit - totalContribution;
        }
        return contributionRemaining;
    },

})