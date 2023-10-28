import AllCards from "~/components/Team/Allcards";

const team = () => {
  return (
    <div>
      <div className="m-12 text-center ">
        <div className="text-4xl font-bold italic md:text-6xl lg:text-7xl">
          Kalasangama&rsquo;s Code Wizards
        </div>
        <div className="p-4 text-2xl lg:text-4xl">MEET THE DEVELOPERS</div>
      </div>
      <div className="m-4">
        <AllCards />
      </div>
    </div>
  );
}

export default team
