/**
 * Created by skvarma on 2017-11-29.
 */

public with sharing class Income {


    @AuraEnabled
    public Static List<pfc_Income__c> getFamilyFYIncome(String familyName, Integer fiscalYear){
        return [
                SELECT
                        Amount__c,
                        Fiscal_Year__c,
                        Fiscal_Year__r.Name,
                        Id,
                        Income_Source__c,
                        Income_Tax_Type__c,
                        Individual__c,
                        Individual_Name__c,
                        Name
                FROM pfc_Income__c WHERE Individual__r.Family__c = :familyName AND Fiscal_Year__r.Year__c = :fiscalYear
                ORDER BY Individual__c, Amount__c DESC];
    }

    @AuraEnabled
    public Static Decimal getSummaryFYIncome(List<pfc_Income__c> incomeLst){
        Decimal totalIncome = 0.0;
        for(pfc_Income__c income:incomeLst){
            totalIncome = totalIncome + income.Amount__c;
        }
        return totalIncome;
    }

}