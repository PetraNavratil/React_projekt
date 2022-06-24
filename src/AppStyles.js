import styled from "styled-components";

export const PageContainer = styled.div`
   display: flex;
   max-width: 1200px;
   width: 100%;
   min-height: 100vh;
   justify-content: center;
   align-items: center;
   align-self: center;
   justify-self: center;
`;
export const Formular = styled.form`
   width: 800px;
   min-height: 800px;
   border: 1px solid black;
   padding: 20px;
   display: grid;
   grid-template-columns: 1fr ;
   grid-template-areas:
      'nadpis'
      'vyber'
      'dny'
      'doprava'
      'kalkulace';
   gap: 20px;
`;
export const FormSection = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   background-color: lightblue;
   &:nth-child(1){
      grid-area: nadpis;
   }
   &:nth-child(2){
      grid-area: vyber;
   }
   &:nth-child(3){
      grid-area: dny;
   }
   &:nth-child(4){
      grid-area: doprava;
   }
   &:nth-child(5){
      grid-area: kalkulace;
   }
`;

export const KoloObal = styled.div`
display:flex;
justify-content:center;
`;

export const Kolo = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  padding:20px;
`;
export const SectionTitle = styled.h2`
   color: black;
   font-size: 20px;
   margin: 0px;
   padding: 0;
   padding-bottom: 10px;
`;
export const MainTitle = styled(SectionTitle)`
   font-size: 30px;
   align-self: center;
   justify-self: center;
`;
export const InputDiv = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
`;
export const Kontrola = styled.div`
   display: flex;
   margin-top: 20px;
   background-color: white;
   border: 1px solid black;
   cursor: pointer;
   justify-content: center;
   align-items: center;
   ${props => {
      if (props.checked === 1) {
         return `
            background-color: green;
         `;
      }
      else if (props.checked === 2) {
         return `
            background-color: red;
         `;
      }
   }}
`;
export const GiftAlert = styled.div`
   display: none;
   flex-direction: column;
   margin-top: 20px;
   width: 100%;
   min-height: 40px;
   align-items: center;
   justify-content: center;
   background-color: orange;
   padding-top: 10px;
   border: 2px solid white;
   color: white;
   ${props => {
      if (props.checked === 1) {
         return `
            display: flex;
         `;
      }
      else if (props.checked === 2) {
         return `
            display: none;
         `;
      }
   }}
`;