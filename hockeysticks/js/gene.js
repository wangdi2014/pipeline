//Angela Fan


var gene_name = "PRMT7";

//find the files the gene is in
d3.csv("/Documents/Bradner_work/hockey-sticks/lookup_table.csv", function(error, data){
	//MM1S_H3K27AC_DMSO_HOCKEY.csv 
	var input = gene_name;

	var data_length = data.length;

	var file_name_array = [];

	for (var i = 0; i < data.length; i++) {
		//console.log("hello")
		if (data[i].gene == input) {
			if (data[i].file) {
				file_name_array.push(data[i].file);
				//console.log(data[i].file)
				break;
			}
		}
	}


	var ranking_array = [];

	for (var i = 0; i < file_name_array.length; i++) {

		var current_file = file_name_array[i];

		d3.csv("/Documents/Bradner_work/hockey-sticks/" + current_file, function(error, current_data) {
			
			current_data.forEach(function(d) {

				var genes = d.PROXIMAL_GENES.split(";");
				// if (i==1) {
				// 	console.log(genes)
				// }
				for (var j = 0; j < genes.length; j++) {
					if (i == 1) {
						//console.log(genes[j])
					}
					if (genes[j] == gene_name) {

						//console.log("hello")

						ranking_array.push({"filename": current_file, "rank": +d.RANK});

						//console.log(ranking_array)

						var current_file_name = current_file.split("_HOCKEY")[0];

						current_file_name = "/Documents/Bradner_work/hockey-sticks/" + current_file_name + "_plots/" + "SE_plots_" + current_file_name + "_" + d.REGION_ID + ".pdf";

						$("#pdf_window")
							.append('<div class="gene_pdf"> <object data=' + current_file_name + 
							' type="application/pdf" width="840px" height="580"> alt : <a href='+ current_file_name + '>test.pdf</a> </object> </div>' )                                                                               


					}
				}

			});

			console.log(ranking_array)

		})

	}

});

