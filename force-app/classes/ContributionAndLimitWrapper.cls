/**
 * Created by skvarma on 2017-11-29.
 */

public with sharing class ContributionAndLimitWrapper {

    private String contributionType{get;set;}
    private Id individualId{get;set;}
    private String familyName{get;set;}
    private Decimal totalContribution{get;set;}
    private Decimal totalLimit{get;set;}
    private Decimal totalLimitRemaining{get;set;}
//    private List<pfc_Annual_Contributions__c> annualContributions{get;}
//    private List<pfc_Annual_Limit__c> annualLimits{get;}
//    //private List<pfc_Individual__c> individuals{get;}
//
//    public ContributionAndLimitWrapper(List<pfc_Annual_Contributions__c> annualContributions, List<pfc_Annual_Limit__c> annualLimits){
//        this.annualContributions = annualContributions;
//        this.annualLimits = annualLimits;
//    }












}