import Expandable from "~/components/expandable";

const Achievements = () => {
  return (
    <section className="min-h-screen mx-4 sm:mx-8 lg:mx-32 flex flex-col gap-10">
      <div className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl pt-24">Achievements</div>
      <Expandable cards={[
        {img: "/banner.jpeg", content: "first"},
        {img: "/performing Yakshagana_.jpg", content:"second"},
        {img: "/yakshagana-showing-character-of-lord-krishna.jpg", content:"third"}
        ]} />
    </section>
  )
}

export default Achievements