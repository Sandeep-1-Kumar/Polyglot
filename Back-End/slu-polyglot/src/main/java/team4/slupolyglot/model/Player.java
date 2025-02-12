package team4.slupolyglot.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Player {

  public Player() {
  }
  @Id
  private String email;

  public Player(String email, String userName,
  BigDecimal score,String password) {
    this.email = email;
    this.name = userName;
    this.password = password;
    this.score = score;
  }

  private String name;
  private BigDecimal score;
  private String password;

  public BigDecimal getScore() {
    return score;
  }

  public String getPassWord() {
    return password;
  }

  public String getUserName() {
    return name;
  }

  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }

}