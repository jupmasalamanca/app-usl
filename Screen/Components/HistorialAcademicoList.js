import React from 'react'
import {Text, View,StyleSheet} from 'react-native';
import { DataTable } from 'react-native-paper';


const HistorialAcademicoList = ({item}) => {
    const {periodo,codigo,nombre,estado,carrera,grado,notaFinal,notaReposicion,mostrarNota} = item 
  return (
    <View style={styles.containerGeneral}>
    {/* <Text style={styles.label}>Curso:</Text> */}
  <Text style={styles.textoCurso}>{nombre} ({codigo})</Text>
  {/* <Text style={styles.texto}>Carrera: {carrera}</Text> */}
  <Text style={styles.textoPeriodo}>Periodo:{periodo}</Text>

  <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Grado</DataTable.Title>
          <DataTable.Title>Estado</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>{grado}</DataTable.Cell>
          <DataTable.Cell>{estado}</DataTable.Cell>
        </DataTable.Row>
   </DataTable>


  <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Nota Final</DataTable.Title>
          <DataTable.Title>Nota Repos.</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>{notaFinal}</DataTable.Cell>
          <DataTable.Cell>{notaReposicion}</DataTable.Cell>
        </DataTable.Row>
   </DataTable>

   {/* <DataTable>
        <DataTable.Header>
          <DataTable.Cell style={styles.texto}>Periodo: {periodo}</DataTable.Cell>
        </DataTable.Header>
   </DataTable> */}
</View>

  )
};

const styles = StyleSheet.create({
    containerGeneral: {
        backgroundColor: '#fdfdfd',
        padding: 5,
        borderColor:'#0072C6',
        borderWidth:3,
        borderRadius:10,
        margin:5
      },
      label: {
        color: '#1a1a1a',
        textTransform: 'uppercase',
        fontWeight:'900',
        fontSize:13,
        marginBottom:5,
      },
      textoPeriodo: {
          color: '#1a1a1a',
          textTransform: 'uppercase',
          fontWeight:'700',
          fontSize:16,
          textAlign:'left',
          // marginLeft:30,
          marginBottom:5,
          marginTop:1,
      },
      texto: {
        color: '#1a1a1a',
        textTransform: 'uppercase',
        fontWeight:'700',
        fontSize:16,
        marginBottom:5,
        marginTop:1,
    },
      textoCurso: {
        color: '#0072C6',
        textTransform: 'uppercase',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center',
        marginBottom:5,
      },
      containerCurso: {
        padding: 15,
      },
      container: {
        padding: 10,
      },
      tableHeader: {
        backgroundColor: '#DCDCDC',
      },
  })
export default HistorialAcademicoList
