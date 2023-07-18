import style from './Perfil.module.css';
import React, { useState, useEffect } from "react";
import FormUpdate from "../FormUpdate/FormUpdate";
import FormAnuncio from "../FormAnuncio/FormAnuncio";
import { getUser, getAllPublication } from '../../Redux/actions';
import { connect } from "react-redux";
import SendPhoto from "../SendPhoto/SendPhoto";
import PublicationUser from "../PublicationUser/PublicationUser";
import Favoritos from "../Favoritos/Favoritos";
import Messages from "../Messages/Messages";
import { useParams } from "react-router";

const Perfil = ({ userData, getUser, getAllPublication }) => {
  const { tab } = useParams();

  useEffect(() => {
    setRenderUser(userData);
  }, [userData]);

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser);
    }
  }, [getUser]);

  const [renderProfile, setRenderProfile] = useState(false);
  const [renderAnuncios, setRenderAnuncios] = useState(false);
  const [renderAnunciosFavoritos, setRenderAnunciosFavoritos] = useState(false);
  const [renderHistorial, setRenderHistorial] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [renderUser, setRenderUser] = useState(userData);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));
  const [renderFormAnuncio, setRenderFormAnuncio] = useState(false);
  const [submitFormAnuncio, setSubmitFormAnuncio] = useState(false);
  const [renderMensajes, setRenderMensajes] = useState(false);

  useEffect(() => {
    if (tab === 'profile') {
      setRenderProfile(true);
      setRenderAnuncios(false);
      setRenderAnunciosFavoritos(false);
      setRenderHistorial(false);
      setRenderMensajes(false);
    } else if (tab === 'anuncios') {
      setRenderAnuncios(true);
      setRenderProfile(false);
      setRenderAnunciosFavoritos(false);
      setRenderHistorial(false);
      setRenderMensajes(false);
    } else if (tab === 'anunciosfav') {
      setRenderAnunciosFavoritos(true);
      setRenderProfile(false);
      setRenderAnuncios(false);
      setRenderHistorial(false);
      setRenderMensajes(false);
    } else if (tab === 'historial') {
      setRenderHistorial(true);
      setRenderProfile(false);
      setRenderAnuncios(false);
      setRenderAnunciosFavoritos(false);
      setRenderMensajes(false);
    } else if (tab === 'mensajes') {
      setRenderMensajes(true);
      setRenderProfile(false);
      setRenderAnuncios(false);
      setRenderAnunciosFavoritos(false);
      setRenderHistorial(false);
    }
  }, [tab]);

  const changeTab = (event) => {
    const clickedTab = event.target.id;
    if (clickedTab === 'profile') {
      setRenderProfile(true);
      setRenderAnuncios(false);
      setRenderAnunciosFavoritos(false);
      setRenderHistorial(false);
      setRenderMensajes(false);
    } else if (clickedTab === 'anuncios') {
      setRenderAnuncios(true);
      setRenderProfile(false);
      setRenderAnunciosFavoritos(false);
      setRenderHistorial(false);
      setRenderMensajes(false);
    } else if (clickedTab === 'anunciosfav') {
      setRenderAnunciosFavoritos(true);
      setRenderProfile(false);
      setRenderAnuncios(false);
      setRenderHistorial(false);
      setRenderMensajes(false);
    } else if (clickedTab === 'historial') {
      setRenderHistorial(true);
      setRenderProfile(false);
      setRenderAnuncios(false);
      setRenderAnunciosFavoritos(false);
      setRenderMensajes(false);
    } else if (clickedTab === 'mensajes') {
      setRenderMensajes(true);
      setRenderProfile(false);
      setRenderAnuncios(false);
      setRenderAnunciosFavoritos(false);
      setRenderHistorial(false);
    }
  };

  const updateData = () => {
    setRenderForm(true);
  };

  const handleFormSubmit = () => {
    getUser(currentUser);
    setRenderForm(false);
  };

  const handleFormSubmitAnuncio = () => {
    getUser(currentUser);
    setSubmitFormAnuncio(true);
    setRenderFormAnuncio(false);
    setRenderAnuncios(true);
  };

  const handlePhotoSubmit = () => {
    getUser(currentUser);
    setRenderUser(userData);
    window.location.reload();
  };

  const cancelarForm = () => {
    setRenderForm(false);
  };

  const createAnuncio = () => {
    setRenderFormAnuncio(true);
  };

  const cancelarFormAnuncio = () => {
    setRenderFormAnuncio(false);
  };

  const containerStyle = {
    backgroundImage: `url(${renderUser.assets})`
  };

  useEffect(() => {
    if (submitFormAnuncio) {
      getAllPublication(currentUser);
      setSubmitFormAnuncio(false);
    }
  }, [submitFormAnuncio, getAllPublication, currentUser]);

  return (
    <div>
      <div className={style.contenedorPerfil}>
        <div className={style.contenedorTabs}>
          <p id='profile' onClick={changeTab} className={renderProfile ? `${style.tabs} ${style.active}` : style.tabs}>
            Mi perfil
          </p>
          <p id='anuncios' onClick={changeTab} className={renderAnuncios ? `${style.tabs} ${style.active}` : style.tabs}>
            Anuncios
          </p>
          <p
            id='anunciosfav'
            onClick={changeTab}
            className={renderAnunciosFavoritos ? `${style.tabs} ${style.active}` : style.tabs}
          >
            Anuncios Favoritos
          </p>
          <p id='historial' onClick={changeTab} className={renderHistorial ? `${style.tabs} ${style.active}` : style.tabs}>
            Historial
          </p>
          <p id='mensajes' onClick={changeTab} className={renderMensajes ? `${style.tabs} ${style.active}` : style.tabs}>
            Mensajes
          </p>
        </div>
        <section className={style.contenedorInfo}>
          {renderProfile && (
            <>
              <section className={style.datos}>
                <p className={style.infoLabel}>Nombre: {renderUser.name}</p>
                <p className={style.infoLabel}>Email: {renderUser.email}</p>
                <p className={style.infoLabel}>Fecha de Nacimiento: {renderUser.date}</p>
                <p className={style.infoLabel}>Género: {renderUser.gender}</p>
                <p className={style.infoLabel}>Teléfono: {renderUser.phone}</p>
                <p className={style.infoLabel}>Certificados: {renderUser.certificate}</p>
                <button className={style.botonForm} onClick={updateData}>
                  Modificar Perfil
                </button>
              </section>
              <section className={style.imagen}>
                <div className={style.imgCont} style={containerStyle}></div>
                <SendPhoto className={style.send} onSubmit={handlePhotoSubmit} />
              </section>
              {renderForm && <FormUpdate isVisible={renderForm} onCancel={cancelarForm} onSubmit={handleFormSubmit} />}
            </>
          )}
          {renderAnuncios && (
            <div>
              <div className={style.containerAnuncios}>
                <section className={style.crearAnuncio}>
                  <button onClick={createAnuncio}>Crear Anuncio</button>
                </section>
                <section className={style.cards}>
                  <PublicationUser submitFormAnuncio={submitFormAnuncio} />
                </section>
              </div>
              {renderFormAnuncio && (
                <FormAnuncio isVisible={renderFormAnuncio} onCancel={cancelarFormAnuncio} onSubmit={handleFormSubmitAnuncio} />
              )}
            </div>
          )}
          {renderAnunciosFavoritos && <Favoritos />}
          {renderHistorial && <p className={style.infoLabel}>Historial</p>}
          {renderMensajes && <Messages />}
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.allInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (email) => dispatch(getUser(email)),
    getAllPublication: (email) => dispatch(getAllPublication(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
