import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Accounts from "@/components/Accounts";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Contact />
      <Accounts />
      <Rsvp />
      <Footer />
    </main>
  );
}
