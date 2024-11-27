import WallForm from "components/wallForm";
import style from "./index.module.css";

function Home() {
  return (
    <section className={style.section}>
      <h1>Calculadora de latas de Tinta para uma sala</h1>
      <WallForm />
    </section>
  );
}

export default Home;
