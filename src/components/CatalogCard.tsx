import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Tilt3D } from "@/components/Tilt3D";
import type { CatalogItem } from "@/data/site";

export function CatalogCard({
  item,
  to,
}: {
  item: CatalogItem;
  to: "/services/$slug" | "/products/$slug";
}) {
  return (
    <Tilt3D>
      <Link to={to} params={{ slug: item.slug }} className="catalog-card group">
        <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold">{item.title}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </Link>
  );
}
