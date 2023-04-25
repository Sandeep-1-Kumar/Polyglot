package team4.slupolyglot.model;

import team4.slupolyglot.repositories.Translation;
import java.util.HashMap;
import java.util.Locale;
import static team4.slupolyglot.MyConstants.*;

public class EnglishSwahiliTranslation implements Translation {

    private final String[] SWAHILI_VERB_JOINER = 
    {"ni", "u", "a", "tu", "m", "wa"};
    private final String[] SWAHILI_NEGATIVE_PRONOUNS_PREFIXES = 
    {"si", "hu", "ha", "hatu", "ham", "hawa"};
    private final static String PRESENT_TENSE_JOINER = "na";
    private final static String FUTURE_TENSE_JOINER = "ta";
    private final static String PAST_TENSE_JOINER = "li";
    private final static String PERFECT_TENSE_JOINER = "me";
    private final static String NEGATIVE_PERFECT_TENSE_JOINER = "ja";
    private final static String IMPERATIVE_TENSE_JOINER = "";
    private final String[] SWAHILI_IMPERATIVE_PRONOUNS_PREFIXES = 
    {"ni","eni"};
    private final String[] SWAHILI_EXCEPTIONAL_STRINGS =
    {"leta","ja","enda","ji"};
    private final String[] SWAHILI_EXCEPTIONAL_JOINERS = 
    {"e", "oo", "na-mn","e"};
    private boolean isNegative = false;
    
    public HashMap<String, String> getVerbJoiner() {
        return verbJoiner;
    }
    
    public void setVerbJoiner(HashMap<String, String> verbJoiner) {
        this.verbJoiner = verbJoiner;
    }
    private HashMap<String, String> verbJoiner = new HashMap<>() {{
        put(GENERAL_PRONOUNS[0], SWAHILI_VERB_JOINER[0]);
        put(GENERAL_PRONOUNS[1], SWAHILI_VERB_JOINER[1]);
        put(GENERAL_PRONOUNS[2], SWAHILI_VERB_JOINER[2]);
        put(GENERAL_PRONOUNS[3], SWAHILI_VERB_JOINER[3]);
        put(GENERAL_PRONOUNS[4], SWAHILI_VERB_JOINER[4]);
        put(GENERAL_PRONOUNS[5], SWAHILI_VERB_JOINER[5]);
    }};

    private HashMap<String, String> negativePronouns = new HashMap<>() {{
        put(GENERAL_PRONOUNS[0], SWAHILI_NEGATIVE_PRONOUNS_PREFIXES[0]);
        put(GENERAL_PRONOUNS[1], SWAHILI_NEGATIVE_PRONOUNS_PREFIXES[1]);
        put(GENERAL_PRONOUNS[2], SWAHILI_NEGATIVE_PRONOUNS_PREFIXES[2]);
        put(GENERAL_PRONOUNS[3], SWAHILI_NEGATIVE_PRONOUNS_PREFIXES[3]);
        put(GENERAL_PRONOUNS[4], SWAHILI_NEGATIVE_PRONOUNS_PREFIXES[4]);
        put(GENERAL_PRONOUNS[5], SWAHILI_NEGATIVE_PRONOUNS_PREFIXES[5]);
    }};

    private HashMap<String, String> imperativeExceptions = new HashMap<>() {{
        put(SWAHILI_EXCEPTIONAL_STRINGS[0], SWAHILI_EXCEPTIONAL_JOINERS[0]);
        put(SWAHILI_EXCEPTIONAL_STRINGS[1], SWAHILI_EXCEPTIONAL_JOINERS[1]);
        put(SWAHILI_EXCEPTIONAL_STRINGS[2], SWAHILI_EXCEPTIONAL_JOINERS[2]);
        put(SWAHILI_EXCEPTIONAL_STRINGS[3], SWAHILI_EXCEPTIONAL_JOINERS[3]);
    }};

