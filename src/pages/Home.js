import "../App.css";
import { Hasil, Categories, Menus } from "../components/index";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";
import Swal from "sweetalert2";
import axios from "axios";

function Home() {
  const [menus, setMenus] = useState([]);
  const [categoryYangDipilih, setCategoryYangDipilih] = useState("All");
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    async function getMenus() {
      const res = await axios.get(API_URL + "products?");
      setMenus(res.data);
    }
    getMenus();
    getListKeranjang();
  }, []);

  function getListKeranjang() {
    async function getKeranjang() {
      const res = await axios.get(API_URL + "keranjangs");
      setKeranjangs(res.data);
    }

    getKeranjang();
  }

  const changeCategory = (value) => {
    setCategoryYangDipilih(value);
    setMenus([]);

    async function getMenus() {
      if (value === "All") {
        const res = await axios.get(API_URL + "products");
        setMenus(res.data);
      } else {
        const res = await axios.get(
          API_URL + "products?category.nama=" + value
        );
        setMenus(res.data);
      }
    }
    getMenus();
  };

  const masukKeranjang = (value) => {
    async function getKeranjang() {
      const res = await axios.get(
        API_URL + "keranjangs?product.id=" + value.id
      );
      if (res.data.length === 0) {
        async function postKeranjang() {
          const body = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          const res = await axios.post(API_URL + "keranjangs", body);
          value = res.data;
          getListKeranjang();
          Swal.fire({
            title: "Success ...",
            icon: "success",
            text: `Berhasil Memasukkan ${value.product.nama} ke Keranjang`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
        postKeranjang();
      } else {
        const body = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };

        await axios.put(API_URL + "keranjangs/" + res.data[0].id, body);
        getListKeranjang();

        Swal.fire({
          title: "Success ...",
          icon: "success",
          text: `Berhasil Memasukkan ${value.nama} ke Keranjang`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
    getKeranjang();
  };

  return (
    <div className="mt-3">
      <Container fluid>
        <Row>
          <Categories
            changeCategory={changeCategory}
            categoryYangDipilih={categoryYangDipilih}
          />
          <Col xs={7}>
            <h4>
              <strong>Daftar Product</strong>
            </h4>
            <hr />
            <Row>
              {menus &&
                menus.map((menu) => {
                  return (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={masukKeranjang}
                    />
                  );
                })}
            </Row>
          </Col>
          <Hasil keranjangs={keranjangs} />
        </Row>
      </Container>
    </div>
  );
}

export default Home;
