import type { CurriculumExperience } from "@/modules/curriculum-experiences/types/curriculum-experience.types";
import type { Curriculum } from "@/modules/curriculums/types/curriculum.types";

export type AtsTemplateCurriculum = {
  full_name: string;
  headline?: string;
  about?: string;
  phone?: string;
  city?: string;
  state?: string;
  email?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  skills?: {
    category: string;
    items: string[];
  }[];
  languages?: {
    name: string;
    level: string;
  }[];
  experiences?: {
    position: string;
    company: string;
    start_date: string;
    end_date?: string;
    descriptions: string[];
  }[];
  projects?: {
    name: string;
    date?: string;
    descriptions: string[];
  }[];
  educations?: {
    course: string;
    institution: string;
    status?: string;
  }[];
  certifications?: {
    name: string;
  }[];
};

export const mockAtsTemplateCurriculum: AtsTemplateCurriculum = {
  full_name: "Andreo Henrique",
  city: "Manaus",
  state: "Amazonas",
  phone: "(11) 92559-2834",
  email: "developerandreo@gmail.com",
  linkedin_url: "linkedin.com/in/andreo-henrique",
  github_url: "github.com/andreodev",
  portfolio_url: "andreodev.com.br",
  about:
    "Full Stack Software Engineer com experiência no desenvolvimento de aplicações web escaláveis para fintechs, marketplaces e plataformas SaaS. Atuação em projetos de alta complexidade envolvendo pagamentos, Pix, gateway de pagamentos, carteiras digitais, BaaS, dashboards financeiros, sistemas em tempo real e arquiteturas multi-tenant.",
  skills: [
    {
      category: "Front-end",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "React Native",
        "Vue.js",
        "TailwindCSS",
        "Vite",
        "HTML5",
        "CSS3",
      ],
    },
    {
      category: "Back-end",
      items: [
        "Node.js",
        "NestJS",
        "Express.js",
        "RESTful APIs",
        "Prisma ORM",
        "Autenticação JWT",
      ],
    },
    {
      category: "Banco de Dados",
      items: ["MySQL", "MongoDB", "Firebase Realtime Database", "PostgreSQL"],
    },
    {
      category: "Extras",
      items: [
        "Git",
        "GitHub",
        "CI/CD",
        "Figma",
        "Postman",
        "Metodologias Ágeis",
        "Inglês técnico",
      ],
    },
  ],
  languages: [{ name: "Inglês", level: "Intermediário" }],
  experiences: [
    {
      position: "Frontend Software Engineer",
      company: "Wite Group",
      start_date: "Agosto/2025",
      end_date: "Atual",
      descriptions: [
        "Atuação no desenvolvimento do frontend de uma plataforma financeira de alta complexidade, envolvendo marketplace, gateway de pagamento, Pix, BaaS, subcontas e dashboards financeiros.",
        "Aumento de aproximadamente 40% na produtividade do projeto, por meio de melhorias na arquitetura frontend, padronização de componentes e refatoração de fluxos críticos.",
        "Implementação de interfaces e fluxos sensíveis, como pagamentos, saques, configuração de taxas, cupons, validações financeiras e regras de negócio.",
        "Forte colaboração com times de backend, design e QA, prestando suporte técnico contínuo desde validações até homologação.",
      ],
    },
  ],
  projects: [
    {
      name: "HEST - Sistema de Gerenciamento de Restaurante",
      date: "Junho/2025",
      descriptions: [
        "Sistema completo para atendimento e gerenciamento de pedidos em restaurantes, com controle em tempo real.",
        "Tecnologias: React, Node.js, TailwindCSS, MySQL, Express.",
        "Status: Em desenvolvimento contínuo, com funcionalidades em produção.",
      ],
    },
  ],
  educations: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "Universidade Paulista (UNIP)",
      status: "Concluído",
    },
  ],
  certifications: [
    { name: "Discover - Rocketseat (2024)" },
    { name: "Fundamentos de Node.js - Udemy (2024)" },
    { name: "Desenvolvimento Web Full Stack - Origamid (2023)" },
    { name: "Desenvolvimento Web Front-end - CETAM (2025)" },
  ],
};

export function AtsTemplate({
  curriculum,
}: {
  curriculum: AtsTemplateCurriculum;
}) {
  return (
    <article className="mx-auto min-h-[1123px] w-full max-w-[794px] border bg-white p-10 font-sans text-[13px] leading-relaxed text-black shadow-sm">
      <AtsHeader curriculum={curriculum} />
      {curriculum.about && (
        <AtsSection title="Resumo">
          <p>{curriculum.about}</p>
        </AtsSection>
      )}
      <AtsSkills skills={curriculum.skills} />
      <AtsLanguages languages={curriculum.languages} />
      <AtsExperiences experiences={curriculum.experiences} />
      <AtsProjects projects={curriculum.projects} />
      <AtsEducation educations={curriculum.educations} />
      <AtsCertifications certifications={curriculum.certifications} />
    </article>
  );
}

export function toAtsTemplateCurriculum(
  curriculum?: Curriculum,
  experiences?: CurriculumExperience[],
): AtsTemplateCurriculum {
  const mappedExperiences = experiences?.map((experience) => ({
    position: experience.position,
    company: experience.company,
    start_date: formatDateLabel(experience.start_date),
    end_date: experience.end_date
      ? formatDateLabel(experience.end_date)
      : "Atual",
    descriptions: splitDescription(experience.description),
  }));

  return {
    ...mockAtsTemplateCurriculum,
    full_name: curriculum?.full_name || mockAtsTemplateCurriculum.full_name,
    headline: curriculum?.headline || mockAtsTemplateCurriculum.headline,
    about: curriculum?.about || mockAtsTemplateCurriculum.about,
    phone: curriculum?.phone || mockAtsTemplateCurriculum.phone,
    city: curriculum?.city || mockAtsTemplateCurriculum.city,
    state: curriculum?.state || mockAtsTemplateCurriculum.state,
    linkedin_url:
      curriculum?.linkedin || mockAtsTemplateCurriculum.linkedin_url,
    github_url: curriculum?.github || mockAtsTemplateCurriculum.github_url,
    portfolio_url:
      curriculum?.portfolio || mockAtsTemplateCurriculum.portfolio_url,
    experiences: mappedExperiences?.length
      ? mappedExperiences
      : mockAtsTemplateCurriculum.experiences,
  };
}

