async function submitLead(e){
  e.preventDefault();
  const form=e.currentTarget;
  const note=document.getElementById('formNote');
  const button=form.querySelector('button[type="submit"]');
  const original=button.textContent;

  button.disabled=true;
  button.textContent="INVIO IN CORSO...";
  note.textContent="Stiamo inviando la richiesta...";
  note.className="form-note sending";

  try{
    const formData=new FormData(form);
    const response=await fetch(form.action,{
      method:"POST",
      body:formData,
      headers:{"Accept":"application/json"}
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok || data.success===false){
      throw new Error(data.message || "Invio non riuscito");
    }
    form.reset();
    button.textContent="RICHIESTA INVIATA ✓";
    note.textContent="Grazie! La tua richiesta è stata inviata a TOH! Partner. Ti ricontatteremo appena possibile.";
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
