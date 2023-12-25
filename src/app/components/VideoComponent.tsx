export default function VideoComponent() {
  return (
    <video autoPlay muted loop style={{ objectFit:"cover", width: "400px", height: "400px" }}>
    <source src="/images/gosVid.mp4" />
  </video>
  )
}
