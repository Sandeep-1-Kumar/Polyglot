package team4.slupolyglot.model;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;

import static team4.slupolyglot.MyConstants.*;

public class EnglishVerbs {

    private static final String IRREGULAR_PAST = "IRREGULAR_PAST";
    private static final String IRREGULAR_PERFECT = "IRREGULAR_PERFECT";
    private static final String VERB_IRREGULAR_ENGLISH_FILE = "irregular_english.tsv";

    private String verb;
    private String conjugatedVerb;
    private String pronoun;

    private String tense;
    private boolean isNegative = false;
    public final static String[] ENGLISH_PRONOUNS = {"I ","you ","(s)he ","we ","you ","they "};
    HashMap<String, String> pronouns = new HashMap<>() {{
        put(GENERAL_PRONOUNS[0], ENGLISH_PRONOUNS[0]);
        put(GENERAL_PRONOUNS[1], ENGLISH_PRONOUNS[1]);
        put(GENERAL_PRONOUNS[2], ENGLISH_PRONOUNS[2]);
        put(GENERAL_PRONOUNS[3], ENGLISH_PRONOUNS[3]);
        put(GENERAL_PRONOUNS[4], ENGLISH_PRONOUNS[4]);
        put(GENERAL_PRONOUNS[5], ENGLISH_PRONOUNS[5]);
    }};

    public EnglishVerbs(String verb, String tense, String pronoun, boolean isNegative) {
        this.verb = verb;
        this.tense = tense;
        this.pronoun = pronoun;
        this.isNegative = isNegative;
        try {
            this.conjugatedVerb = setConjugatedVerbTense();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String setConjugatedVerbTense() throws IOException {
        switch (this.tense) {
            case PRESENT -> {
                return present();
            }
            case PAST -> {
                return past();
            }
            case FUTURE -> {
                return future();
            }
            case IMPERATIVE -> {
                return imperative();
            }
            case PERFECT -> {
                return perfect();
            }
            default -> {
                throw new IllegalArgumentException("Invalid tense");
            }
        }
    }


    private String treatTheBePresent(){
        String negative = isNegative ? " not" : "";
        if (pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]))
            return "is" + negative;
        else if (pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[0]))
            return "am" + negative;

