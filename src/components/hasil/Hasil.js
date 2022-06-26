import React, { useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import ModalKeranjang from "../modal/ModalKeranjang";
import TotalBayar from "../totalBayar/TotalBayar";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import Swal from "sweetalert2";

export default function Hasil({ keranjangs }) {
  const [showModal, setShowModal] = useState(false);
  const [keranjangDetail, setkeranjangDetail] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = (menuKeranjang) => {
    setShowModal(true);
    setkeranjangDetail(menuKeranjang);
    setKeterangan(menuKeranjang.keterangan);
    setTotalHarga(menuKeranjang.total_harga);
  };

  const tambah = () => {
    keranjangDetail.jumlah++;
    setTotalHarga(keranjangDetail.product.harga * keranjangDetail.jumlah);
  };

  const kurang = () => {
    if (keranjangDetail.jumlah > 1) {
      keranjangDetail.jumlah--;
      setTotalHarga(keranjangDetail.product.harga * keranjangDetail.jumlah);
    }
  };

  const changeHandler = (event) => {
    setKeterangan(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleClose();

    const data = {
      jumlah: keranjangDetail.jumlah,
      total_harga: keranjangDetail.total_harga,
      product: keranjangDetail.product,
      keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) =>
        Swal.fire({
          title: "Sukses Update !!",
          text: "Sukses Update Pesanan" + data.product.nama,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log(err));
  };

  const hapusPesanan = (id) => {
    handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) =>
        Swal.fire({
          title: "Hapus Pesanan !!",
          text: "Sukses Hapus Pesanan " + keranjangDetail.product.nama,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      <ListGroup variant="flush">
        {keranjangs.map((menuKeranjang) => {
          return (
            <ListGroup.Item
              key={menuKeranjang.product.id}
              onClick={() => handleOpen(menuKeranjang)}
            >
              <Row>
                <Col xs={4}>
                  <h4>
                    <Badge pill>{menuKeranjang.jumlah}</Badge>
                  </h4>
                </Col>
                <Col>
                  <h5>{menuKeranjang.product.nama}</h5>
                  <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                </Col>
                <Col>
                  <p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <ModalKeranjang
        handleClose={handleClose}
        tambah={tambah}
        changeHandler={changeHandler}
        handleSubmit={handleSubmit}
        kurang={kurang}
        keterangan={keterangan}
        showModal={showModal}
        keranjangDetail={keranjangDetail}
        totalHarga={totalHarga}
        hapusPesanan={hapusPesanan}
      />
      <TotalBayar keranjangs={keranjangs} />
    </Col>
  );
}
