
	let limiteEdad=21;
	let limiteSueldo=16000;
	$('#solicitud').hide();
	$('#solicitante').hide();
	$('#solicitante').fadeIn(1500);



	function superaLimite(presta, sueld){
		if(presta >sueld*3){
			return true;
		}else{
			return false;
		}
	}

	function valorCuota(cantCuota, presta){
		let valorDeLaCuota=0;
		let prestaInteres=0;
		
		switch(cantCuota){
			case 3:
				prestaInteres=presta*1.08;
				valorDeLaCuota=prestaInteres/cantCuota;
				console.log(valorDeLaCuota);
			break;
			case 6:
				prestaInteres=presta*1.16;
				valorDeLaCuota=prestaInteres/cantCuota;
			break;
			case 9:
				prestaInteres=presta*1.24;
				valorDeLaCuota=prestaInteres/cantCuota;
			break;
			case 12:
				prestaInteres=presta*1.32;
				valorDeLaCuota=prestaInteres/cantCuota;
			break;
			case 18:
				prestaInteres=presta*1.48;
				valorDeLaCuota=prestaInteres/cantCuota;
			break;
			case 24:
				prestaInteres=presta*1.62;
				valorDeLaCuota=prestaInteres/cantCuota;
			break;
		}
		return valorDeLaCuota;
	}
	
	function calcularEdad(fecha) {
	    let hoy = new Date();
	    let fechaNac = new Date(fecha);
	    let edad = hoy.getFullYear() - fechaNac.getFullYear();
	    let m = hoy.getMonth() - fechaNac.getMonth();

	    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
	        edad--;
	    }
	    return edad;
	}

	function validar(){	
		let nomb= document.getElementById("nombre").value;
		let ape= document.getElementById("apellido").value;
		let dni= document.getElementById("dni").value;
		let fnac= document.getElementById("fNac").value;		
		let sueld= document.getElementById("sueldo").value;		
		let edad=calcularEdad(fnac);
				
		if(edad<limiteEdad){
			alert("No es posible que accedas al prestamo \nDebes ser mayor de 21 años");					
		}else if(sueld<limiteSueldo){
			alert("No es posible que accedas al prestamo \nDebes tener un sueldo mayor a $16000");				
		}else{
			$('#solicitante').hide(500);
			$('#solicitud').show(500);
			document.getElementById("datos").innerHTML="<h2>"+nomb+" "+ape+"</h2><h3>dni: "+dni+"</h3>";						
			let btnPrestamo= document.getElementById("btnPrestamo");
			let seleccion = document.getElementById('opciones');
			seleccion.addEventListener('change',
			  function(){
			    let selectedOption = parseInt(this.options[seleccion.selectedIndex].value);
			    let presta= document.getElementById("prestamo").value;			    
			    validarPrestamo(nomb, selectedOption, presta, sueld);			    
			    /*alert(selectedOption.value + ': ' + selectedOption.text);*/
			  });
		}
	}

	function validarPrestamo(nomb, cantCuota, presta, sueld){
		/*console.log(typeof(cantCuota), presta);*/
		let cuota=valorCuota(cantCuota, presta);
		let sobrepasaLimite=superaLimite(presta, sueld)
		if (sobrepasaLimite) {
			alert("El prestamo no puede ser mayor al triple de su sueldo");
			document.getElementById("prestamo").value="";
		}else if(cuota>presta*0.40){
			alert("El valor de la cuota no puede ser mayor al 40% del  sueldo");
		}else{
			let divCuota= document.getElementById("cuota");
			divCuota.style.width = "100%";
			divCuota.innerHTML="Pago en "+cantCuota+" cuotas de $"+cuota.toFixed(2);
			let btnAceptar= document.getElementById("btnAceptar");
			btnAceptar.onclick = function(){
				alert(nomb+" su prestamo por $"+presta+" está siendo procesado\nTendrá la aprobación de su prestamo, previa constatación de su historial crediticio");
				location.reload();
			}

		}		
	}

	let bnt= document.getElementById("btn");
	bnt.onclick = function(){validar()};