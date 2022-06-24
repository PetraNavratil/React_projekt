import "./App.css";

import {
  FormSection,
  Formular,
  PageContainer,
  Kolo,
  MainTitle,
  SectionTitle,
  Kontrola,
  KoloObal,
} from "./AppStyles";

import { useReducer, useState, useEffect } from "react";

const defaultObjednavka = {
  horske: false,
  mnHorske: 0,
  detske: false,
  mnDetske: 0,
  silnicni: false,
  mnSilnicni: 0,
  gravel: false,
  mnGravel: 0,
  pocetDni: "",
  nosic: 0,
  rozpocet: 0,
};

function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "toggle_horske":
      return { ...objednavka, horske: !objednavka.horske };
    case "toggle_detske":
      return { ...objednavka, detske: !objednavka.detske };
    case "toggle_silnicni":
      return { ...objednavka, silnicni: !objednavka.silnicni };
    case "toggle_gravel":
      return { ...objednavka, gravel: !objednavka.gravel };
    case "update_horske":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "update_detske":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "update_silnicni":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "update_gravel":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "update_dny":
      return { ...objednavka, [action.key]: action.value };
    case "update_nosic":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "update_rozpocet":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    default:
      return objednavka;
  }
}

function App() {
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);
  const [checked, setChecked] = useState(0);
  const [showFinalPrice, setShowFinalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    let newFinalPrice = getFinalPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka]);

  const getFinalPrice = (objednavka) => {
    let horske = 0;
    let detske = 0;
    let silnicni = 0;
    let gravel = 0;
    if (objednavka.horske) {
      horske = 500;
    }
    if (objednavka.detske) {
      detske = 200;
    }
    if (objednavka.silnicni) {
      silnicni = 1500;
    }
    if (objednavka.gravel) {
      gravel = 2500;
    }
    let thisFinalPrice =
      (horske * objednavka.mnHorske +
        detske * objednavka.mnDetske +
        silnicni * objednavka.mnSilnicni +
        gravel * objednavka.mnGravel) *
      objednavka.pocetDni *
      objednavka.nosic;

    setFinalPrice(thisFinalPrice);
    return thisFinalPrice;
  };

  const checkPrice = (objednavka) => {
    if (objednavka.rozpocet >= finalPrice) {
      let checkOK = 1;
      setChecked(checkOK);
    } else {
      let checkNotOK = 2;
      setChecked(checkNotOK);
    }
    console.log(checked);
  };

  useEffect(() => {
    console.log(JSON.stringify(objednavka));
  }, [objednavka]);
  
  return (
    <PageContainer>
      <Formular>
        <FormSection name="nadpis">
          <MainTitle>Vaše objednávka</MainTitle>
        </FormSection>
        <FormSection name="vyber">
        <KoloObal>
          <Kolo>
            <SectionTitle>Horské:</SectionTitle>
            <label>500 Kč/den</label>
            <input
              type="checkbox"
              id="horske"
              onChange={(e) => {
                dispatch({
                  type: "toggle_horske",
                });
              }}
            ></input>
            <label>Množství</label>
            <input
              type="number"
              id="mnHorske"
              min='0'
              value={objednavka.mnHorske}
              onChange={(e) => {
                dispatch({
                  type: "update_horske",
                  value: e.target.value,
                  key: "mnHorske",
                });
              }}
            ></input>
          </Kolo>
          <Kolo>
            <SectionTitle>Dětské:</SectionTitle>
            <label>200 Kč/den</label>
            <input
              type="checkbox"
              id="detske"
              onChange={(e) => {
                dispatch({
                  type: "toggle_detske",
                });
              }}
            ></input>
            <label>Množství</label>
            <input
              type="number"
              id="mnDetske"
              min='0'
              value={objednavka.mnDetske}
              onChange={(e) => {
                dispatch({
                  type: "update_detske",
                  value: e.target.value,
                  key: "mnDetske",
                });
              }}
            ></input>
          </Kolo>
          </KoloObal>
          <KoloObal>
          <Kolo>
            <SectionTitle>Silniční:</SectionTitle>
            <label>1500 Kč/den</label>
            <input
              type="checkbox"
              id="silnicni"
              
              onChange={(e) => {
                dispatch({
                  type: "toggle_silnicni",
                });
              }}
            ></input>
            <label>Množství</label>
            <input
              type="number"
              id="mnSilnicni"
              min='0'
              value={objednavka.mnSilnicni}
              onChange={(e) => {
                dispatch({
                  type: "update_silnicni",
                  value: e.target.value,
                  key: "mnSilnicni",
                });
              }}
            ></input>
          </Kolo>
          <Kolo>
            <SectionTitle>Gravel:</SectionTitle>
            <label>2500 Kč/den</label>
            <input
              type="checkbox"
              id="gravel"
              onChange={(e) => {
                dispatch({
                  type: "toggle_gravel",
                });
              }}
            ></input>
            <label>Množství</label>
            <input
              type="number"
              id="mnGravel"
              min='0'
              value={objednavka.mnGravel}
              onChange={(e) => {
                dispatch({
                  type: "update_gravel",
                  value: e.target.value,
                  key: "mnGravel",
                });
              }}
            ></input>
          </Kolo>
          </KoloObal>
        </FormSection>
        <FormSection>
          <label>Na jak dloho chcete kola zapůjčit:</label>
          <select
            id="pocetDni"
            onClick={(e) => {
              dispatch({
                type: "update_dny",
                value: e.target.value,
                key: "pocetDni",
              });
            }}
          >
            <option value={0}>nevybráno</option>
            <option value={3}>Tři dny</option>
            <option value={5}>Pět dní</option>
            <option value={7}>Týden</option>
            <option value={14}>Dva týdny</option>
          </select>
          <br></br>
          <div>
            <label>Nosič na střeše (+5%)</label>
            <input
              type="radio"
              name="nosic"
              value={1.05}
              onChange={(e) => {
                dispatch({
                  type: "update_nosic",
                  value: e.target.value,
                  key: "nosic",
                });
              }}
            ></input>
            <label>Tažný nosič(+10%)</label>
            <input
              type="radio"
              name="nosic"
              value={1.1}
              onChange={(e) => {
                dispatch({
                  type: "update_nosic",
                  value: e.target.value,
                  key: "nosic",
                });
              }}
            ></input>
            <label>Bez nosiče (+0%)</label>
            <input
              type="radio"
              name="nosic"
              value={1}
              onChange={(e) => {
                dispatch({
                  type: "update_nosic",
                  value: e.target.value,
                  key: "nosic",
                });
              }}
            ></input>
          </div>
        </FormSection>
        <FormSection>
          <label>Zadejte rozpočet</label>
          <input
            type="text"
            id="rozpocet"
            value={objednavka.rozpocet}
            onChange={(e) => {
              dispatch({
                type: "update_rozpocet",
                value: e.target.value,
                key: "rozpocet",
              });
            }}
          ></input>
          <label>Výsledná cena</label>
          <input type="text" disabled value={showFinalPrice}></input>
          <Kontrola
            checked={checked}
            onClick={() => {
              checkPrice(objednavka);
            }}
          >
            Zkontroluj rozpocet
          </Kontrola>
        </FormSection>
      </Formular>
    </PageContainer>
  );
}

export default App;