    private boolean validateSwahiliVerb(String verb) {
        String lowerVerb = verb.toLowerCase(Locale.ROOT);
        int strLen = lowerVerb.length();
        if(strLen <= 2)
            throw new IllegalArgumentException
            ("This verb is invalid: too short");
        return true;
    }

    private boolean checkDiSyllables(String verb){
        verb = verb.toLowerCase(Locale.ROOT);
        return !SyllableCounter.checkMutliSyllable(verb);
    }
    
    private boolean validateFeatures(String features){
        String[] splitFeature = features.split("\\+");
        int featuresLen = splitFeature.length;
        return featuresLen == 3 || featuresLen == 4;
    }

    @Override
    public String translate(Verb verb, String features) {
        validateSwahiliVerb(verb.getSwahiliVerb());
        features = features + "+" + verb.getEnglishVerb();
        if(!validateFeatures(features)){
            throw new  IllegalArgumentException("error features");
        }
        String[] splitFeature = features.split("\\+");
        int featuresLen = splitFeature.length;
        int index = featuresLen == 3 ? 0 : 1;
        isNegative = featuresLen != 3;
        String pronoun = splitFeature[index];
        String tense = splitFeature[index+1];
        if(isNegative){
            return this.computeNegativeStatements(pronoun,
            verb.getSwahiliVerb(), tense);
        }
        return this.computeNonNegativeStatements(pronoun,
        verb.getSwahiliVerb(), tense);
    }

    public String computeNonNegativeStatements
    (String person, String verb, String tense) {
        String root = verb;
        String retString = "";
        if(tense.equals(IMPERATIVE)){
            retString = imperativeTenseHandler(root, person);
            return retString;
        }
        else{
            if(!this.checkDiSyllables(verb)){
                root = verb.substring(2);
            }
            String teneString = this.tenseJoiner(root, tense);
            String personString = this.personJoiner(teneString, person);
            retString = personString;
        }
        return retString;
    }

    public String lastCharCheck(String inputString){
        String modifiedString = inputString;
        char lastChar = inputString.charAt(inputString.length() - 1);
        if(lastChar == 'a' || lastChar == 'A'){
            modifiedString = inputString.substring(0, inputString.length() - 1) + "i";
        }
        return modifiedString;
    }

    public String conjugateNegativeStringModifier(String person,String input)
    {   
        String modifiedString = input;
        for (int i = 0; i < negativePronouns.size(); i++) {
                    if (person.equals(GENERAL_PRONOUNS[i])) {
                        modifiedString =
                        negativePronouns.get(GENERAL_PRONOUNS[i]) + input;
                        break;
                    }
                }
        return modifiedString;
    }
    
    public String computeNegativeStatements(String person, String verb, String tense)
    {
        String returnString = verb;
        switch(tense) {
            case PRESENT:
                returnString = verb.substring(2);
                returnString= 
                this.conjugateNegativeStringModifier(person,returnString);
                returnString= this.lastCharCheck(returnString);
                break;                 
            case PAST:
                returnString= 
                this.conjugateNegativeStringModifier(person,returnString);
                break;
           case FUTURE:
                if(!checkDiSyllables(verb)){
                    returnString = verb.substring(2);
                }
                if(person.equals(GENERAL_PRONOUNS[1]) ||
                 person.equals(GENERAL_PRONOUNS[3])){
                    returnString = verb.substring(2);
                }
                returnString = FUTURE_TENSE_JOINER + returnString;
                returnString= 
                this.conjugateNegativeStringModifier(person,returnString);
                break;
            case PERFECT:
                returnString = verb.substring(2);
                returnString = 
                NEGATIVE_PERFECT_TENSE_JOINER + verb.substring(2);
                returnString= 
                this.conjugateNegativeStringModifier(person,returnString);
                break;
        }
        return returnString;
    }

    public boolean swahiliExceptionalVerbsCheck(String verb){   
        boolean containsSubstring = false;
        for (String sub : SWAHILI_EXCEPTIONAL_STRINGS) {
            if (verb.contains(sub)) {
                containsSubstring = true;
                break;
            }
        }
        return containsSubstring;
    }