        return "are" + negative;
    }
    private String getPresent() {
        String[] composedVerb = this.verb.split(" ");
        if(composedVerb[0].equals("be")){
            composedVerb[0] = treatTheBePresent();
        } else if (pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2])) {
            char lastChar = composedVerb[0].charAt(composedVerb[0].length() - 1);
            if (lastChar == 'y') {
                if (!isVowel(composedVerb[0].charAt(composedVerb[0].length() - 2))) {
                    if(composedVerb.length == 1)
                        return composedVerb[0].substring(0, composedVerb[0].length() - 1) + "ies";
                    else
                        return composedVerb[0].substring(0, composedVerb[0].length() - 1) + "ies"
                                + " " +composedVerb[1];
                }
            } else if (lastChar == 'h') {
                if (!isVowel(composedVerb[0].charAt(composedVerb[0].length() - 2))) {
                    if(composedVerb.length == 1)
                        return composedVerb[0].substring(0, composedVerb[0].length()) + "es";
                    else
                        return composedVerb[0].substring(0, composedVerb[0].length()) + "es"
                                + " " +composedVerb[1];
                }
            }
            else {
                if(composedVerb.length == 1)
                    return composedVerb[0] + "s";
                else
                    return composedVerb[0] + "s" + " " +composedVerb[1];
            }
        }
        if(composedVerb.length == 1)
            return composedVerb[0];
        else
            return composedVerb[0] + " " +composedVerb[1];
    }
    // todo born without s
    private String present() {
        String[] composedVerb = this.verb.split(" ");
        boolean isBe = composedVerb[0].equals("be");
        String negation = null;
        if(!isBe)
            negation = isNegative ? "do not " : "";

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun)) {
                if(!isBe)
                    return (englishPronoun + negation + getPresent());
                return (englishPronoun  + getPresent());
            }

        }
        throw new IllegalArgumentException("Invalid pronoun");
    }

    private String treatTheBe() {
        String[] splittedVerb = this.verb.split(" ");
        boolean is3s = pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]);
        boolean is1s = pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[0]);

        String wasWere = (is3s || is1s) ? "was" : "were";
        String negation = isNegative ? " not" : " ";
        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun)) {
                if(splittedVerb.length == 1)
                    return (englishPronoun + wasWere + negation);
                else
                    return (englishPronoun + wasWere + negation + " " + splittedVerb[1]);
            }
        }
        throw new IllegalArgumentException("Invalid pronoun");
    }

    private boolean isVowel(char character) {
        HashSet<Character> vowels = new HashSet<>();
        vowels.add('a');
        vowels.add('e');
        vowels.add('i');
        vowels.add('o');
        vowels.add('u');

        return vowels.contains(character);
    }
    private String getRegularPast(){
        char lastChar = this.verb.charAt(this.verb.length()-1);
        if( lastChar == 'e'){
            return this.verb.substring(0,this.verb.length()-1)+"ed";
        } else if (lastChar == 'y'){
            if(!isVowel(this.verb.charAt(this.verb.length()-2)))
                return this.verb.substring(0,this.verb.length()-1)+"ied";
        }

        return this.verb+"ed";
    }
    private String past() throws IOException {

        if (!findIrregularities(this.verb) || (isNegative && !this.verb.contains("be"))){
            String negation = isNegative ? "did not " : "";
            String past = isNegative ? this.verb : getRegularPast();
            for (String englishPronoun : ENGLISH_PRONOUNS) {
                if (pronouns.get(pronoun).equals(englishPronoun))
                    return (englishPronoun  + negation + past);
            }
        } else {
            if(this.verb.contains("be")) {
                return treatTheBe();
            } else {
                String past = mapIrregularity(this.verb, IRREGULAR_PAST);
                for (String englishPronoun : ENGLISH_PRONOUNS) {
                    if (pronouns.get(pronoun).equals(englishPronoun))
                        return (englishPronoun + past);
                }
            }
        }

        throw new IllegalArgumentException("Invalid pronoun");
    }
    private String future(){
        String negation = isNegative ? "not " : "";

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun  + "will "+ negation + this.verb);
        }
        throw new IllegalArgumentException("Invalid pronoun");
    }
    private String imperative() { //todo complete
        String negation = isNegative ? "do not " : "";
        if(pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]))
            throw new IllegalArgumentException("Invalid pronoun, cannot be 3s");

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (negation + this.verb);
        }
        throw new IllegalArgumentException("Invalid pronoun");
    }

    //todo able
    private String perfect() throws IOException {
        boolean is3s = pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]);
        String haveHas = is3s ? "has" : "have";
        String negation = isNegative ? " not" : "";

        if(!findIrregularities(this.verb)) {
            String pastEd = getRegularPast();

            for (String englishPronoun : ENGLISH_PRONOUNS) {
                if (pronouns.get(pronoun).equals(englishPronoun))
                    return (englishPronoun + haveHas + negation + " " + pastEd);
            }
        } else { //todo handle be
            String perfect = mapIrregularity(this.verb,IRREGULAR_PERFECT);

            for (String englishPronoun : ENGLISH_PRONOUNS) {
                if (pronouns.get(pronoun).equals(englishPronoun))
                    return (englishPronoun + haveHas + negation + " " + perfect);
            }
        }
        throw new IllegalArgumentException("Invalid pronoun");
    }

    public String getConjugatedVerb() {
        return conjugatedVerb;
    }

    @PostConstruct
    private boolean findIrregularities(String verb) throws IOException {

        ClassPathResource resource = new ClassPathResource(VERB_IRREGULAR_ENGLISH_FILE);

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;

        while ((line = reader.readLine()) != null) {
            if(line.split("\t")[0].equals(verb))
                return true;
        }

        return false;
    }
    @PostConstruct
    private String mapIrregularity(String verb, String kindOfIrregularity) throws IOException {
        int index;
        ClassPathResource resource = new ClassPathResource(VERB_IRREGULAR_ENGLISH_FILE);


        if(kindOfIrregularity.equals(IRREGULAR_PAST))
            index = 1;
        else if(kindOfIrregularity.equals(IRREGULAR_PERFECT))
            index = 2;
        else
            throw new IllegalArgumentException("Invalid kindOfIrregularity");

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;

        while ((line = reader.readLine()) != null) {
            if(line.split("\t")[0].equals(verb)){
                    //System.out.println(line.split("\t")[index]);
                    System.out.println(this.isNegative+"+"+this.pronoun+"+"+this.tense+"+"+this.verb);
                    return line.split("\t")[index];
                }
        }

        throw new IllegalArgumentException("This verb has no irregular form");
    }
}
