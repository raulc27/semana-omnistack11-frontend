import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import "./styles.css";



const ongId = localStorage.getItem('ongId');



export default function NewIncident(){

    const history = useHistory();

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    
    async function handleNewIncident(e){

        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
                await api.post('incidents',data, {
                    headers:{
                        Authorization: ongId,
                    }
                })
                history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar');
        }
    }

   return(
    <div className="new-incident-container">
    <div className="content">
        <section>
            <img src={logoImg} alt="Be the hero" />

            <h1>Cadastrar novo caso</h1>
            <p>Cadastrar novo caso da ONG</p>
        
        <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para a home
        </Link>
        </section>

        <form onSubmit={handleNewIncident}>
            <input 
              value={title} 
              onChange={e=>setTitle(e.target.value)}
              placeholder="Titulo do caso"  />
            <textarea  
              value={description} 
              onChange={e=>setDescription(e.target.value)}
              placeholder="Descrição" />
             <input 
              value={value} 
              onChange={e=>setValue(e.target.value)}
              placeholder="valor em reais"  />

           

            <button className="button" type="submit">Cadastrar</button>

        </form>

    </div>
</div>
   );
}