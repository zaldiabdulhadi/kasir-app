import { Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="me-3" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="me-2" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="me-3" />;

  return <FontAwesomeIcon icon={faUtensils} className="me-3" />;
};

export default function Categories({ changeCategory, categoryYangDipilih }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const res = await axios.get(API_URL + "categories");
      setCategories(res.data);
    }
    getCategories();
  }, []);

  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Daftar Kategori</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => {
            return (
              <ListGroup.Item
                className={`pointer ${
                  categoryYangDipilih === category.nama && "category-aktif"
                }`}
                key={category.id}
                onClick={() => {
                  changeCategory(category.nama);
                }}
              >
                <h5>
                  <Icon nama={category.nama} />
                  {category.nama}
                </h5>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Col>
  );
}
