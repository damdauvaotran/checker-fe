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
});

class PdfSubjectList extends React.Component {


  render() {
    const {subjectList} = this.props;
    console.log('data' , subjectList)
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <PdfTable
            data={subjectList}
          >
            <TableHeader>
              <TableCell>
                Subject
              </TableCell>
              <TableCell>
                Room
              </TableCell>
              <TableCell>
                Date
              </TableCell>
              <TableCell>
                Start
              </TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => r.subjectName}/>
              <DataTableCell getContent={(r) => r.examShifts[0].room.roomName.toString()}/>
              <DataTableCell getContent={(r) => r.examShifts[0].examDate.toString()}/>
              <DataTableCell getContent={(r) => r.examShifts[0].from.toString()}/>

            </TableBody>
          </PdfTable>

        </Page>
      </Document>
    )
  }
}

export default PdfSubjectList