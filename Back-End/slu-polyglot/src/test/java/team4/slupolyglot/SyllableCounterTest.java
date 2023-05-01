package team4.slupolyglot;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import team4.slupolyglot.model.SyllableCounter;


class SyllableCounterTest {
    @Test
    void IsTrueTestCheckMutliSyllable() {

        //Test with Swahili word with prefix "ku" 
        assertTrue(SyllableCounter.checkMutliSyllable("Kunyweni"));

        //Test with Swahili word with prefix "ku" 
        assertTrue(SyllableCounter.checkMutliSyllable("Kujifunza"));

        //Test with Swahili word with prefix "kw" 
        assertTrue(SyllableCounter.checkMutliSyllable("Kweli"));

        //Test with Swahili word with prefix "kw" 
        assertTrue(SyllableCounter.checkMutliSyllable("Kwanzaa"));
    }

    @Test
    void isFalseTestCheckMutliSyllable() {
        
        //Test with Swahili word with prefix "ku" 
        assertFalse(SyllableCounter.checkMutliSyllable("Kuja"));

        //Test with Swahili word with prefix "ku" 
        assertFalse(SyllableCounter.checkMutliSyllable("Kula"));

        //Test with Swahili word with prefix "Ba" 
        assertFalse(SyllableCounter.checkMutliSyllable("kufa"));

        //Test with Swahili word with prefix "Nu" 
        assertFalse(SyllableCounter.checkMutliSyllable("Kuka"));
        
    }
}