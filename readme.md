# 🏁 Mario Kart Simulator

<table>
  <tr>
    <td>
      <img src="./docs/header.gif" alt="Mario Kart" width="200" />
    </td>
    <td>
      <b>Objective:</b>
      <p>Mario Kart is a racing game series developed and published by Nintendo. Our challenge is to simulate a Mario Kart-style race by creating the game logic, following the rules and mechanics described below.</p>
    </td>
  </tr>
</table>

---

## 👾 Players

<table style="border-collapse: collapse; width: 800px; margin: 0 auto;">
  <tr>
    <td style="border: 1px solid black; text-align: center;">
      <p><b>Mario</b></p>
      <img src="./docs/mario.gif" alt="Mario" width="60" height="60" />
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p>Speed: 4</p>
      <p>Handling: 3</p>
      <p>Power: 3</p>
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p><b>Peach</b></p>
      <img src="./docs/peach.gif" alt="Peach" width="60" height="60" />
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p>Speed: 3</p>
      <p>Handling: 4</p>
      <p>Power: 2</p>
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p><b>Yoshi</b></p>
      <img src="./docs/yoshi.gif" alt="Yoshi" width="60" height="60" />
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p>Speed: 2</p>
      <p>Handling: 4</p>
      <p>Power: 3</p>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid black; text-align: center;">
      <p><b>Bowser</b></p>
      <img src="./docs/bowser.gif" alt="Bowser" width="60" height="60" />
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p>Speed: 5</p>
      <p>Handling: 2</p>
      <p>Power: 5</p>
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p><b>Luigi</b></p>
      <img src="./docs/luigi.gif" alt="Luigi" width="60" height="60" />
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p>Speed: 3</p>
      <p>Handling: 4</p>
      <p>Power: 4</p>
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p><b>Donkey Kong</b></p>
      <img src="./docs/dk.gif" alt="Donkey Kong" width="60" height="60" />
    </td>
    <td style="border: 1px solid black; text-align: center;">
      <p>Speed: 2</p>
      <p>Handling: 2</p>
      <p>Power: 5</p>
    </td>
  </tr>
</table>

---

## 🕹️ Rules & Mechanics

### 🧍 Players

- The computer must receive **two characters** as objects to compete in a race.

### 🛣️ Track

- The race will take place on a randomly generated track consisting of **5 rounds**.
- In each round, a **track segment** is randomly selected. It can be:
  - **Straight**
  - **Curve**
  - **Battle**

#### Segment Rules:

- **Straight:**  
  Each player rolls a 6-sided die and adds their **Speed**. The higher total wins the round and earns **1 point**.

- **Curve:**  
  Each player rolls a 6-sided die and adds their **Handling**. The higher total wins the round and earns **1 point**.

- **Battle:**  
  Each player rolls a 6-sided die and adds their **Power**. The lower total **loses 1 point**.

- Players **cannot have negative points**. (minimum score is 0)

---

### 🏆 Victory Condition

- At the end of 5 rounds, the player with the **highest score wins**.
