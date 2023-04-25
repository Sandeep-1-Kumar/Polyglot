package team4.slupolyglot;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import team4.slupolyglot.model.EnglishSwahiliTranslation;
import team4.slupolyglot.model.EnglishVerbs;
import team4.slupolyglot.model.Verb;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import team4.slupolyglot.model.Dictionary;

public class AlgorithmCheck {

    @Test
    public void testAlgorithm() throws IOException {
        ClassPathResource inputResource = 
        new ClassPathResource("AlgorithmTests/Tests.tsv");
        BufferedReader reader = new BufferedReader(new InputStreamReader
        (inputResource.getInputStream(), StandardCharsets.UTF_8));
        File outputFolder = new File("src/main/resources/AlgorithmResults");
        outputFolder.mkdirs();
        File outputFile = new File(outputFolder, "Results.tsv");
        FileWriter writer = new FileWriter(outputFile);
        StringBuilder resultBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            String[] columns = line.split("\t");
            String features = columns[0];
            String[] splitFeature = features.split("\\+");
            int featuresLen = splitFeature.length;
            int index = featuresLen == 3 ? 0 : 1;
            boolean isNegative = featuresLen != 3;
            String pronoun = splitFeature[index];
            String tense = splitFeature[index+1];
            String unTransulatedSwahiliVerb = 
            features.substring(features.lastIndexOf("+") + 1);
            String featuresExtracted = 
            features.substring(0, features.lastIndexOf("+"));
            Verb verb = new Verb(); 
            verb.setSwahiliVerb(unTransulatedSwahiliVerb);
            Dictionary dict = new Dictionary();
            String englishVerb = dict.getEnglishVerb(unTransulatedSwahiliVerb);
            EnglishSwahiliTranslation swahiliTranslation = 
            new EnglishSwahiliTranslation();
            EnglishVerbs englishVerbs = 
            new EnglishVerbs(englishVerb,tense, pronoun, isNegative);
            String column1 = features;
            String column2 = englishVerbs.getConjugatedVerb();
            String column3 = 
            swahiliTranslation.translate(verb, featuresExtracted);
            resultBuilder.append(column1 + "   "+column2+"  "+column3)
            .append("\n");
        }
        reader.close();
        writer.write(resultBuilder.toString());
        writer.close();
    }
}
