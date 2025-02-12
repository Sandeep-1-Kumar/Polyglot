package team4.slupolyglot.model;

import jakarta.persistence.*;
import team4.slupolyglot.MyConstants;
import team4.slupolyglot.repositories.Translation;

@Entity
@Table(name = "verbs")
public class Verb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String translatedVerb;

    @Column(name = "english_verb")
    private String englishVerb;

    @Column(name = "italian_verb")
    private String italianVerb;
    
    @Column(name = "swahili_verb")
    private String swahiliVerb;

    @Column(name = "url_image")
    private String urlImage;

    public String getSwahiliVerb() {
        return swahiliVerb;
    }

    public void setSwahiliVerb(String swahiliVerb) {
        this.swahiliVerb = swahiliVerb;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEnglishVerb() {
        return englishVerb;
    }

    public void setEnglishVerb(String englishVerb) {
        this.englishVerb = englishVerb;
    }

    public String getItalianVerb() {
        translatedVerb = italianVerb;
        return translatedVerb;
    }

    public void setItalianVerb(String italianVerb) {
        this.italianVerb = italianVerb;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public String getTranslatedVerb(Translation translation, String features) {
        return translation.translate(this,features);
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }
}
