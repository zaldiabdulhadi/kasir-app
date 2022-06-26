import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./../../utils/constant";

export default function TotalBayar({ keranjangs }) {
  const navigate = useNavigate();
  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjangs,
    };

    async function getTotalBayar() {
      await axios.post(API_URL + "pesanans", pesanan);
      navigate("success");
    }
    getTotalBayar();
  };

  const totalBayar = keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);
  return (
    <div className="fixed-bottom">
      <Row>
        <Col
          md={{ span: 3, offset: 9 }}
          className="px-4 d-grid gap-2 mb-3 me-2"
        >
          <h4>
            Total Bayar :{" "}
            <strong className="float-end">
              Rp. {numberWithCommas(totalBayar)}
            </strong>
          </h4>
          <Button
            variant="primary"
            size="lg"
            onClick={() => submitTotalBayar(totalBayar)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
            <strong>BAYAR</strong>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
