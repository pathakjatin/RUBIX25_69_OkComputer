import { TextHoverEffect } from "./text-hover-effect";

export function About(){
    return(
        <section className="min-h-screen">
            <div className="h-[20rem] flex items-center justify-center">
                <TextHoverEffect text="About Us" />
            </div>
        </section>
    );
}