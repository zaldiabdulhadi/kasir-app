import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "./../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ModalKeranjang({
  showModal,
  handleClose,
  keranjangDetail,
  keterangan,
  tambah,
  changeHandler,
  handleSubmit,
  kurang,
  totalHarga,
  hapusPesanan,
}) {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}
            <strong className="ms-2">
              (Rp. {numberWithCommas(keranjangDetail.product.harga)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Harga</Form.Label>
              <p>
                <strong>(Rp. {numberWithCommas(totalHarga)})</strong>
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Jumlah : </Form.Label>
              <Button
                variant="primary"
                size="sm"
                className="ms-3"
                onClick={() => kurang()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong className="mx-3">{keranjangDetail.jumlah}</strong>
              <Button variant="primary" size="sm" onClick={() => tambah()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan : </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                value={keterangan}
                onChange={(event) => changeHandler(event)}
                placeholder="Contoh : Pedas, Nasi Setengah"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => hapusPesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            <span>Hapus Pesanan</span>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Keranjangmu Masih Kosong !!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
