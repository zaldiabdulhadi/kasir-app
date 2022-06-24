import "./App.css";
import { Hasil, Categories, NavbarComponent, Menus } from "./components/index";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_URL } from "./utils/constant";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const [menus, setMenus] = useState([]);
  const [categoryYangDipilih, setCategoryYangDipilih] = useState("Makanan");
  const [keranjang, setKeranjang] = useState({});

  useEffect(() => {
    async function getMenus() {
      const res = await axios.get(
        API_URL + "products?category.nama=" + categoryYangDipilih
      );
      setMenus(res.data);
    }
    getMenus();
  }, [categoryYangDipilih]);

  function changeCategory(value) {
    setCategoryYangDipilih(value);
  }

  const masukKeranjang = (value) => {
    async function getProduct() {
      const res = await axios.get(API_URL + "products?product.id=" + value.id);
      if (res.data.length === 0) {
        setKeranjang({
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        });

        async function getKeranjang() {
          await axios.post(API_URL + "keranjangs", keranjang);
          swal({
            title: "Sukses  !",
            text: " Kamu Telah Berhasil Memasukkan " + keranjang.product.nama,
            icon: "success",
            button: "Ok",
          });
        }
        getKeranjang();
      } else {
        setKeranjang({
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        });
      }
    }
    getProduct();
  };

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Categories
              changeCategory={changeCategory}
              categoryYangDipilih={categoryYangDipilih}
            />
            <Col>
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
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
