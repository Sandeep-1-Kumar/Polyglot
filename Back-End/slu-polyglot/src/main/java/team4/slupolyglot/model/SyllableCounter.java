package team4.slupolyglot.model;

import java.util.Arrays;

import team4.slupolyglot.MyConstants;

public class SyllableCounter {    
    
    public static boolean checkMutliSyllable(String word) {
        word = word.toLowerCase();
        if (Arrays.asList(MyConstants.EXCEPTIONS).contains(word)) {
            return true;
        }
        boolean isMutliSyllableWord = false;
        if (word.startsWith("ku") || word.startsWith("kw")) {
            word = word.substring(2);
        }
        String lastChar = word.substring(word.length() - 1);
        if (Arrays.asList(MyConstants.VOWELS).contains(lastChar)) {
            word = word.substring(0,word.length()-1);
        }
        for (int i = 0; i < word.length(); i++) {
            if (Arrays.asList(MyConstants.VOWELS).contains(String.valueOf(word.charAt(i)))){
                isMutliSyllableWord = true;
                break;
            }
        }
        return isMutliSyllableWord;
        } 
    }
