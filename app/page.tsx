import { NotebookNav } from "@/components/NotebookNav";
import { NotebookHero } from "@/components/NotebookHero";
import { NotebookToolkitAndWork } from "@/components/NotebookToolkitAndWork";
import { NotebookDemosAndJourney } from "@/components/NotebookDemosAndJourney";
import { NotebookAboutAndContact } from "@/components/NotebookAboutAndContact";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NotebookNav />
      <main id="main-content">
        <NotebookHero />
        <NotebookToolkitAndWork />
        <NotebookDemosAndJourney />
        <NotebookAboutAndContact />
      </main>
    </div>
  );
}
