import './App.css';
import {useReducer, useState, useEffect} from 'react';
import {PageContainer, Formular, FormSection, MainTitle, SectionTitle, InputDiv, KontrolaButton} from './AppStyles.js'

//initial state pro usereducer
const defaultObjednavka = {
  horske:false,
  detske:false,
  silnicni:false,
  gravel:false,
  pocetKolHorske:0,
  pocetKolDetske:0,
  pocetKolSilnicni:0,
  pocetKolGravel:0,
  dnyVypujcky:0,
  doprava:0,
  rozpocet:0,
}

//reducer funkce pro useReducer
function setObjednavka (objednavka, action){
  switch (action.type){
    case 'toggle_horske':return {...objednavka,horske:!objednavka.horske};
    case 'toggle_detske':return {...objednavka,horske:!objednavka.detske};
    case 'toggle_silnicni':return {...objednavka,horske:!objednavka.silnicni};
    case 'toggle_gravel':return {...objednavka,horske:!objednavka.gravel};
    case 'update_number':
      return{...objednavka, [action.key]:parseFloat(action.value)};
    default: return objednavka;
  }
}


function App() {
  const[objednavka, dispatch] =useReducer(setObjednavka,defaultObjednavka);

  const[finalPrice, setFinalPrice] =useState(0);
  const[showFinalPrice, setShowFinalPrice] = useState(0);
  const[checked, setChecked] =useState(0);

  useEffect(() => {
    let newFinalPrice = getFinalPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka, showFinalPrice]);

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

    let thisFinalPrice = (horske * objednavka.pocetKolHorske +
    detske * objednavka.pocetKolDetske +
    silnicni * objednavka.pocetKolSilnicni +
    gravel * objednavka.pocetKolGravel) *
      objednavka.dnyVypujcky *
      objednavka.doprava;

    setFinalPrice(thisFinalPrice);

    return thisFinalPrice;
  };

  const checkPrice = (objednavka) => {
    if (objednavka.rozpocet >= finalPrice) {
      let checkOK = 1;
      setChecked(checkOK);
    } else {
      let checkNOK = 2;
      setChecked(checkNOK);
    }
  };


  return (
    <PageContainer>
      <Formular>
        <FormSection name='nadpis'> <MainTitle>Objednávka kol</MainTitle> </FormSection>

        <FormSection name='vyber'> <SectionTitle> Typ kola a počet kusů</SectionTitle>  
        <InputDiv>
            <input type="checkbox" id="horske" onChange={(e) =>{
              dispatch({
                type:"horske",
              })}} /> <label> Kolo horské 500 Kč/den</label>
            <input type ="number" id="pocetKolHorske" value={objednavka.pocetKolHorske} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolHorske',
              })}} /> <label> Počet kol</label>
        </InputDiv>

        <InputDiv>
            <input type="checkbox" id="detske"
            onChange={(e) =>{
              dispatch({
                type:"detske",
              })}} /> <label> Kolo dětské  200 Kč/den</label>
             <input type ="number" id="pocetKolDetske" value={objednavka.pocetKolDetske} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolDetske',
              })}} /> <label> Počet kol</label> 
        </InputDiv>

        <InputDiv>
            <input type="checkbox" id="silnicni" onChange={(e) =>{
              dispatch({
                type:"detske",
              })}}
             /> <label> Kolo	silniční 1 500 Kč/den</label>
             <input type ="number" id="pocetKolSilnicni" value={objednavka.pocetKolSilnicni} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolSilnicni',
              })}} /> <label> Počet kol</label> 
        </InputDiv>

        <InputDiv>
            <input type="checkbox" id="gravel" onChange={(e) =>{
              dispatch({
                type:"gravel",
              })}}/> <label> Kolo	gravel  2 500 Kč/den</label>
             <input type ="number" id="pocetKolGravel" placeholder='0' value={objednavka.pocetKolGravel} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolGravel',
              })}} /> <label> Počet kol</label> 
        </InputDiv>
        </FormSection>

        <FormSection name="početDnu"> <SectionTitle> Počet dnů výpůjčky</SectionTitle>
          <select id="dnyVypujcky" onClick={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              ky:'dnyVypujcky',
            })}}>
            <option value={3}>  3 dny    </option>
            <option value={7}>  7 dnů   </option>
            <option value={14}>  14 dnů    </option>
            <option value={30}>  30 dnů    </option>
          </select>
        </FormSection>

        <FormSection name="doprava"> <SectionTitle> Doprava kol - cyklonosiče na auto</SectionTitle>
        <div>
          <input type="radio" name="doprava" id="stresni" value={0.05} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'doprava',
            })}} /> <label> cyklonosič střešní (+ 5 procent z celkové ceny zápůjčky navíc) </label> </div>
         <div> <input type="radio" name="doprava" id="tazne" value={0.1} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'doprava',
            })}}/> <label> cyklonosič na tažné zařízení (+ 10 procent z celkové ceny zápůjčky navíc) </label> </div>
         <div><input type="radio" name="doprava" id="nechce" value={0} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'doprava',
            })}} /> <label> není třeba cyklonosič </label> </div> 
        </FormSection>

        <FormSection><SectionTitle> Konečná kalkulace</SectionTitle>
          <label> Zadejte požadovaný rozpočet</label> <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'rozpocet',
            })
          }}/>
          <label> Finální cena - dle aktuálních voleb</label> <input type="text" id="finalniCena" value={showFinalPrice} disabled />
          <KontrolaButton>Kontrola rozpočtu</KontrolaButton>
        </FormSection>
      </Formular>
    </PageContainer>
  );
}

export default App;
