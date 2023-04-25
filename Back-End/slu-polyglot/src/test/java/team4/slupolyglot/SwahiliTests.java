package team4.slupolyglot;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;

import team4.slupolyglot.model.EnglishSwahiliTranslation;
import team4.slupolyglot.model.Verb;


import static org.junit.Assert.assertEquals;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class SwahiliTests {
    
    @Test
    public void testSwahiliTranslation() throws IOException {
    ClassPathResource resource = new ClassPathResource("swahili_test_cases.tsv");
    BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
    String line;
    while ((line = reader.readLine()) != null) {
        String[] columns = line.split("\t");
        String features = columns[0];
        //String englishTranslation = columns[1];
        String translatedSwahiliVerb = columns[2];
        String unTransulatedSwahiliVerb = features.substring(features.lastIndexOf("+") + 1);
        String featuresExtracted = features.substring(0, features.lastIndexOf("+"));
        Verb verb = new Verb(); 
        verb.setSwahiliVerb(unTransulatedSwahiliVerb);
        EnglishSwahiliTranslation e = new EnglishSwahiliTranslation();
        String result = e.translate(verb, featuresExtracted);
        assertEquals(translatedSwahiliVerb,result);
    }
    reader.close();
    }
}
