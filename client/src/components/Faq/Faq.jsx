import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import style from './Faq.module.css';
import dataFq from './dataFq';

const Faq = () => {
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [expandedResponses, setExpandedResponses] = useState([]);

  const handleGroupClick = (grupo) => {
    if (expandedGroups.includes(grupo)) {
      setExpandedGroups(expandedGroups.filter((group) => group !== grupo));
    } else {
      setExpandedGroups([...expandedGroups, grupo]);
    }
  };

  const handleQuestionClick = (pregunta) => {
    if (expandedResponses.includes(pregunta)) {
      setExpandedResponses(expandedResponses.filter((question) => question !== pregunta));
    } else {
      setExpandedResponses([...expandedResponses, pregunta]);
    }
  };

  return (
    <div>
      <NavBar />
      <div className={style.container}>
        <h1>Preguntas frecuentes</h1>
        {dataFq.map((mapeo, index) => (
          <div key={index}>
            <div
              onClick={() => handleGroupClick(mapeo.grupo)}
              className="grupo"
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
             <h2>{mapeo.grupo}</h2>
            </div>
            {expandedGroups.includes(mapeo.grupo) && (
              <div>
                {mapeo.preguntasRespuestas.map((elemento, index) => (
                  <div key={index}>
                    <div
                      className="pregunta"
                      style={{ marginLeft: '20px', cursor: 'pointer',fontWeight: 'bold' }}
                      onClick={() => handleQuestionClick(elemento.pregunta)}
                    >
                      <h3><img src="https://cdn-icons-png.flaticon.com/128/545/545678.png"/>{elemento.pregunta} </h3>
                    </div>
                    {expandedResponses.includes(elemento.pregunta) && (
                      <div className="respuesta" style={{ marginLeft: '40px' }}>
                       <p> {elemento.respuesta}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

