/**
 * Created by skvarma on 2017-12-04.
 */

public with sharing class SummaryContribution {

    public String familyName{public get; public set;}
    public String individualName;
    public String fiscalYear;
    public String contributionType;
    public Decimal totalContribution;
    public Decimal totalLimit;
    public Decimal remainingContribution;

}