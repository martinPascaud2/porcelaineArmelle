import Image from "next/image";

import { ibmNotItalic, ibm } from "@/assets/fonts";
import { experiencesData } from "@/assets/globals";

export default async function Page() {
  const years = Object.keys(experiencesData).sort((a, b) => b - a);

  return (
    <main className="flex flex-col items-center justify-center mt-7">
      {years.map((year) => {
        const yearExperiences = experiencesData[year].map((experienceData) => {
          const experience = (
            <div className="m-4 py-1 border border-terra-600 bg-slate-100 flex flex-col items-center">
              <div
                className={`${ibmNotItalic.className} text-2xl sm:text-4xl text-terra-600`}
              >
                {experienceData.name}
              </div>
              <div
                className={`${ibm.className} text-xl sm:text-3xl text-terra-600`}
              >
                {experienceData.address}
              </div>
              <div className="border-y border-slate-400">
                <Image
                  src={experienceData.imagePath}
                  alt={`Image de ${experienceData.name}`}
                  width={500}
                  height={500}
                />
              </div>
              <div
                className={`${ibmNotItalic.className} text-xl sm:text-3xl text-slate-600`}
              >
                {experienceData.dates}
              </div>
            </div>
          );
          return experience;
        });
        return (
          <section key={year} className="sm:m-4 flex flex-col items-center">
            <div
              className={`${ibmNotItalic.className} text-5xl text-slate-600 underline underline-offset-4`}
            >
              {year}
            </div>
            {yearExperiences}
          </section>
        );
      })}
    </main>
  );
}
