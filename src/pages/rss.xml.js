import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { useTranslations } from "@/i18n";

const t = useTranslations();

export async function GET(context) {
  const posts = await getCollection("blog");
  // Sort posts by date
  //   const items = [...blog].sort(
  //     (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  //   );
  return rss({
    title: t("siteMetadata.title"),
    description: t("siteMetadata.description"),
    site: context.site,
    items: posts.map(({ slug, data: { title, summary, tags, date } }) => {
      const parts = slug.split("/").pop();
      return {
        title,
        categories: tags.map(({ slug }) => slug), // TODO: add tags name in the future
        pubDate: date,
        description: summary,
        link: `/blog/${parts}/`,
      };
    }),
  });
}
