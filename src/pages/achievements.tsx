import Expandable from "~/components/expandable";

const Achievements = () => {
  return (
    <Expandable cards={[
      {img: "/banner.jpeg", content: "first"},
      {img: "/performing Yakshagana_.jpg", content:"second"},
      {img: "/yakshagana-showing-character-of-lord-krishna.jpg", content:"third"}
      ]} />
  )
}

export default Achievements