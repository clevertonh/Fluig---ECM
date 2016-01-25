function displayFields(form,customHTML){
	form.setShowDisabledFields(true);
	form.setHidePrintLink(false);

	if(form.getFormMode() == "MOD"){
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId",getValue("WKUser"));
		var colaborador = getDatasetValues('colleague',filter).get(0).get("colleagueName");

		var dtNow = new java.util.Date();
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
		var today = sdf.format(dtNow);

		form.setValue('user', colaborador);
		form.setValue('data_mod', today);
	}
}
 
 function validateForm(form){
	if(form.getFormMode() == "ADD"){
		throw "Não é posivel gerar novas fichas desse formulário."
	}
}