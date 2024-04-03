const styles = {
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  objectFit: "cover"
};

export function UserPhoto({ src }) {
  return <img src={src} alt="" style={styles} />;
}
