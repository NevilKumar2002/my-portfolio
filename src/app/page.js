import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Separator className="container mx-auto" />
      <FeaturedProjects />
    </div>
  );
}
