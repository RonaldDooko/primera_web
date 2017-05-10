//variables para registro de cursos
var datosCurso;
var envioCurso=[];
var valoresRegistroCurso=[];

//variable que trabaja con el reporte de cursos con filtro
var longitudReporteFiltro;//longitud
var datosRptePersonalizado; //vaciado de datos
var datosEnvioCRP=[];
var valoresReportePers=[];


//datos de permisos individuales
var datosPermisoSolInd;
var envPermisoSolInd=[];
var envRegistroSolInd=[];

var datosPermisoSolAdm;
var endPermisoSolAdm=[];

var d_b_per_sol=[];

//actualizacion de datos personales
var datosActualizarAdm;




	//inicializacion del calendario
	
		$(".calendario").datepicker({
			autosize: true,
			/*showOn:"button",
			buttonImage:"images/calendar.gif",
			buttonImageOnly:true,
			buttonText:"Seleccione",*/
			dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			dayNamesMin: ['Dom', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
			firstDay: 1,
			monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto', 'Septiembre','Octubre','Noviembre','Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul', 'Ago', 'Sep','Oct','Nov','Dic'],
			dateFormat: 'dd/mm/yy',
			changeYear: true,
			changeMonth:true,
	//		numberOfMonths: 2,
			yearRange: "1940:2020"
		});		
	
	

	


	//funcion que busca el input si esta o no checkeado se debe enviar con el json
	function InputsCheckForm(form, json){
		limpiaJson(json);
		$("#"+form+" input[type=checkbox]:checked").each(function(){
			var iPago={
				itp:$(this).val()
			};
			json.push(iPago);
		});
	};


	//funcion que deja desde cero el json
	function limpiaJson(json){
		json.length=0;
	};


	function InputsRadioCheck(form){
		var radioV="null";
		var radios=$("#"+form+" input[type=radio]").parents('label');
		//console.log(radios.length);
		for(i=0;i<radios.length;i++){
			//console.log($(radios[i]).hasClass('active'));
			if($(radios[i]).hasClass('active')){
				$(radios[i]).children('input').attr('id');
				//console.log($(radios[i]).children('input').attr('id'));
				var radioV=$(radios[i]).children('input').attr('id');
			}
		}
		//console.log(radioV);
		return radioV;
		/*console.log($("#"+form+" input[type=radio]").parents('label').hasClass('active', function(){
			this.children('input [type=radio]');
		}));*/
	}


	function splitDias(str){
		var nString=str.split('/');
		var ns=nString[2]+'-'+nString[1]+'-'+nString[0];
		return ns;
	}


	function diffDias(fi, ff){
		var fechaInicio = new Date(fi).getTime();
		var fechaFin    = new Date(ff).getTime();

		var diff = fechaFin - fechaInicio;

		return diff/(1000*60*60*24) ;
	}

	//funcion que calcula los minutos
	function calcularMinutos()

	{
		// Cogemos la hora inicial y final y obtenemos los minutos totales
		//var horaInicial=devolverMinutos(document.getElementById("horaInicial").value);
		//var horaFinal=devolverMinutos(document.getElementById("horaFinal").value);

		var horaInicial=devolverMinutos($("#hora_permiso_i").val());
		var horaFinal=devolverMinutos($("#hora_permiso_f").val());

		if(horaInicial<horaFinal)
		{// Restamos los minutos finales con los minutos iniciales
			//document.getElementById("resultado").innerHTML="Hay una diferencia de "+(horaFinal-horaInicial)+" minutos";
			$("#calculo_tiempo").html("Hay una diferencia de "+(horaFinal-horaInicial)+" minutos");
		}else{
			$("#calculo_tiempo").html("La hora inicial tiene que ser inferior a la hora final");
		}
	}

 	// Funcion para obtener los minutos totales... 10:30=630 minutos
	function devolverMinutos(horaMinutos)
	{
		return (parseInt(horaMinutos.split(":")[0])*60)+parseInt(horaMinutos.split(":")[1]);
	}

	//valida hora campo
	$(".hora").on("blur", function(e){
		console.log($(this).val());
		valor=$(this).val();
	   if($(this).val().indexOf("_") == -1)
	   {		      
	      var hora = valor.split(":")[0];
	      var min = valor.split(":")[1];
	      if(parseInt(hora) > 23 )
	      {
	          $(this).val("");		      
	      }

	      if(parseInt(min)>59){
	      	$(this).val("");	
	      }
	   }
	});

	//funcion validar fecha
	$(".calendariomask").on("blur", function(){
			var f=$(this).val();
			re=/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]$/
			if(f.length==0 || !re.exec(f))
			{
				//alert("La fecha no tiene formato correcto.")
				$(this).val("");
				return
			}

			/* comprobamos que la fecha es válida */
			var d = new Date()
			/* la función tiene como entrada: año, mes, día */
			d.setFullYear(f.substring(6,10), 
				      f.substring(3,5)-1,
				      f.substring(0,2))

			/* ¿el mes del objeto Date es el mes introducido por el usuario?
			   OJO: getMonth() devuelve el número de mes del 0 al 11

			   ¿el día del objeto Date es el día introducido por el usuario?
			   OJO: getDate() devuelve el día del mes */
			if(d.getMonth() != f.substring(3,5)-1 
				|| d.getDate() != f.substring(0,2))
			{
				//alert("Fecha no válida.")
				$(this).val("");
				return
			}
			
	});

function alert(div, mesagge){
	alert(message);
}