import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AdicionarTarefa from './components/AdicionarTarefa';
import Tarefas from './components/Tarefas';

export default function App() {
  const [tela, setTela] = useState('tarefas');
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerenciador de Tarefas</Text>
      {tela === 'tarefas' ? <Tarefas mudarTela={setTela} /> : <AdicionarTarefa mudarTela={setTela} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});