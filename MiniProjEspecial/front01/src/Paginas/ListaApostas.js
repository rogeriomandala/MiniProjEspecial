import React from 'react';
import './listaaposta.css'; // Assuming the CSS file is in the same directory as this component

const ListaApostas = () => {
    const [apostas,setApostas]= React.useState([]);
    const [listaPag,setListaPag]= React.useState([]);
    const [pag,setPag]= React.useState(0);
    const [totalPag,setTotalPag]= React.useState(0);
    const [limPag,setLimPag]= React.useState(5);
    React.useEffect(() => {

        fetch('http://localhost:4000/api/aposta')
        .then((response) => response.json())
        .then((data) => {
           setApostas(data);
          // console.log(data);
         // console.log("we on..");
        })
        .catch((error) => console.error(error));
    }, []);
    React.useEffect(() => {
        //numero por pagina
        setTotalPag( Math.ceil(apostas.length/limPag));
        setTotalPag(  Math.round(apostas.length/limPag));
       
        var array=Array();
        if(apostas.length>0){ 
            for (let index = pag*limPag; index < apostas.length; index++) {
                array.push( apostas[index]);
                if(array.length>=limPag) break;
            }
        }
        setListaPag(array);
        console.log(apostas,array);
    }, [apostas,pag]);
    function proximaPag(){
        if((pag+1)>totalPag) setPag(0);
        else setPag(pag+1);
    }
    function anteriorPag(){
        if((pag-1)<0) setPag(totalPag);
        else setPag(pag-1);
    }
    return(
        <div className='corpo'>
            <div>

            <p>LISTA DE APOSTAS</p>
          

            <div className='box sombra'>
                <div className='pesquisa_lista'>

                <div id="divBusca">
                    <img style={{"width":"36px","height":"30px"}} src="/lupa.png" alt="Buscar..."/>
                    <input type="text" id="txtBusca" placeholder="Buscar..."/>
                    <button id="btnBusca">Buscar</button>
                </div>
                                    {/*}
                    <form className='form' action="/search" method="GET">
                        <label for="searchQuery">Pesquisar:</label>
                        <input type="text" id="searchQuery" name="q" required/>
                        <button type="submit">
                            Search
                        </button>
                    </form>

                    */}
                </div>
                <div className='lista'>
                    <ul>
                        {
                            listaPag.map((item,index5) => (
                                <li key={index5} >
                                    <div className={'linha '}>
                                        <div className='linha_id'>
                                            <h5>ID:</h5>
                                            <h4>{item._id}</h4>
                                        </div>
                                        <div className='linha_chave'>
                                           {/*} <h5>chave:</h5>*/}
                                        <h4>
                                            <div className='codeContainer'>
                                            <div className='code'>
                                                {
                                            item.code.map((item1,index) => (
                                                <div key={index}>{item1}</div>
                                            ))}
                                            </div>
                                            <div className='estrelas'>
                                            {
                                            item.estrela.map((item2,index) => (
                                                <div key={index}>{item2}</div>
                                            ))}

                                            </div>
                                            </div>
                                        </h4>

                                        </div>
                                        <div className='data_registo'>
                                            <h5>Data:</h5>
                                            <h4>{item.dataregisto}</h4>
                                        </div>
                                    </div>
                                </li>
                                ))
                        }
                    </ul>
                    {
                        (listaPag.length<=0)&&<div className='sombra smsSemDados'>
                            <img src="/info.png" alt="Example" />
                            <div>
                                 Nåo foram encontradas apostas
                                 {apostas.length}
                            </div>
                        </div>
                    }
                    <div className='paginacao'>
                        <div>
                            <button onClick={()=>anteriorPag()}>anterior</button>
                            <button onClick={()=>proximaPag()}>proximo</button>
                        </div>
                        <div>
                            Pagina   
                        </div>
                        <div>
                            {pag+1}
                        </div>
                        <div>
                             de
                     
                        </div>
                        <div>
                
                        {totalPag+1}
                        </div>
                    </div>
                </div>
              
                
                
            </div>
            </div>

   
        </div>
    )
}

export default ListaApostas;