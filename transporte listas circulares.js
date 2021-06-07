let Ruta=function(numero, base, minutos)
  {
    this.numero=numero;
    this.base=base;
    this.minutos=minutos;
    this.siguiente=null;
    this.anterior=null;
    this.info=function()
        {
            return  "<div>" + "<h2>" + "La Ruta No. " + this.numero + "</h2>" +
                    "<h3>" + " con Base en " + this.base + "</h3>" +
                    "<H3>" + " llega a los " + this.minutos + " minutos al proximo destino" + "</H3>" + "</div>";
        }
  };

let Control=function()
  { 
    this.inicio=null;
    let t;
    this.agregar=function(nuevo)
    {
      if (this.inicio==null)
      {
        this.inicio=nuevo;
        nuevo.siguiente=this.inicio;
        nuevo.anterior=this.inicio;
        t=nuevo;
      }
      else
      {
        if(t==this.inicio)
        {
          t=nuevo;
          t.siguiente=this.inicio;
          this.inicio.siguiente=t;
          t.anterior=this.inicio;
          this.inicio.anterior=t;
        }
        else
        {
          t.siguiente=nuevo;
          nuevo.anterior=t;
          nuevo.siguiente=this.inicio;
          this.inicio.anterior=nuevo;
          t=nuevo;
          return true;
        }
      }
    }

    this.buscar=function(base)
    {
      let t=this.inicio;
        while(t.base!=base || t!=t.siguiente)
          if(t.base==base)
            {
              return t;
            }
          else
            {
              if(this.inicio==t.siguiente)
              {
                return false;
              }
              else
              {
                if(t.base!=base)
                {
                  t=t.siguiente;
                }
              }
            }
    }
    

    this.listar=function()
    {
      let res=""; 
      if (this.inicio!=null)
        res=this.listarRec(this.inicio);
      return res; 
    }

    this.listarRec=function(nodo)
    {
      if(nodo.siguiente==this.inicio)
      {
        return nodo.info();
      }
      else
      {
        return nodo.info() + this.listarRec(nodo.siguiente);
      }
    }

    this.eliminar = function (base)
    { 
      let vacio="";
      if(vacio==base)
      {
        return false;
      }
      else
      {
        let t=this.inicio;
        while(t.base!=base || t!=t.siguiente)
          if (t.base==base && t==this.inicio)
          {
            this.inicio=t.siguiente;
            t.siguiente.anterior=t.anterior;
            t.anterior.siguiente=t.siguiente;
            return true;
          }
          else
          {
            if (t.base==base)
            {
              t.siguiente.anterior=t.anterior;
              t.anterior.siguiente=t.siguiente;
              return true;
            }
            else
            {
              if(this.inicio==t.siguiente)
              {
                return false;
              }
              else
              {
                if(t.base!=base)
                {
                  t=t.siguiente;
                }
              }
            }
          }
      }
    }

    this.recorrido = function (base, HI, MI, HS, MS)
    {
      let baseinicial=this.buscar(base);
      let recorrido="";
      let TI=parseInt((HI*60)+MI);
      let TS=parseInt((HS*60)+MS);
      let tiempo=TI;
      let temp=baseinicial;

      this.convertir = function(tiempo)
      {
        let minutos=tiempo%60;
        let horas=(tiempo-minutos)/60;
        if(minutos<10)
        {
          return horas + ":" + "0" + minutos;
        }
        else
        {
          return horas + ":" + minutos;
        } 
      }

        if(baseinicial==null)
        {
          return false;
        }
        else
        {
          while(tiempo>TI || tiempo<TS)
            if(tiempo>TS)
            {
              return recorrido;
            }  
            else
            {
              recorrido += "<h3>" + " A las " + this.convertir(tiempo) + " esta en " + temp.base + "</h3>";
              tiempo+=parseInt(temp.minutos);
              temp=temp.siguiente;
            }
        }
    }
  };

  
  let Vuelta=new Control();

let btnNuevo=document.getElementById('btnNuevo');
btnNuevo.addEventListener('click',()=>{
        let numero, base, minutos;
        numero=document.getElementById('IntroNumero').value;
        base=document.getElementById('IntroBase').value;
        minutos=document.getElementById('IntroMinutos').value;
        let ruta=new Ruta(numero,base,minutos);
        Vuelta.agregar(ruta);
        document.getElementById('IntroNumero').value="";
        document.getElementById('IntroBase').value="";
        document.getElementById('IntroMinutos').value="";
        
        console.log(ruta); 
});

let btnBuscar=document.getElementById('btnBuscar');
btnBuscar.addEventListener('click',()=>{
    let base=document.getElementById('IntroBase').value;
    let buscado=Vuelta.buscar(base);
    let res=document.getElementById('resultado1');
    if (buscado==false)
    {
        document.getElementById('resultado1').innerHTML=" ";
        res.innerHTML += "<h2>No se encontro en la busqueda</h2>" 
    }
    else
    {
        document.getElementById('resultado1').innerHTML=" ";
        res.innerHTML += "<h2>Si se encontro la ruta</h2>" + buscado.info();
    }  
});

  let btnEliminar=document.getElementById('btnEliminar');
  btnEliminar.addEventListener('click',()=>{
      let base=document.getElementById('IntroBase').value;
      let eliminado=Vuelta.eliminar(base);
      let res=document.getElementById('resultado1');
      if (eliminado==false)
      {
          document.getElementById('resultado1').innerHTML=" ";
          res.innerHTML += "<h2>La ruta no existe o ya se elimino</h2>" 
      }
      else
      {
          document.getElementById('resultado1').innerHTML=" ";
          res.innerHTML += "<h2>Se elimino Correctamente la ruta</h2>";
      }
  });

let btnListar=document.getElementById('btnImprimir');
btnListar.addEventListener('click',()=>{
    document.getElementById('resultado1').innerHTML=" ";
    let res=document.getElementById('resultado1');
    res.innerHTML+="<h2>Listado de Rutas</h2>" + Vuelta.listar();
});

let btnMostrar=document.getElementById('btnMostrar');
  btnMostrar.addEventListener('click',()=>{
      let base=document.getElementById('IntroBaseInicio').value;
      let HI=parseInt(document.getElementById('IntroHoraInicio').value);
      let MI=parseInt(document.getElementById('IntroMinutoInicio').value);
      let HS=parseInt(document.getElementById('IntroHoraSalida').value);
      let MS=parseInt(document.getElementById('IntroMinutoSalida').value);
      let mostrado=Vuelta.recorrido(base, HI, MI, HS, MS);
      let res=document.getElementById('resultado2');
      if (mostrado==false)
      {
          document.getElementById('resultado2').innerHTML=" ";
          res.innerHTML += "<h2>No existe la base</h2>" 
      }
      else
      {
          document.getElementById('resultado2').innerHTML=" ";
          res.innerHTML += "<h2>Su recorrido es: </h2>" + mostrado;
      }
  });