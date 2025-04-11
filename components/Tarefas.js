import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tarefas({ mudarTela }) {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    const data = await AsyncStorage.getItem('tarefas');
    setTarefas(data ? JSON.parse(data) : []);
  }

  async function removerTarefa(id) {
    const novasTarefas = tarefas.filter(t => t.id !== id);
    await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    setTarefas(novasTarefas);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.texto}</Text>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.remover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Adicionar Tarefa" onPress={() => mudarTela('adicionar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' },
  remover: { color: 'red' },
});