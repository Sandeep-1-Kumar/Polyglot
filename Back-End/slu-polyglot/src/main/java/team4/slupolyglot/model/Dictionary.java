package team4.slupolyglot.model;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;

public class Dictionary {
    private Map<String, String> dict;

    public Dictionary() {
        dict = new HashMap<>();
        loadDictionary();
    }
    ClassPathResource inputResource = new ClassPathResource("dict.tsv");
    private void loadDictionary() {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputResource.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split("\t");
                dict.put(parts[0], parts[1]);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getEnglishVerb(String swahiliVerb) {
        return dict.get(swahiliVerb);
    }

    public static String translateSwahiliToEnglish(String swahiliVerb) {
        Dictionary dict = new Dictionary();
        return dict.getEnglishVerb(swahiliVerb);
    }
}