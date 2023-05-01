package team4.slupolyglot;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import team4.slupolyglot.model.Verb;

public class VerbTest {
    private Verb verb;

    @Before
    public void setUp() {
        verb = new Verb();
        verb.setEnglishVerb("run");
        verb.setItalianVerb("correre");
        verb.setSwahiliVerb("mbio");
        
    }

    @Test
    public void testGetEnglishVerb() {
        assertEquals("run", verb.getEnglishVerb());
    }

    @Test
    public void testGetItalianVerb() {
        assertEquals("correre", verb.getItalianVerb());
    }

    @Test
    public void testGetSwahiliVerb() {
        assertEquals("mbio", verb.getSwahiliVerb());
    }

    
}
