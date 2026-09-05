function submitLead(e){
  e.preventDefault();
  const note=document.getElementById('formNote');
  note.textContent="Perfetto: richiesta pronta. Prima della pubblicazione collegheremo il modulo al recapito TOH! definitivo.";
  note.style.color="#0b7a3b";
  e.target.querySelector("button").textContent="RICHIESTA PRONTA ✓";
  return false;
}