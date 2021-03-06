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
        <FormSection name='nadpis'> <MainTitle>Objedn??vka kol</MainTitle> </FormSection>

        <FormSection name='vyber'> <SectionTitle> Typ kola a po??et kus??</SectionTitle>  
        <InputDiv>
            <input type="checkbox" id="horske" onChange={(e) =>{
              dispatch({
                type:"horske",
              })}} /> <label> Kolo horsk?? 500 K??/den</label>
            <input type ="number" id="pocetKolHorske" value={objednavka.pocetKolHorske} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolHorske',
              })}} /> <label> Po??et kol</label>
        </InputDiv>

        <InputDiv>
            <input type="checkbox" id="detske"
            onChange={(e) =>{
              dispatch({
                type:"detske",
              })}} /> <label> Kolo d??tsk??  200 K??/den</label>
             <input type ="number" id="pocetKolDetske" value={objednavka.pocetKolDetske} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolDetske',
              })}} /> <label> Po??et kol</label> 
        </InputDiv>

        <InputDiv>
            <input type="checkbox" id="silnicni" onChange={(e) =>{
              dispatch({
                type:"detske",
              })}}
             /> <label> Kolo	silni??n?? 1 500 K??/den</label>
             <input type ="number" id="pocetKolSilnicni" value={objednavka.pocetKolSilnicni} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolSilnicni',
              })}} /> <label> Po??et kol</label> 
        </InputDiv>

        <InputDiv>
            <input type="checkbox" id="gravel" onChange={(e) =>{
              dispatch({
                type:"gravel",
              })}}/> <label> Kolo	gravel  2 500 K??/den</label>
             <input type ="number" id="pocetKolGravel" placeholder='0' value={objednavka.pocetKolGravel} onChange={(e) => {
              dispatch({
                type:'update_number',
                value:e.target.value,
                key:'pocetKolGravel',
              })}} /> <label> Po??et kol</label> 
        </InputDiv>
        </FormSection>

        <FormSection name="po??etDnu"> <SectionTitle> Po??et dn?? v??p??j??ky</SectionTitle>
          <select id="dnyVypujcky" onClick={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              ky:'dnyVypujcky',
            })}}>
            <option value={3}>  3 dny    </option>
            <option value={7}>  7 dn??   </option>
            <option value={14}>  14 dn??    </option>
            <option value={30}>  30 dn??    </option>
          </select>
        </FormSection>

        <FormSection name="doprava"> <SectionTitle> Doprava kol - cyklonosi??e na auto</SectionTitle>
        <div>
          <input type="radio" name="doprava" id="stresni" value={0.05} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'doprava',
            })}} /> <label> cyklonosi?? st??e??n?? (+ 5 procent z celkov?? ceny z??p??j??ky nav??c) </label> </div>
         <div> <input type="radio" name="doprava" id="tazne" value={0.1} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'doprava',
            })}}/> <label> cyklonosi?? na ta??n?? za????zen?? (+ 10 procent z celkov?? ceny z??p??j??ky nav??c) </label> </div>
         <div><input type="radio" name="doprava" id="nechce" value={0} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'doprava',
            })}} /> <label> nen?? t??eba cyklonosi?? </label> </div> 
        </FormSection>

        <FormSection><SectionTitle> Kone??n?? kalkulace</SectionTitle>
          <label> Zadejte po??adovan?? rozpo??et</label> <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type:'update_number',
              value:e.target.value,
              key:'rozpocet',
            })
          }}/>
          <label> Fin??ln?? cena - dle aktu??ln??ch voleb</label> <input type="text" id="finalniCena" value={showFinalPrice} disabled />
          <KontrolaButton>Kontrola rozpo??tu</KontrolaButton>
        </FormSection>
      </Formular>
    </PageContainer>
  );
}

export default App;
