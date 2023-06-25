import React from 'react'
import {Text, View,StyleSheet} from 'react-native';
import { DataTable } from 'react-native-paper';


const HorarioList = ({item}) => {
    //console.log('Horario:'+item);
    const {curso, periodo,horaEntrada,horaSalida,dia} = item ;
 
    return (
        <View style={styles.containerGeneral}>
            {/* <Text style={styles.label}>Curso:</Text> */}
          <Text style={styles.textoCurso}>{curso}</Text>

            {/* <Text style={styles.label}>Hora Entrada:            Hora Salida:</Text>
            <Text style={styles.texto}>{horaEntrada}                    {horaSalida}</Text>

            <Text style={styles.label}>Periodo:                                 Dia:</Text>
            <Text style={styles.texto}>{periodo}                    {dia}</Text>  */}

          <Text style={styles.texto}>Periodo:{periodo}</Text>

          <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title>Entrada</DataTable.Title>
                  <DataTable.Title>Salida</DataTable.Title>
                  <DataTable.Title>Día</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{horaEntrada}</DataTable.Cell>
                  <DataTable.Cell>{horaSalida}</DataTable.Cell>
                  <DataTable.Cell>{dia}</DataTable.Cell>
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
      borderWidth:2,
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
    texto: {
        color: '#1a1a1a',
        textTransform: 'uppercase',
        fontWeight:'700',
        fontSize:16,
        textAlign:'center',
        // marginLeft:30,
        marginBottom:5,
        marginTop:1,
    },
    textoCurso: {
        color: '#0072C6',
        textTransform: 'uppercase',
        fontWeight:'700',
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
export default HorarioList
