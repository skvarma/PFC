/**
 * Created by skvarma on 2017-11-29.
 */

public with sharing class Contribution {

    @AuraEnabled
    public static List<pfc_Annual_Contributions__c> getAnnualContributions(String familyName, Integer fiscalYear){
        return [
                SELECT
                        Affects_RRSP_Limit__c,
                        Affects_TFSA_Limit__c,
                        Contribution_Amount__c,
                        Contribution_Applies_to_FY__c,
                        Contribution_Description__c,
                        Contribution_Source__c,
                        Contribution_Type__c,
                        Fiscal_Year__c,
                        Id,
                        Individual__c,
                        Individual_Name__c,
                        Name,
                        Pre_Tax_Contribution__c
                FROM pfc_Annual_Contributions__c
                WHERE Individual__r.Family__c = :familyName AND Fiscal_Year__r.Year__c = :fiscalYear
                ORDER BY Individual__c,Contribution_Type__c, Contribution_Source__c];

    }

    @AuraEnabled
    public static List<pfc_Annual_Limit__c> getAnnualLimits(String familyName, Integer fiscalYear){
        return [
                SELECT
                        Fiscal_Year__c,
                        Id,
                        Individual__c,
                        Name,
                        RRSP_Limit__c,
                        RRSP_Limit_Used__c,
                        TFSA_Limit__c,
                        TFSA_Limit_Used__c
                FROM pfc_Annual_Limit__c
                WHERE Individual__r.Family__c = :familyName AND Fiscal_Year__r.Year__c = :fiscalYear
        ];
    }

    @AuraEnabled
    public static List<pfc_Individual__c> getFamilyMembers(String familyName){
        return [
                SELECT
                        DOB__c,
                        Family__c,
                        Id,
                        Name,
                        Order_in_Family__c
                FROM pfc_Individual__c
                WHERE Family__c = :familyName
                ORDER BY Order_in_Family__c asc];
    }

}