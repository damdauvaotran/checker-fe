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

class PdfStudentList extends React.Component {
  state = {
    data: []
  }

  async componentDidMount() {
    const {examShiftId} = this.props.shift
    const res = await getRegisteredStudentByShift(examShiftId)
    if (res.success) {
      this.setState({data: res.data.registeredStudentList})
    } else {
      message.error(res.message)
    }
  }

  render() {
    const {data} = this.state;
    const {subjectName} = this.props.shift.subject
    console.log('prop', this.props.shift)
    console.log('data', data)
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>
              {subjectName}
            </Text>
          </View>
          <PdfTable
            data={data}
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

        </Page>
      </Document>
    )
  }
}

export default PdfStudentList