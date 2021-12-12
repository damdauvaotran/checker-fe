import React from "react";
import {Document, Page, StyleSheet, Text, View, Font} from "@react-pdf/renderer";
import {Table as PdfTable} from "@david.kucsai/react-pdf-table/lib/Table";
import {DataTableCell, TableBody, TableCell, TableHeader} from "@david.kucsai/react-pdf-table";
import {getRegisteredStudentByShift} from "../api/admin/shift";
import source from '../assets/font/OpenSans-Light.ttf'

import {message} from 'antd'

Font.register({
  format: 'ttf',
  family: 'Roboto',
  src: '/home/damdauvaotran/Roboto-Regular.ttf',
  source: '/home/damdauvaotran/Roboto-Regular.ttf',
  fontStyle: 'normal',
  fontWeight: 'normal',
})


const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    // fontFamily: 'Roboto'
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10
  }
});

class PdfStudentList extends React.Component {

  renderPdf = () => {
    const {shift} = this.props
    const {subjectName} = shift.subject
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>
              {subjectName}
            </Text>
          </View>
          <PdfTable
            data={shift.studentList}
          >
            <TableHeader>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                MSSV
              </TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => r.name}/>
              <DataTableCell getContent={(r) => r.mssv}/>
            </TableBody>
          </PdfTable>
          {/*<View style={styles.table}>*/}
          {/*  /!* TableHeader *!/*/}
          {/*  <View style={styles.tableRow}>*/}
          {/*    <View style={styles.tableCol}>*/}
          {/*      <Text style={styles.tableCell}>Name</Text>*/}
          {/*    </View>*/}
          {/*    <View style={styles.tableCol}>*/}
          {/*      <Text style={styles.tableCell}>MSSV</Text>*/}
          {/*    </View>*/}
          {/*    /!*<View style={styles.tableCol}>*!/*/}
          {/*    /!*  <Text style={styles.tableCell}/>*!/*/}
          {/*    /!*</View>*!/*/}
          {/*  </View>*/}
          {/*  /!* TableContent *!/*/}
          {/*  {*/}
          {/*    data.map(student => {*/}
          {/*      return (*/}
          {/*        <View key={student.userId} style={styles.tableRow}>*/}
          {/*          <View style={styles.tableCol}>*/}
          {/*            <Text style={styles.tableCell}>{student.name}</Text>*/}
          {/*          </View>*/}
          {/*          <View style={styles.tableCol}>*/}
          {/*            <Text style={styles.tableCell}>{student.mssv} </Text>*/}
          {/*          </View>*/}
          {/*          /!*<View*!/*/}
          {/*          /!*  style={styles.tableCol}>*!/*/}
          {/*          /!*  <Text style={styles.tableCell}>{'    '}</Text>*!/*/}
          {/*          /!*</View>*!/*/}
          {/*        </View>*/}
          {/*      )*/}
          {/*    })*/}
          {/*  }*/}
          {/*</View>*/}
        </Page>
      </Document>
    )
  }

  render() {

    // const {subjectName} = this.props.shift.subject;
    return this.renderPdf()


  }
}

export default PdfStudentList