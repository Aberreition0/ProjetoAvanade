import axios from 'axios';
import React, { Component } from 'react';
import { parsejwt } from '../services/Auth';

import banner_login from '../assets/img/banner_login.svg'
import logo_login from '../assets/img/logo-login.svg'

import '../assets/css/login.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            senha: '',
            isLoading: false,
            MensagemErro: '',
        }
    }

    efetuarlogin = (evento) => {
        evento.preventDefault();

        this.setState({ mensagemErro: '', isLoading: true });
        axios.post('url', {
            email: this.state.email,
            senha: this.state.senha
        }).then(resposta => {
            if (resposta === 200) {
                localStorage.setItem('usuario-login', resposta.data.token);
                this.setState({ isLoading: false })

                switch (parsejwt().role) {
                    case '1':
                        this.props.history.push('/painelADM')
                        break;
                    default:
                        this.props.history.refresh()
                        break;
                }
            }

        }).catch(() => {
            this.setState({
                MensagemErro: 'Email ou senha invalido',
                isLoading: false,
                email: '',
                senha: ''
            }, console.log('deu errado'))
        })
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    }


    render() {
        return (
            <div className="container_tela">
                <div className="banner_login">
                    <div className="box_img">
                        <img src={banner_login} alt="Moça andando de bicicleta" />
                    </div>
                </div>
                <form onSubmit={this.efetuarlogin} className="box_form">
                    <img src={logo_login} alt="A logo do nosso site" />
                    <div className="box_inputs">

                        <div className="box_input">
                        <label for="Email" className="label_input">Email:</label>
                        <input name="email" type="text" placeholder="Email" className="input_login" value={this.state.email} onChange={this.atualizaStateCampo} />
                        </div>

                        <div className="box_input">
                        <label for="pass" className="label_input">Senha:</label>
                        <input name="senha" type="password" placeholder="Senha" className="input_login" value={this.state.senha} onChange={this.atualizaStateCampo} />
                        </div>

                        <span className="Mensagem_erro">{this.state.MensagemErro}</span>
                        {
                            this.state.isLoading === true ? <button disabled className="btn_login">Entrando ...</button> : <button type='submit' className="btn_login">Login</button>
                        }
                    </div>
                </form>
            </div>
        )
    }

}
