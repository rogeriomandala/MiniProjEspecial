import React from 'react';
// Assuming the CSS file is in the same directory as this component
import './gerarchave.css'; 

const GerarChave = () => {
    const [code, setCode]=React.useState([0,0,0,0,0]);
    const [star, setStar]=React.useState([0,0]);

    const [enviado, setEnviado]=React.useState(false);
    const [sucesso, setSucesso]=React.useState(false);

    const mudarCode = (event,i) => {
       var array=Array();
       array=code;
       array[i]=event.target.value;
       setCode(array);
    };
    const mudarStar = (event,i) => {
        var array=Array();
        array=star;
        array[i]=event.target.value;
        setStar(array);
     };
    const validar =(event,i)=>{

    }
    const validarStar =(event,i)=>{

    }
    function validateNumber() {
  
    }

    const cmdGerarChave=(e)=>{
        e.preventDefault(); 
        fetch('http://localhost:4000/api/aposta', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: `{"code":[${code}],"stars":[${star}]}`
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data.valida==undefined){
                    setEnviado(true);
                    setSucesso(true);
                }
                if(data.valida==false)
                {
                    setSucesso(false);
                    setEnviado(true);
                }
                
            })
            .catch((error) => console.error('Error:', error));
        
    }
    return(
        <div className='container_'>
           <div className='linha1_'>
            <div className='linha1_left_'>
                <h5>GERAR CHAVE</h5>
            </div>
            <div className='linha1_right_'>
                <h1>Ganha Premios concorrendo ao Euromilhoes</h1>
            </div>
           </div>
           <div className='linha2'>
            <div className='linha2_left'>
                <div className="form">
                    <form className="login-form">
                        <div className='cod' >
                            {
                                code.map((item,index)=>(
                                   
                                    <input 
                                        onBlur={e=>mudarCode(e,index)}                                   
                                        key={index}
                                        type="number" 
                                        min="1"
                                        max="50"                                   
                                        placeholder={item}
                                        onChange={e=>validar(e,index)}
                                       
                                    />
                                    
                                    
                                ))
                            }
                        </div>
                        <div className='star'>
                            {
                                    star.map((item,index)=>(
                                    
                                        <input
                                        
                                            required maxLength="2"                                         
                                            key={index} 
                                            onBlur={e=>mudarStar(e,index)}                                   
                                            type="number" 
                                            min="1"
                                            max="12"                                   
                                            placeholder={item}
                                            onChange={e=>validarStar(e,index)}

                                     
                                        />
                                        
                                        
                                    ))
                                }
                        </div>
                        <button 
                            onClick={(e)=>cmdGerarChave(e)}>
                            Gerar chave
                        </button>

                    </form>
                </div>

            </div>      
            <div className='linha2_right'>
                <p>Preencher os campos e gere as suas apostas para 
                    as apostas euromilhoes na nossa plataforma
                </p>
                <p>1) Digite 5 numeros de 1 a 50</p>
                <p>2) Digite 2 numeros de  estrelas de 1 a 12</p>
                <p>Para gerar chaves de forma automatica clique na opcao 
                    automatico
                </p>
                {
                        enviado&&
                <div className='chave_gerada'>
                   <h1>Chave gerada:</h1>
                   <h2>
                    {

                        code.map((item,index)=>(
                            <font className='xcode'>{item}</font>
                        ))
                    }
                    {

                        star.map((item,index)=>(
                        <font className='scode' style={{color:"blue"}}>{item}</font>
                    ))
                    }
                   </h2>
                </div>
                }

                {
                    (enviado==true)&&(sucesso==false)&&
                    <div className='chave_gerada_error'>
                    <img src="/error.png" alt="Example" />
                       <h3>Impossivel gerar a..</h3>
                    </div>
                }
                {
                    (enviado==true)&&(sucesso==true)&&    
                    <div className='chave_gerada_sucesso'>
                    <img src="/sucesso.png" alt="Example" />
                    <h3>A chave escolhida é valida</h3>
                </div>
                }
            </div>
            </div>

        </div>
    )
}

export default GerarChave;