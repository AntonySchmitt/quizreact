import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Pergunta from './Pergunta';
import perguntas from '../assets/perguntas';

const Quiz = () => {
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [respostaEscolhida, setRespostaEscolhida] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const avancarPergunta = () => {
    setIndicePergunta(indicePergunta + 1);
    setRespostaEscolhida(null);
    setRespostaCorreta(null);
    setMensagem('');
  };

  const verificarResposta = () => {
    const respostaCorretaAtual = perguntas[indicePergunta].resposta;

    setRespostaCorreta(respostaEscolhida.toLowerCase() === respostaCorretaAtual.toLowerCase());
      setMensagem('Resposta Correta, poder seguir para proxima pergunta!')

    if (respostaEscolhida.toLowerCase() !== respostaCorretaAtual.toLowerCase()) {
      setMensagem('Resposta incorreta. Tente novamente.');
    }
  };

  const handleEscolherResposta = (resposta) => {
    setRespostaEscolhida(resposta);
    setMensagem('');
  };

  return (
    <View>
      <Pergunta pergunta={perguntas[indicePergunta].pergunta} />
      <View style={styles.opcoesContainer}>
        {perguntas[indicePergunta].opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.opcaoBotao,
              {
                backgroundColor:
                  respostaEscolhida === opcao
                    ? respostaCorreta
                      ? '#4CAF50' // Verde se a resposta estiver correta
                      : '#E57373' // Vermelho se a resposta estiver errada
                   : '#ecf0f1',
              },
            ]}
            onPress={() => handleEscolherResposta(opcao)}
          >
            <Text style={styles.opcaoTexto}>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}
      <Button title="Verificar Resposta" onPress={verificarResposta} />
      {respostaCorreta && (
        <Button title="Próxima Pergunta" onPress={avancarPergunta} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  opcoesContainer: {
    marginTop: 20,
  },
  opcaoBotao: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  opcaoTexto: {
    color: '#2c3e50',
    fontSize: 16,
  },
  mensagem: {
    color: '#E57373',
    marginTop: 10,
    padding: 10,
  },
});

export default Quiz;
