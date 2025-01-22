import banner from "../../assets/banner.png";

export default function Hero(){
    return(
        <section className="min-h-screen hero_section w-full flex flex-col ">
            <div>
                <img src={banner} alt="" className="w-full h-auto object-cover"/>
            </div>
            <div className="ml-16">
                <h1 className="font-primaryfont text-primarytxt text-5xl font-semibold">Redefine Hackathons: Collaborate, Create, Conquer!</h1>
                <div className="flex justify-around items-center pt-4">
                    <p className="font-secondaryfont text-primarytxt text-xl pt-8">An all-in-one platform for seamless team formation, real-time collaboration, and dynamic project evaluation</p>
                    <div class="flex gap-4">
                        <button class="px-6 py-3 bg-highlight text-primarytxt font-semibold rounded-lg shadow-md hover:bg-accent hover:text-bodyBg transition ease-in-out duration-300">
                            Join Now
                        </button>
                        <button class="px-6 py-3 bg-accent text-bodyBg font-semibold rounded-lg shadow-md hover:bg-highlight hover:text-primarytxt transition ease-in-out duration-300">
                            Host Your Hackathon
                        </button>
                    </div>
                </div>
            </div>
            
        </section>
    );
}