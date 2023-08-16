import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import DataTable from './DataTable';

const DataTableModal = ({ showTableModal, toggleModal }) => {
  return (
    <MDBModal show={showTableModal} getOpenState={(e) => toggleModal(!e)}>
      <MDBModalDialog centered size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <h5>Data Table</h5>
            <MDBBtn className="btn-close" onClick={toggleModal}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <DataTable />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default DataTableModal;
