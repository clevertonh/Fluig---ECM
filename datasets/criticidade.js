function createDataset(fields, constraints, sortFields) {

	// Cria as colunas do dataset
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Criticidade");
	dataset.addColumn("Prazo");

	// nome do dataset do Formulario
	var datasetDoFormulario = "criticidade_de_chamados";

	// nome da tabela do formulario
	var tablename = "tb_classe";

	// Cria a constraint para buscar os formulários ativos
	var cst = DatasetFactory.createConstraint("metadata#active", true, true,
			ConstraintType.MUST);
	var constraints = new Array(cst);

	var datasetPrincipal = DatasetFactory.getDataset(datasetDoFormulario, null,
			constraints, null);

	var filhos = new Array();
	var count = 0;

	for (var i = 0; i < datasetPrincipal.rowsCount; i++) {

		// encontrar documento e versão atual
		var documentId = datasetPrincipal.getValue(i, "metadata#id");
		var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

		// Cria as constraints para buscar os campos filhos, passando o
		// tablename, número da formulário e versão
		var c1 = DatasetFactory.createConstraint("tablename", tablename,
				tablename, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId,
				documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version",
				documentVersion, documentVersion, ConstraintType.MUST);
		var constraintsFilhos = new Array(c1, c2, c3);

		var datasetFilhos = DatasetFactory.getDataset(datasetDoFormulario,
				null, constraintsFilhos, new Array("tipo", "classe"));
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			filhos[count] = {
				criticidade : datasetFilhos.getValue(j, "criticidade"),
				prazo : datasetFilhos.getValue(j, "prazo")
			};
			count++;

		}
	}

	// Faz a ordenação
	filhos.sort(compare);

	// Depois de realizar a ordenação, adicionar os registros no dataset para
	// serem apresentados
	filhos.forEach(function(filho) {
		//log.warn(filho.Classe);
		dataset.addRow(new Array(filho.criticidade, filho.prazo));
	});

	return dataset;
}

function compare(a, b) {

	if (a.criticidade < b.criticidade)
		return -1;
	if (a.criticidade > b.criticidade)
		return 1;

	return 0;
}