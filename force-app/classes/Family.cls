/**
 * Created by skvarma on 2017-11-27.
 */

public with sharing class Family {

    @AuraEnabled
    public Static List<pfc_Individual__c> getFamilyMembers(String familyName){
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