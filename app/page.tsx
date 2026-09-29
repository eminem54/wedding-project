import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";
import Interview from "@/components/Interview";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Accounts from "@/components/Accounts";
import Rsvp from "@/components/Rsvp";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Greeting />
      <Interview />
      <Calendar />
      <Gallery />
      <Location />
      <Guestbook />
      <Accounts />
      <Rsvp />
      <Contact />
      <Footer />
    </main>
  );
}