    public String imperativeTenseHandler(String root, String person){
        if(person.equals(GENERAL_PRONOUNS[1])){
            if(checkDiSyllables(root)){   
                if(swahiliExceptionalVerbsCheck(root)){
                    if(root.equals(SWAHILI_EXCEPTIONAL_STRINGS[2])){
                        return imperativeExceptions.
                        get(SWAHILI_EXCEPTIONAL_STRINGS[2]).split("-")[0]
                        +SWAHILI_EXCEPTIONAL_STRINGS[2];
                    }
                    if (root.endsWith(SWAHILI_EXCEPTIONAL_STRINGS[1])) {
                        root = "n" + 
                        root.substring(root.length() - 2, root.length() - 1) + 
                        imperativeExceptions.
                        get(SWAHILI_EXCEPTIONAL_STRINGS[1]);
                    }
                }
                return root;
            }
            root = root.substring(2);
            if(swahiliExceptionalVerbsCheck(root)){
                if (root.endsWith(SWAHILI_EXCEPTIONAL_STRINGS[0])) {
                    root = root.substring(0, root.length() - 1)
                    + imperativeExceptions.get(SWAHILI_EXCEPTIONAL_STRINGS[0]);
                }
                else if(root.startsWith(SWAHILI_EXCEPTIONAL_STRINGS[3]) 
                && root.endsWith("a")){
                    root = root.substring(0, root.length() - 1)
                    + imperativeExceptions.get(SWAHILI_EXCEPTIONAL_STRINGS[3]);
                }
            }
            return root;
        }
        else if(person.equals(GENERAL_PRONOUNS[4])){
            if(checkDiSyllables(root)){   
                if(swahiliExceptionalVerbsCheck(root)){
                    if(root.equals(SWAHILI_EXCEPTIONAL_STRINGS[2])){
                            return imperativeExceptions.
                            get(SWAHILI_EXCEPTIONAL_STRINGS[2]).split("-")[1]
                            +SWAHILI_EXCEPTIONAL_STRINGS[2];
                    }
                    if (root.endsWith(SWAHILI_EXCEPTIONAL_STRINGS[1])) {
                        root = "n" + 
                        root.substring(root.length() - 2, root.length() - 1)
                        + imperativeExceptions.get(SWAHILI_EXCEPTIONAL_STRINGS[1]);
                    }
                }
                if(root.endsWith("a")){
                    root = root.substring(0, root.length() - 1) + 
                    SWAHILI_IMPERATIVE_PRONOUNS_PREFIXES[1];
                }
                else{
                    root = root + SWAHILI_IMPERATIVE_PRONOUNS_PREFIXES[0];
                }
                return root;
            }
            root = root.substring(2);
            if(root.endsWith("a")){
                root = root.substring(0, root.length() - 1) + 
                SWAHILI_IMPERATIVE_PRONOUNS_PREFIXES[1];
            }else{
                root = root + SWAHILI_IMPERATIVE_PRONOUNS_PREFIXES[0];
            }
        }
        return root;
    }

    public String tenseJoiner(String root, String tense) {
        switch(tense) {
            case PRESENT:
                root = PRESENT_TENSE_JOINER + root;
                break;
            case FUTURE:
                root = FUTURE_TENSE_JOINER + root;
                break;
            case PAST:
                root = PAST_TENSE_JOINER + root;
                break;
            case PERFECT:
                root = PERFECT_TENSE_JOINER + root;
                break;
            case IMPERATIVE:
                root = IMPERATIVE_TENSE_JOINER + root;
                break;
        }
        return root;
    }
    
    public String personJoiner(String tensRoot, String person) {
        for (int i = 0; i < verbJoiner.size(); i++) {
            if (person.equals(GENERAL_PRONOUNS[i])) {
                tensRoot = 
                verbJoiner.get(GENERAL_PRONOUNS[i]) + tensRoot;
                break;
            }
        }
        return tensRoot;
    }    
}
