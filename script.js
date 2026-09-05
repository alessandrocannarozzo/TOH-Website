const PARTNER_LEAD_ENDPOINT="https://latuapizzeria-backend.onrender.com/api/partner-leads";

async function submitLead(e){
  e.preventDefault();
  const form=e.currentTarget;
  const note=document.getElementById('formNote');
  const button=form.querySelector('button[type="submit"]');
  const original=button.textContent;
  const fd=new FormData(form);

  const payload={
    pizzeria:String(fd.get('pizzeria')||'').trim(),
    referente:String(fd.get('referente')||'').trim(),
    citta:String(fd.get('citta')||'').trim(),
    telefono:String(fd.get('telefono')||'').trim(),
    email:String(fd.get('email')||'').trim(),
    messaggio:String(fd.get('messaggio')||'').trim(),
    consensoRicontatto:fd.get('consenso_ricontatto')==='Sì',
    website:String(fd.get('website')||'').trim()
  };

  button.disabled=true;
  button.textContent="INVIO IN CORSO...";
  note.textContent="Stiamo inviando la richiesta...";
  note.className="form-note sending";

  try{
    const response=await fetch(PARTNER_LEAD_ENDPOINT,{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify(payload)
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok || data.ok!==true) throw new Error(data.error||"Invio non riuscito");
    form.reset();
    button.textContent="RICHIESTA INVIATA ✓";
    note.textContent="Grazie! La tua richiesta è arrivata a TOH! Partner. Ti ricontatteremo appena possibile.";
    note.className="form-note success";
    setTimeout(()=>{button.textContent=original;button.disabled=false;},5000);
  }catch(err){
    button.textContent=original;
    button.disabled=false;
    note.textContent="Non siamo riusciti a inviare la richiesta. Puoi scriverci direttamente a partner@tohfood.it.";
    note.className="form-note error";
  }
  return false;
}
