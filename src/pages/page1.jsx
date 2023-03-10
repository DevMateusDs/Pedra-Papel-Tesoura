import React, { useEffect, useState } from "react";
import Pedra from "../img/pedra.png";
import Papel from "../img/papel.png";
import Tesoura from "../img/tesoura.png";
import Jokenpo from "../img/jokenpo.webp";
import "./style.css";

const App = () => {
  const [userImg, setUSerImg] = useState("");
  const [pcImg, setPcImg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [playerUser, setPlayerUser] = useState("");
  const [classNameW, setClassnameW] = useState(
    "container-game end-screen none"
  );
  const [classNameL, setClassnameL] = useState(
    "container-game end-screen none"
  );
  const [classNameUser, setClassNameUser] = useState("container-nameUser none");
  const [nameUser, setNameUser] = useState("");
  let [user, setUser] = useState(0);
  let [pc, setPc] = useState(0);
  let player1 = "";
  let player2 = "";

  window.addEventListener("click", () => {
    reset();
  });

  const jogar = () => {
    playPc();
  };

  const reset = () => {
    player1 = document.querySelector("input[name=play]:checked").value;
    if (player1 == "pedra") {
      setUSerImg(Pedra);
    } else if (player1 == "papel") {
      setUSerImg(Papel);
    } else if (player1 == "tesoura") {
      setUSerImg(Tesoura);
    }
    setPlayerUser(player1);
  };

  const playPc = () => {
    let opt = ["pedra", "papel", "tesoura"];
    let num = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    player2 = opt[num];
    if (player2 == "pedra") {
      setPcImg(Pedra);
    } else if (player2 == "papel") {
      setPcImg(Papel);
    } else {
      setPcImg(Tesoura);
    }
    analyze();
  };

  const analyze = () => {
    setIsDisabled(true);

    let win = 0;

    if (playerUser == player2) {
      win = 0;
    } else if (playerUser == "pedra") {
      if (player2 == "tesoura") {
        win = 1;
      } else {
        win = -1;
      }
    } else if (playerUser == "papel") {
      if (player2 == "pedra") {
        win = 1;
      } else {
        win = -1;
      }
    } else if (playerUser == "tesoura") {
      if (player2 == "papel") {
        win = 1;
      } else {
        win = -1;
      }
    }

    if (win == 0) {
    } else if (win > 0) {
      user = user + 1;
      setUser(user);
    } else {
      pc = pc + 1;
      setPc(pc);
    }

    if (user >= 5) {
      setClassnameW("container-game end-screen center");
    }

    if (pc >= 5) {
      setClassnameL("container-game end-screen center");
    }

    setTimeout(() => {
      setIsDisabled(false);
      clear();
    }, 1000);

    const clear = () => {
      setUSerImg("");
      setPcImg("");
    };
  };

  const newGame = () => {
    setUser(0);
    setPc(0);
    reset();
    setClassnameW("container-game end-screen none");
    setClassnameL("container-game end-screen none");
  };

  useEffect(() => {
    if (!sessionStorage.getItem("nameUser")) {
      setClassNameUser("container-nameUser");
    }
  }, []);

  const sessionNameUser = () => {
    sessionStorage.setItem("nameUser", nameUser);
    window.location.reload(true);
  };

  const nomeUser = sessionStorage.getItem("nameUser");

  document.title = "Jokenp??";

  return (
    <div className="container">
      <div id="game" className="container-game">
        <h1>Jokenp??</h1>
        <div className="bloco">
          <div className="label bg-green">{nomeUser}</div>
          <div className="label bg-red">PC</div>
          <div className="placar">
            {user}:{pc}
          </div>
        </div>
        <div className="bloco bg-grey selected-image">
          <div>
            <img src={userImg} alt="" />
          </div>
          <div id="pc" className="reverse">
            <img src={pcImg} alt="" />
          </div>
        </div>
        <h2>Escolha sua jogada</h2>
        <div className="buttons">
          <label>
            <input type="radio" name="play" value="pedra" />

            <button className="btn">
              <img src={Pedra} alt="Pedra" />
            </button>
          </label>
          <label>
            <input type="radio" name="play" value="papel" />
            <button className="btn">
              <img src={Papel} alt="papel" />
            </button>
          </label>
          <label>
            <input type="radio" name="play" value="tesoura" />
            <button className="btn">
              <img src={Tesoura} alt="tesoura" />
            </button>
          </label>
        </div>
        <div className="bloco">
          <button className="btn-play" onClick={jogar} disabled={isDisabled}>
            Jogar
          </button>
        </div>
      </div>
      <div id="winner" className={classNameW}>
        <span>????</span>
        <h3>Voc?? Ganhouu!</h3>
        <button onClick={newGame}>Jogar novamente</button>
      </div>
      <div id="loser" className={classNameL}>
        <span>????</span>
        <h3>Voc?? Perdeu!</h3>
        <button onClick={newGame}>Jogar novamente</button>
      </div>
      <div id="nameUser" className={classNameUser}>
        <img src={Jokenpo} alt="Jokenpo" />
        <input
          type="text"
          placeholder="Informe seu nome!"
          value={nameUser}
          onChange={(e) => setNameUser(e.target.value)}
        />
        <botton onClick={sessionNameUser}>Jogar</botton>
      </div>
    </div>
  );
};

export default App;
