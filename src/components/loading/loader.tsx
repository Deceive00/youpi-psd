import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className={styles.loader}></div>
    </div>
  );
}
