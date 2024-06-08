import styles from "./wc.module.css";

export default function WaitingConfirmation() {
  return (
    <>
      <div className={`${styles.hourglassBackground} bg-[#fab956]`}>
        <div className={styles.hourglassContainer}>
          <div className={styles.hourglassCurves}></div>
          <div className={styles.hourglassCapTop}></div>
          <div className={styles.hourglassGlassTop}></div>
          <div className={styles.hourglassSand}></div>
          <div className={styles.hourglassSandStream}></div>
          <div className={styles.hourglassCapBottom}></div>
          <div className={styles.hourglassGlass}></div>
        </div>
      </div>
    </>
  );
}
