
	let limiteEdad=21;
	let limiteSueldo=16000;	
	let $solicitante=$('#solicitante');
	let $solicitud=$('#solicitud');
	let $formu=$('#formu');

// Clase persona
class Persona{
	constructor(nombre, apellido, dni, fechanac, sueldo){
		this.nombre=nombre;
		this.apellido= apellido;
		this.dni=dni;
		this.fechanac=fechanac;
		this.sueldo=sueldo;		
	}
}

// clase UI Nos muestra la persona cargada por form
class UI{
	agregarPersona(persona){

		const mostrarPersona = document.getElementById('solicitante');		
		const element = document.createElement('section');
		element.setAttribute("id", "solicitud");
		element.innerHTML = `
		<h1>Solicitante del prestamo</h1>	
	<form>
	
		<div id="datos">
			<h3> ${persona.apellido} ${persona.nombre} </h3>
	        <h3>DNI : ${persona.dni} </h3>
	        <h3>Fecha Nacimiento : ${persona.fechanac} </h3>
	        <h3>Sueldo : $ ${persona.sueldo} </h3>	        
		</div>
		<input class="campos" type="number" value="" id="prestamo" placeholder="Ingrese monto a  solicitar">

		<select class="campos" id="opciones" required="required">		
		  <option value="" disabled selected >Seleccione número de cuotas</option>
		  <option value="3">3 cuotas - interes de 8%</option>
		  <option value="6">6 cuotas - interes de 16%</option>
		  <option value="9">9 cuotas - interes de 24%</option>
		  <option value="12">12 cuotas - interes de 32%</option>
		  <option value="18">18 cuotas - interes de  48%</option>
		  <option value="24">24 cuotas - interes de 62%</option>			  
		</select>
		<h1 id="cuota"></h1>

		<input class="btn" type="submit" id="btnAceptar" value="Aceptar" >
		<input class="btn" type="reset" id="btnCancelar" value="Cancelar" >	
	</form>
			`;		
		mostrarPersona.parentNode.appendChild(element);		
		$solicitante.hide(1000);
		
	}

	superaLimite(presta, sueld){
		if(presta >sueld*3){
			return true;
		}else{
			return false;
		}
	}

	valorCuota(cantCuota, presta){
		let valorDeLaCuota=0;
		let prestaInteres=0;
		
		switch(cantCuota){
			case 3:
				prestaInteres=presta*1.08;
				valorDeLaCuota=prestaInteres/cantCuota;
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
	
	validarPrestamo(nomb, cantCuota, presta, sueld){
		
		let cuota=this.valorCuota(cantCuota, presta);
		let sobrepasaLimite=this.superaLimite(presta, sueld)
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

	calcularEdad(fecha) {
	    let hoy = new Date();
	    let fechaNac = new Date(fecha);
	    let edad = hoy.getFullYear() - fechaNac.getFullYear();
	    let m = hoy.getMonth() - fechaNac.getMonth();

	    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
	        edad--;
	    }
	    return edad;
	}

	validarAptitud(persona, ui){
		let nomb= persona.nombre;
		let ape= persona.apellido;
		let dni= persona.dni;
		let fnac= persona.fechanac		
		let sueld= persona.sueldo;		
		let edad=this.calcularEdad(fnac);
				
		if(edad<limiteEdad){
			alert("No es posible que accedas al prestamo \nDebes ser mayor de 21 años");					
		}else if(sueld<limiteSueldo){
			alert("No es posible que accedas al prestamo \nDebes tener un sueldo mayor a $16000");				
		}else{			
			this.agregarPersona(persona);						
			
			let seleccion = document.getElementById('opciones');
			seleccion.addEventListener('change',
			  function(){
			  	const ui = new UI;
			    let selectedOption = parseInt(this.options[seleccion.selectedIndex].value);
			    let presta= document.getElementById("prestamo").value;	    
			    ui.validarPrestamo(nomb, selectedOption, presta, sueld);		    
			    
			  });
		}

	}

	resetForm(){
		document.getElementById('formu').reset();
	}

	validarDatos(){			

	}
}

// DOM
function traerFormulario(){
	document.getElementById('formu')
	.addEventListener('submit', function(e){
		const nombre = document.getElementById('nombre').value;
			apellido= document.getElementById('apellido').value;
			dni = document.getElementById('dni').value;
			fechanac = document.getElementById('fNac').value;
			sueldo = document.getElementById('sueldo').value;

// Crear el objeto Persona
		const persona = new Persona(nombre, apellido, dni, fechanac, sueldo);
		const ui = new UI;
		//ui.agregarPersona(persona);
		ui.validarAptitud(persona);
		//ui.resetForm();
		e.preventDefault();
		console.log(persona);
	});
}

function iniciar(){
	$solicitante.hide();
	$solicitante.fadeIn(1000);
	traerFormulario();
}
$(document).ready(iniciar());