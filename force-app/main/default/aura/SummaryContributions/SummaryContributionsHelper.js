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
        familySummary.totalContribution = totalContribution;
        familySummary.totalContributionLimit = totalContributionLimit;
        familySummary.totalContributionLimitRemaining = this.getContributionRemaining(totalContribution, totalContributionLimit);
        familySummary.contributionUsedPercent = " (" + (this.getContributionPercentUsed(totalContribution, totalContributionLimit))*100 + "% used)";

        component.set("v.familySummary", familySummary);
    },

    calcIndividualSummary: function(component){
        var individualLst = component.get("v.familyMembers");
        var contributionLst = component.get('v.annualContributions');
        var contributionType = component.get("v.contributionType");
        var indiidualSummLst = new Array();
        var contributionLimitLst = component.get("v.annualLimits");
        var totalContribution = 0.0;
        var totalContributionLimit = 0.0;
        var totalContributionLimitRemaining = 0.0;
        var contributionUsedPercent = "";
        var individualContributionMap = new Map();
        var individualLimitMap = new Map();

        // Create a map of Contributions and limits with Individual ID as the Key
        for(var indCount in individualLst){
            var individual = individualLst[indCount];
            individualContributionMap.set(individual.Id, new Array());
            individualLimitMap.set(individual.Id, new Array());
        }

        // Updating Contribution Map with one entry per Individual
        for (var counter in contributionLst){
            var contribution = contributionLst[counter];
            //var indContributionLst = individualContributionMap.get(contribution.Individual__c);
            individualContributionMap.get(contribution.Individual__c).push(contribution);
            //individualContributionMap.set(contribution.Individual__c, indContributionLst);
        }

        // Updating Limit Map with one entry per Individual
        for (var counter in contributionLimitLst){
            var limit = contributionLimitLst[counter];
            individualLimitMap.get(limit.Individual__c).push(limit);
        }

        // Iterating over Individuals to Create individual Summary
        for(var indCount in individualLst){
            var indSummary = new Object();
            var individual = individualLst[indCount];
            var indContributionLst = individualContributionMap.get(individual.Id);
            var indLimitLst = individualLimitMap.get(individual.Id);
            indSummary.individualName = individual.Name;
            indSummary.Id = individual.Id;
            totalContribution = this.getContributionSummary(contributionType, indContributionLst);
            totalContributionLimit = this.getContributionLimit(contributionType, indLimitLst);
            indSummary.totalContribution = totalContribution;
            indSummary.totalContributionLimit = totalContributionLimit;
            indSummary.totalContributionLimitRemaining = this.getContributionRemaining(totalContribution, totalContributionLimit);
            indSummary.contributionUsedPercent = this.getContributionPercentUsed(totalContribution, totalContributionLimit);

            indiidualSummLst.push(indSummary);
        }

        component.set("v.individualSummaryLst", indiidualSummLst);
    },

    getContributionSummary : function(contributionType, contributionLst){
        var totalContribution = 0.0;
        for(var counter in contributionLst){
            var contribution = contributionLst[counter];

            if ((contribution.Contribution_Type__c == contributionType) || (contributionType == "RRSP" && contribution.Contribution_Type__c == "Pension")){
                totalContribution = totalContribution + contribution.Contribution_Amount__c;
            }
        }
        return totalContribution;
    },

    getContributionLimit : function(contributionType, contributionLimitLst){
         var totalContributionLimit = 0.0;
         for(var counter in contributionLimitLst){
            var limit = contributionLimitLst[counter];
            if ((contributionType == "RRSP") || (contributionType == "Pension")){
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
            contributionUsedPercent =  ((totalContribution/totalContributionLimit)).toFixed(4);
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

    setDisplayColumns: function(component){
        component.set('v.displayCols',[{label: 'Name', fieldName: 'individualName', type: 'text'},
                                       {label: 'Contribution', fieldName: 'totalContribution', type: 'currency', typeAttributes: { currencyCode: 'CAD' }},
                                       {label: 'Limit', fieldName: 'totalContributionLimit', type: 'currency', typeAttributes: { currencyCode: 'CAD' }},
                                       {label: 'UnUsed', fieldName: 'totalContributionLimitRemaining', type: 'currency', typeAttributes: { currencyCode: 'CAD' }},
                                       {label: 'Used(%)', fieldName: 'contributionUsedPercent', type: 'percent'}]);
    },
})