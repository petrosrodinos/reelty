import type { FC } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { environments } from "@/config/environments";
import { Routes } from "@/routes/routes";
import { guides } from "@/views/guides/data/guides";
import type { Guide } from "@/views/guides/types";

export const guideMetadata = (guide: Guide): Metadata => ({
  title: guide.metaTitle,
  description: guide.description,
  alternates: { canonical: guide.path },
  openGraph: {
    type: "article",
    siteName: "Reelty",
    title: guide.metaTitle,
    description: guide.description,
    url: guide.path,
    modifiedTime: guide.updated,
  },
  twitter: { card: "summary_large_image", title: guide.metaTitle, description: guide.description },
});

const GuideJsonLd: FC<{ guide: Guide }> = ({ guide }) => {
  const url = `${environments.appUrl}${guide.path}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.h1,
        description: guide.description,
        url,
        mainEntityOfPage: url,
        dateModified: guide.updated,
        author: { "@id": `${environments.appUrl}/#organization` },
        publisher: { "@id": `${environments.appUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Reelty", item: environments.appUrl },
          { "@type": "ListItem", position: 2, name: guide.h1, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so content can never terminate the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
};

export const GuidePage: FC<{ guide: Guide }> = ({ guide }) => {
  const related = guides.filter((g) => guide.related.includes(g.path));
  return (
    <>
      <GuideJsonLd guide={guide} />
      <SiteHeader />
      <main id="main" className="flex-1">
        <article className="py-12 md:py-20">
          <div className="page-container max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href={Routes.home} className="hover:text-ink">
                Reelty
              </Link>
              <span aria-hidden="true"> / </span>
              <span>{guide.eyebrow}</span>
            </nav>
            <h1 className="text-display-lg mt-4">{guide.h1}</h1>
            <p className="mt-6 rounded-lg bg-surface-soft p-5 text-lg text-ink">{guide.answer}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated <time dateTime={guide.updated}>{guide.updated}</time>
            </p>

            {guide.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-2xl font-medium text-ink">{section.heading}</h2>
                {section.paragraphs?.map((text) => (
                  <p key={text} className="mt-3 text-body">
                    {text}
                  </p>
                ))}
                {section.steps && (
                  <ol className="mt-4 flex flex-col gap-4">
                    {section.steps.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-card text-sm font-medium text-ink">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-ink">{step.title}</h3>
                          <p className="mt-1 text-body">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface-soft text-ink">
                        <tr>
                          {section.table.headers.map((header, i) => (
                            <th key={i} scope="col" className="px-4 py-3 font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row[0]} className="border-t border-hairline">
                            {row.map((cell, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="px-4 py-3 font-medium text-ink">
                                  {cell}
                                </th>
                              ) : (
                                <td key={i} className="px-4 py-3 text-body">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            <section className="mt-12">
              <h2 className="text-2xl font-medium text-ink">Frequently asked questions</h2>
              <dl className="mt-4 divide-y divide-hairline border-y border-hairline">
                {guide.faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <dt className="font-medium text-ink">{faq.q}</dt>
                    <dd className="mt-2 text-body">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {guide.sources && (
              <section className="mt-12">
                <h2 className="text-2xl font-medium text-ink">Sources</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-body">
                  {guide.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} rel="noopener noreferrer" target="_blank" className="underline underline-offset-4">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-12 rounded-lg bg-brand px-6 py-10 text-center">
              <h2 className="text-2xl font-medium text-ink">Make your first video free</h2>
              <p className="mt-2 text-ink">New accounts get free credits. No card needed.</p>
              <Button size="lg" className="mt-6 bg-canvas text-ink hover:bg-surface-card" render={<Link href={Routes.register} />} nativeButton={false}>
                Try Reelty
              </Button>
            </div>

            {related.length > 0 && (
              <nav aria-label="Related guides" className="mt-12">
                <h2 className="text-eyebrow text-muted-foreground">Related</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((g) => (
                    <li key={g.path}>
                      <Link href={g.path} className="text-ink underline underline-offset-4">
                        {g.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
};
