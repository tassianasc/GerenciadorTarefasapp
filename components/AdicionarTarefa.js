import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdicionarTarefa({ mudarTela }) {
  const [texto, setTexto] = useState('');

  async function salvarTarefa() {
    const data = await AsyncStorage.getItem('tarefas');
    const tarefas = data ? JSON.parse(data) : [];

    const novaTarefa = { id: Date.now().toString(), texto };
    tarefas.push(novaTarefa);
    await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    mudarTela('tarefas');
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Digite uma tarefa" value={texto} onChangeText={setTexto} style={styles.input} />
      <Button title="Salvar" onPress={salvarTarefa} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
});