function AtsHeader({ curriculum }: { curriculum: AtsTemplateCurriculum }) {
  const location = [curriculum.city, curriculum.state]
    .filter(Boolean)
    .join(", ");
  const locationAndPhone = [location, curriculum.phone]
    .filter(Boolean)
    .join(" | ");
  const links = [
    curriculum.email,
    curriculum.linkedin_url,
    curriculum.github_url,
    curriculum.portfolio_url,
  ].filter(Boolean);

  return (
    <header className="text-center">
      {curriculum.full_name && (
        <h1 className="text-2xl font-bold uppercase tracking-normal">
          {curriculum.full_name}
        </h1>
      )}
      {locationAndPhone && <p className="mt-2">{locationAndPhone}</p>}
      {links.length > 0 && <p>{links.join(" | ")}</p>}
      {curriculum.headline && (
        <p className="mt-2 font-bold">{curriculum.headline}</p>
      )}
    </header>
  );
}

function AtsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="border-b border-black pb-1 text-base font-bold">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function AtsSkills({ skills }: { skills?: AtsTemplateCurriculum["skills"] }) {
  if (!hasItems(skills)) return null;

  return (
    <AtsSection title="Habilidades Técnicas">
      <div className="space-y-1">
        {skills.map((skill) => {
          if (!skill.category || !hasItems(skill.items)) return null;

          return (
            <p key={skill.category}>
              <strong>{skill.category}:</strong> {skill.items.join(", ")}
            </p>
          );
        })}
      </div>
    </AtsSection>
  );
}

function AtsLanguages({
  languages,
}: {
  languages?: AtsTemplateCurriculum["languages"];
}) {
  if (!hasItems(languages)) return null;

  return (
    <AtsSection title="Idiomas">
      <div className="space-y-1">
        {languages.map((language) => {
          if (!language.name && !language.level) return null;

          return (
            <p key={`${language.name}-${language.level}`}>
              {[language.name, language.level].filter(Boolean).join(" ")}
            </p>
          );
        })}
      </div>
    </AtsSection>
  );
}

function AtsExperiences({
  experiences,
}: {
  experiences?: AtsTemplateCurriculum["experiences"];
}) {
  if (!hasItems(experiences)) return null;

  return (
    <AtsSection title="Experiência Profissional">
      <div className="space-y-4">
        {experiences.map((experience) => {
          const title = [experience.position, experience.company]
            .filter(Boolean)
            .join(" | ");

          if (!title && !hasItems(experience.descriptions)) return null;

          return (
            <div
              key={`${experience.position}-${experience.company}-${experience.start_date}`}
            >
              {title && <h3 className="font-bold">{title}</h3>}
              {[experience.start_date, experience.end_date].filter(Boolean)
                .length > 0 && (
                <p>
                  {[experience.start_date, experience.end_date]
                    .filter(Boolean)
                    .join(" - ")}
                </p>
              )}
              <AtsBulletList items={experience.descriptions} />
            </div>
          );
        })}
      </div>
    </AtsSection>
  );
}

function AtsProjects({
  projects,
}: {
  projects?: AtsTemplateCurriculum["projects"];
}) {
  if (!hasItems(projects)) return null;

  return (
    <AtsSection title="Projetos">
      <div className="space-y-4">
        {projects.map((project) => {
          if (!project.name && !project.date && !hasItems(project.descriptions))
            return null;

          return (
            <div key={`${project.name}-${project.date}`}>
              {project.name && <h3 className="font-bold">{project.name}</h3>}
              {project.date && <p>{project.date}</p>}
              <AtsBulletList items={project.descriptions} />
            </div>
          );
        })}
      </div>
    </AtsSection>
  );
}

function AtsEducation({
  educations,
}: {
  educations?: AtsTemplateCurriculum["educations"];
}) {
  if (!hasItems(educations)) return null;

  return (
    <AtsSection title="Educação">
      <div className="space-y-3">
        {educations.map((education) => {
          const title = [education.course, education.institution]
            .filter(Boolean)
            .join(" | ");

          if (!title && !education.status) return null;

          return (
            <div key={`${education.course}-${education.institution}`}>
              {title && <h3 className="font-bold">{title}</h3>}
              {education.status && <p>{education.status}</p>}
            </div>
          );
        })}
      </div>
    </AtsSection>
  );
}

function AtsCertifications({
  certifications,
}: {
  certifications?: AtsTemplateCurriculum["certifications"];
}) {
  if (!hasItems(certifications)) return null;

  return (
    <AtsSection title="Cursos e Certificações">
      <AtsBulletList
        items={certifications.map((certification) => certification.name)}
      />
    </AtsSection>
  );
}

function AtsBulletList({ items }: { items?: string[] }) {
  const visibleItems = items?.filter(Boolean);

  if (!hasItems(visibleItems)) return null;

  return (
    <ul className="mt-1 list-disc pl-5">
      {visibleItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function hasItems<T>(items?: T[]): items is T[] {
  return Boolean(items?.length);
}

function splitDescription(description?: string | null) {
  if (!description) return [];

  return description
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function formatDateLabel(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
