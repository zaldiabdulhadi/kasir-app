import { useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./../utils/constant";

export default function Success() {
  useEffect(() => {
    async function successBayar() {
      const res = await axios.get(API_URL + "keranjangs");
      res.data.map(async (item) => {
        return await axios.delete(API_URL + "keranjangs/" + item.id);
      });
    }
    successBayar();
  }, []);
  return (
    <div className="mt-4 text-center">
      <Image src="assets/images/sukses.svg" width="300px"></Image>
      <h2>Sukses Pesan</h2>
      <p>Terima Kasih sudah Memesan</p>
      <Button variant="primary" as={Link} to="/">
        Kembali
      </Button>
    </div>
  );
}
